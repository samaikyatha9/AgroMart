package com.agromart.backend.service;

import com.agromart.backend.dto.PaymentRequest;
import com.agromart.backend.entity.Order;
import com.agromart.backend.entity.Payment;
import com.agromart.backend.entity.PaymentStatus;
import com.agromart.backend.exception.ResourceNotFoundException;
import com.agromart.backend.repository.OrderRepository;
import com.agromart.backend.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Payment processPayment(PaymentRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + request.getOrderId()));

        Payment payment = paymentRepository.findByOrder(order)
                .orElse(new Payment());

        payment.setOrder(order);
        payment.setPaymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : order.getPaymentMethod());
        payment.setPaymentStatus(request.getPaymentStatus() != null ? request.getPaymentStatus() : PaymentStatus.COMPLETED);
        payment.setTransactionId(request.getTransactionId() != null ? request.getTransactionId() : "TXN-" + UUID.randomUUID().toString().substring(0, 13).toUpperCase());
        payment.setAmount(request.getAmount() != null ? request.getAmount() : order.getTotalAmount());

        return paymentRepository.save(payment);
    }

    @Transactional(readOnly = true)
    public Payment getPaymentByOrderId(Long orderId) {
        return paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found for order id: " + orderId));
    }
}
