package com.agromart.backend.service;

import com.agromart.backend.dto.OrderDTO;
import com.agromart.backend.dto.ProductDTO;
import com.agromart.backend.dto.ProductRequest;
import com.agromart.backend.dto.SellerDashboardStatsDTO;
import com.agromart.backend.entity.User;
import com.agromart.backend.exception.ResourceNotFoundException;
import com.agromart.backend.repository.OrderRepository;
import com.agromart.backend.repository.ProductRepository;
import com.agromart.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SellerService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductService productService;

    public SellerService(ProductRepository productRepository,
                         OrderRepository orderRepository,
                         UserRepository userRepository,
                         ProductService productService) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productService = productService;
    }

    private User getSeller(String sellerEmail) {
        return userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found: " + sellerEmail));
    }

    @Transactional(readOnly = true)
    public SellerDashboardStatsDTO getSellerDashboard(String sellerEmail) {
        User seller = getSeller(sellerEmail);
        Long sellerId = seller.getId();

        SellerDashboardStatsDTO stats = new SellerDashboardStatsDTO();
        stats.setTotalProducts(productRepository.countBySellerId(sellerId));
        stats.setLowStockProducts(productRepository.countBySellerIdAndStockLessThan(sellerId, 10));
        stats.setTotalOrders(orderRepository.countOrdersBySellerId(sellerId));
        stats.setTotalSales(orderRepository.sumSalesBySellerId(sellerId));

        List<ProductDTO> lowStockItems = productRepository.findBySellerIdAndStockLessThan(sellerId, 10).stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
        stats.setLowStockItems(lowStockItems);

        List<OrderDTO> recentOrders = orderRepository.findOrdersBySellerId(sellerId).stream()
                .limit(5)
                .map(OrderDTO::new)
                .collect(Collectors.toList());
        stats.setRecentOrders(recentOrders);

        return stats;
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getSellerProducts(String sellerEmail) {
        User seller = getSeller(sellerEmail);
        return productRepository.findBySellerId(seller.getId()).stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDTO addProduct(ProductRequest request, String sellerEmail) {
        return productService.createProduct(request, sellerEmail);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductRequest request, String sellerEmail) {
        return productService.updateProduct(id, request, sellerEmail, false);
    }

    @Transactional
    public void deleteProduct(Long id, String sellerEmail) {
        productService.deleteProduct(id, sellerEmail, false);
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getSellerOrders(String sellerEmail) {
        User seller = getSeller(sellerEmail);
        return orderRepository.findOrdersBySellerId(seller.getId()).stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }
}
