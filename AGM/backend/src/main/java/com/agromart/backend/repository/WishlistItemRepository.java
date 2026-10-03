package com.agromart.backend.repository;

import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.Wishlist;
import com.agromart.backend.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {

    Optional<WishlistItem> findByWishlistAndProduct(Wishlist wishlist, Product product);

    boolean existsByWishlistAndProduct(Wishlist wishlist, Product product);

    void deleteByWishlistAndProduct(Wishlist wishlist, Product product);
}
