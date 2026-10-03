package com.agromart.backend.controller;

import com.agromart.backend.dto.AddToCartRequest;
import com.agromart.backend.dto.ApiResponse;
import com.agromart.backend.dto.CartDTO;
import com.agromart.backend.dto.UpdateCartItemRequest;
import com.agromart.backend.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<CartDTO> getCart(Authentication authentication) {
        return ResponseEntity.ok(cartService.getCartForUser(authentication.getName()));
    }

    @PostMapping("/items")
    public ResponseEntity<CartDTO> addItemToCart(@Valid @RequestBody AddToCartRequest request, Authentication authentication) {
        return ResponseEntity.ok(cartService.addItemToCart(authentication.getName(), request));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartDTO> updateCartItem(@PathVariable Long itemId,
                                                  @Valid @RequestBody UpdateCartItemRequest request,
                                                  Authentication authentication) {
        return ResponseEntity.ok(cartService.updateCartItem(authentication.getName(), itemId, request));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartDTO> removeItemFromCart(@PathVariable Long itemId, Authentication authentication) {
        return ResponseEntity.ok(cartService.removeItemFromCart(authentication.getName(), itemId));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse<Void>> clearCart(Authentication authentication) {
        cartService.clearCart(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Cart cleared successfully", null));
    }
}
