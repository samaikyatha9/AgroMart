package com.agromart.backend.repository;

import com.agromart.backend.entity.Cart;
import com.agromart.backend.entity.CartItem;
import com.agromart.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

    Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId);

    void deleteByCart(Cart cart);
}
