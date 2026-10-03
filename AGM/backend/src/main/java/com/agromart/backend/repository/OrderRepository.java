package com.agromart.backend.repository;

import com.agromart.backend.entity.Order;
import com.agromart.backend.entity.OrderStatus;
import com.agromart.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserOrderByCreatedAtDesc(User user);

    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Order> findAllByOrderByCreatedAtDesc();

    long countByStatus(OrderStatus status);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status <> 'CANCELLED'")
    BigDecimal sumTotalRevenue();

    @Query("SELECT DISTINCT o FROM Order o JOIN o.items i WHERE i.product.seller.id = :sellerId ORDER BY o.createdAt DESC")
    List<Order> findOrdersBySellerId(@Param("sellerId") Long sellerId);

    @Query("SELECT COALESCE(SUM(i.subtotal), 0) FROM Order o JOIN o.items i WHERE i.product.seller.id = :sellerId AND o.status <> 'CANCELLED'")
    BigDecimal sumSalesBySellerId(@Param("sellerId") Long sellerId);

    @Query("SELECT COUNT(DISTINCT o) FROM Order o JOIN o.items i WHERE i.product.seller.id = :sellerId")
    long countOrdersBySellerId(@Param("sellerId") Long sellerId);
}
