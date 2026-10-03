package com.agromart.backend.service;

import com.agromart.backend.dto.DashboardStatsDTO;
import com.agromart.backend.dto.OrderDTO;
import com.agromart.backend.dto.ProductDTO;
import com.agromart.backend.dto.UserDTO;
import com.agromart.backend.entity.OrderStatus;
import com.agromart.backend.entity.Role;
import com.agromart.backend.repository.OrderRepository;
import com.agromart.backend.repository.ProductRepository;
import com.agromart.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public AdminService(UserRepository userRepository,
                        ProductRepository productRepository,
                        OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional(readOnly = true)
    public DashboardStatsDTO getDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        stats.setTotalUsers(userRepository.count());
        stats.setTotalCustomers(userRepository.countByRole(Role.CUSTOMER));
        stats.setTotalSellers(userRepository.countByRole(Role.SELLER));
        stats.setTotalProducts(productRepository.count());
        stats.setTotalOrders(orderRepository.count());
        stats.setPendingOrders(orderRepository.countByStatus(OrderStatus.PENDING));
        stats.setDeliveredOrders(orderRepository.countByStatus(OrderStatus.DELIVERED));
        stats.setTotalRevenue(orderRepository.sumTotalRevenue());

        List<OrderDTO> recentOrders = orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .limit(6)
                .map(OrderDTO::new)
                .collect(Collectors.toList());
        stats.setRecentOrders(recentOrders);

        Map<String, Long> statusMap = new HashMap<>();
        for (OrderStatus status : OrderStatus.values()) {
            statusMap.put(status.name(), orderRepository.countByStatus(status));
        }
        stats.setOrdersByStatus(statusMap);

        return stats;
    }

    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }
}
