package com.agromart.backend.controller;

import com.agromart.backend.dto.*;
import com.agromart.backend.service.SellerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seller")
@PreAuthorize("hasRole('SELLER')")
public class SellerController {

    private final SellerService sellerService;

    public SellerController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<SellerDashboardStatsDTO> getDashboard(Authentication authentication) {
        return ResponseEntity.ok(sellerService.getSellerDashboard(authentication.getName()));
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getSellerProducts(Authentication authentication) {
        return ResponseEntity.ok(sellerService.getSellerProducts(authentication.getName()));
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> addProduct(@Valid @RequestBody ProductRequest request, Authentication authentication) {
        ProductDTO created = sellerService.addProduct(request, authentication.getName());
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id,
                                                    @Valid @RequestBody ProductRequest request,
                                                    Authentication authentication) {
        return ResponseEntity.ok(sellerService.updateProduct(id, request, authentication.getName()));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id, Authentication authentication) {
        sellerService.deleteProduct(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> getSellerOrders(Authentication authentication) {
        return ResponseEntity.ok(sellerService.getSellerOrders(authentication.getName()));
    }
}
