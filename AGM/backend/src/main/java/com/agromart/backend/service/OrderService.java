package com.agromart.backend.service;

import com.agromart.backend.dto.OrderDTO;
import com.agromart.backend.dto.OrderRequest;
import com.agromart.backend.dto.OrderStatusUpdateRequest;
import com.agromart.backend.entity.*;
import com.agromart.backend.exception.BadRequestException;
import com.agromart.backend.exception.InsufficientStockException;
import com.agromart.backend.exception.ResourceNotFoundException;
import com.agromart.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        CartRepository cartRepository,
                        CartItemRepository cartItemRepository,
                        ProductRepository productRepository,
                        UserRepository userRepository,
                        PaymentRepository paymentRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
    }

    @Transactional
    public OrderDTO createOrder(String userEmail, OrderRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new BadRequestException("Cart is empty"));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new BadRequestException("Cannot place order with an empty cart");
        }

        // Validate stock and calculate total strictly on backend
        BigDecimal itemsTotal = BigDecimal.ZERO;
        List<CartItem> cartItems = new ArrayList<>(cart.getItems());

        for (CartItem item : cartItems) {
            Product product = productRepository.findById(item.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + item.getProduct().getId()));

            if (product.getStock() < item.getQuantity()) {
                throw new InsufficientStockException("Insufficient stock for product: " + product.getName() +
                        ". Available: " + product.getStock() + ", requested: " + item.getQuantity());
            }

            BigDecimal lineSubtotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            itemsTotal = itemsTotal.add(lineSubtotal);
        }

        // Delivery calculation: Free if subtotal >= 1000, else 50
        BigDecimal deliveryFee = itemsTotal.compareTo(new BigDecimal("1000.00")) >= 0
                ? BigDecimal.ZERO
                : new BigDecimal("50.00");
        BigDecimal finalTotal = itemsTotal.add(deliveryFee);

        // Create Order
        Order order = new Order(
                user,
                finalTotal,
                OrderStatus.PENDING,
                request.getShippingAddress(),
                request.getPaymentMethod()
        );
        Order savedOrder = orderRepository.save(order);

        // Decrement stock and save OrderItems
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem item : cartItems) {
            Product product = item.getProduct();
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);

            BigDecimal lineSubtotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            OrderItem orderItem = new OrderItem(
                    savedOrder,
                    product,
                    item.getQuantity(),
                    product.getPrice(),
                    lineSubtotal
            );
            orderItems.add(orderItemRepository.save(orderItem));
        }
        savedOrder.setItems(orderItems);

        // Record initial Payment
        PaymentStatus initialPaymentStatus = "ONLINE_PAYMENT".equalsIgnoreCase(request.getPaymentMethod())
                ? PaymentStatus.COMPLETED
                : PaymentStatus.PENDING;
        String txnId = "TXN-" + UUID.randomUUID().toString().substring(0, 13).toUpperCase();
        Payment payment = new Payment(savedOrder, request.getPaymentMethod(), initialPaymentStatus, txnId, finalTotal);
        Payment savedPayment = paymentRepository.save(payment);
        savedOrder.setPayment(savedPayment);

        // Clear cart after successful order placement
        cart.getItems().clear();
        cartItemRepository.deleteByCart(cart);

        return new OrderDTO(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getUserOrders(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        return orderRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderDTO getOrderById(Long id, String userEmail, boolean isAdmin, boolean isSeller) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

        // Customers can only view their own orders
        if (!isAdmin && !isSeller && !order.getUser().getEmail().equalsIgnoreCase(userEmail)) {
            throw new BadRequestException("You do not have permission to view this order");
        }

        return new OrderDTO(order);
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO updateOrderStatus(Long orderId, OrderStatusUpdateRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        OrderStatus oldStatus = order.getStatus();
        OrderStatus newStatus = request.getStatus();

        // If cancelling order, restore stock
        if (newStatus == OrderStatus.CANCELLED && oldStatus != OrderStatus.CANCELLED) {
            for (OrderItem item : order.getItems()) {
                Product product = item.getProduct();
                product.setStock(product.getStock() + item.getQuantity());
                productRepository.save(product);
            }
        }

        order.setStatus(newStatus);
        if (newStatus == OrderStatus.DELIVERED && order.getPayment() != null) {
            order.getPayment().setPaymentStatus(PaymentStatus.COMPLETED);
        }

        Order saved = orderRepository.save(order);
        return new OrderDTO(saved);
    }

    @Transactional
    public OrderDTO cancelOrder(Long orderId, String userEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        if (!order.getUser().getEmail().equalsIgnoreCase(userEmail)) {
            throw new BadRequestException("You do not have permission to cancel this order");
        }

        if (order.getStatus() != OrderStatus.PENDING && order.getStatus() != OrderStatus.CONFIRMED) {
            throw new BadRequestException("Cannot cancel order in status: " + order.getStatus());
        }

        OrderStatusUpdateRequest req = new OrderStatusUpdateRequest(OrderStatus.CANCELLED);
        return updateOrderStatus(orderId, req);
    }
}
