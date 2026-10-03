package com.agromart.backend.service;

import com.agromart.backend.dto.WishlistItemDTO;
import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.User;
import com.agromart.backend.entity.Wishlist;
import com.agromart.backend.entity.WishlistItem;
import com.agromart.backend.exception.ResourceNotFoundException;
import com.agromart.backend.repository.ProductRepository;
import com.agromart.backend.repository.UserRepository;
import com.agromart.backend.repository.WishlistItemRepository;
import com.agromart.backend.repository.WishlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public WishlistService(WishlistRepository wishlistRepository,
                           WishlistItemRepository wishlistItemRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository) {
        this.wishlistRepository = wishlistRepository;
        this.wishlistItemRepository = wishlistItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    private Wishlist getOrCreateWishlist(User user) {
        return wishlistRepository.findByUser(user)
                .orElseGet(() -> wishlistRepository.save(new Wishlist(user)));
    }

    @Transactional(readOnly = true)
    public List<WishlistItemDTO> getWishlistForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Wishlist wishlist = getOrCreateWishlist(user);
        return wishlist.getItems().stream()
                .map(WishlistItemDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<WishlistItemDTO> addToWishlist(String userEmail, Long productId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        Wishlist wishlist = getOrCreateWishlist(user);

        Optional<WishlistItem> existing = wishlistItemRepository.findByWishlistAndProduct(wishlist, product);
        if (existing.isEmpty()) {
            WishlistItem item = new WishlistItem(wishlist, product);
            wishlist.getItems().add(item);
            wishlistItemRepository.save(item);
        }

        return getWishlistForUser(userEmail);
    }

    @Transactional
    public List<WishlistItemDTO> removeFromWishlist(String userEmail, Long productId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        Wishlist wishlist = getOrCreateWishlist(user);

        wishlistItemRepository.findByWishlistAndProduct(wishlist, product).ifPresent(item -> {
            wishlist.getItems().remove(item);
            wishlistItemRepository.delete(item);
        });

        return getWishlistForUser(userEmail);
    }
}
