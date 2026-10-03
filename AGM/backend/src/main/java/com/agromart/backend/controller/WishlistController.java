package com.agromart.backend.controller;

import com.agromart.backend.dto.WishlistItemDTO;
import com.agromart.backend.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public ResponseEntity<List<WishlistItemDTO>> getWishlist(Authentication authentication) {
        return ResponseEntity.ok(wishlistService.getWishlistForUser(authentication.getName()));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<List<WishlistItemDTO>> addToWishlist(@PathVariable Long productId, Authentication authentication) {
        return ResponseEntity.ok(wishlistService.addToWishlist(authentication.getName(), productId));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<List<WishlistItemDTO>> removeFromWishlist(@PathVariable Long productId, Authentication authentication) {
        return ResponseEntity.ok(wishlistService.removeFromWishlist(authentication.getName(), productId));
    }
}
