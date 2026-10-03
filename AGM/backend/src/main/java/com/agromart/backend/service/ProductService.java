package com.agromart.backend.service;

import com.agromart.backend.dto.ProductDTO;
import com.agromart.backend.dto.ProductRequest;
import com.agromart.backend.entity.Category;
import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.Role;
import com.agromart.backend.entity.User;
import com.agromart.backend.exception.BadRequestException;
import com.agromart.backend.exception.ResourceNotFoundException;
import com.agromart.backend.repository.CategoryRepository;
import com.agromart.backend.repository.ProductRepository;
import com.agromart.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository,
                          UserRepository userRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts(String sortBy) {
        List<Product> products;
        if ("price_asc".equalsIgnoreCase(sortBy)) {
            products = productRepository.findAllByOrderByPriceAsc();
        } else if ("price_desc".equalsIgnoreCase(sortBy)) {
            products = productRepository.findAllByOrderByPriceDesc();
        } else {
            products = productRepository.findAllByOrderByCreatedAtDesc();
        }
        return products.stream().map(ProductDTO::new).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return new ProductDTO(product);
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> searchProducts(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return getAllProducts("newest");
        }
        return productRepository.searchProducts(keyword.trim()).stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> filterProducts(Long categoryId, BigDecimal minPrice, BigDecimal maxPrice) {
        BigDecimal min = minPrice != null ? minPrice : BigDecimal.ZERO;
        BigDecimal max = maxPrice != null ? maxPrice : new BigDecimal("99999999.99");

        List<Product> products;
        if (categoryId != null && categoryId > 0) {
            products = productRepository.findByCategoryIdAndPriceBetween(categoryId, min, max);
        } else {
            products = productRepository.findByPriceBetween(min, max);
        }
        return products.stream().map(ProductDTO::new).collect(Collectors.toList());
    }

    @Transactional
    public ProductDTO createProduct(ProductRequest request, String sellerEmail) {
        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found with email: " + sellerEmail));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        Product product = new Product(
                request.getName().trim(),
                request.getDescription(),
                request.getPrice(),
                request.getStock(),
                request.getImageUrl(),
                category,
                seller,
                request.getBrand(),
                request.getUnit()
        );

        Product saved = productRepository.save(product);
        return new ProductDTO(saved);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductRequest request, String userEmail, boolean isAdmin) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        // Authorization check: only admin or the product's seller can update
        if (!isAdmin && !product.getSeller().getEmail().equalsIgnoreCase(userEmail)) {
            throw new BadRequestException("You do not have permission to update this product");
        }

        if (request.getName() != null && !request.getName().isBlank()) {
            product.setName(request.getName().trim());
        }
        if (request.getDescription() != null) {
            product.setDescription(request.getDescription());
        }
        if (request.getPrice() != null) {
            product.setPrice(request.getPrice());
        }
        if (request.getStock() != null) {
            product.setStock(request.getStock());
        }
        if (request.getImageUrl() != null) {
            product.setImageUrl(request.getImageUrl());
        }
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));
            product.setCategory(category);
        }
        if (request.getBrand() != null) {
            product.setBrand(request.getBrand());
        }
        if (request.getUnit() != null) {
            product.setUnit(request.getUnit());
        }

        Product updated = productRepository.save(product);
        return new ProductDTO(updated);
    }

    @Transactional
    public void deleteProduct(Long id, String userEmail, boolean isAdmin) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        if (!isAdmin && !product.getSeller().getEmail().equalsIgnoreCase(userEmail)) {
            throw new BadRequestException("You do not have permission to delete this product");
        }

        productRepository.delete(product);
    }
}
