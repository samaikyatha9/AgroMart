package com.agromart.backend.service;

import com.agromart.backend.dto.AddToCartRequest;
import com.agromart.backend.dto.CartDTO;
import com.agromart.backend.dto.CartItemDTO;
import com.agromart.backend.dto.UpdateCartItemRequest;
import com.agromart.backend.entity.Cart;
import com.agromart.backend.entity.CartItem;
import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.User;
import com.agromart.backend.exception.BadRequestException;
import com.agromart.backend.exception.InsufficientStockException;
import com.agromart.backend.exception.ResourceNotFoundException;
import com.agromart.backend.repository.CartItemRepository;
import com.agromart.backend.repository.CartRepository;
import com.agromart.backend.repository.ProductRepository;
import com.agromart.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       ProductRepository productRepository,
                       UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(new Cart(user)));
    }

    @Transactional(readOnly = true)
    public CartDTO getCartForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Cart cart = getOrCreateCart(user);
        List<CartItemDTO> itemDTOs = cart.getItems().stream()
                .map(CartItemDTO::new)
                .collect(Collectors.toList());

        return new CartDTO(cart.getId(), itemDTOs);
    }

    @Transactional
    public CartDTO addItemToCart(String userEmail, AddToCartRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + request.getProductId()));

        if (product.getStock() < request.getQuantity()) {
            throw new InsufficientStockException("Insufficient stock. Only " + product.getStock() + " units available.");
        }

        Cart cart = getOrCreateCart(user);

        Optional<CartItem> existingItemOpt = cartItemRepository.findByCartAndProduct(cart, product);
        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            int newQuantity = existingItem.getQuantity() + request.getQuantity();
            if (product.getStock() < newQuantity) {
                throw new InsufficientStockException("Cannot add more. Total in cart (" + newQuantity + ") exceeds available stock (" + product.getStock() + ").");
            }
            existingItem.setQuantity(newQuantity);
            existingItem.setPrice(product.getPrice());
            cartItemRepository.save(existingItem);
        } else {
            CartItem newItem = new CartItem(cart, product, request.getQuantity(), product.getPrice());
            cart.getItems().add(newItem);
            cartItemRepository.save(newItem);
        }

        return getCartForUser(userEmail);
    }

    @Transactional
    public CartDTO updateCartItem(String userEmail, Long itemId, UpdateCartItemRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Cart cart = getOrCreateCart(user);

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + itemId));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Cart item does not belong to user's cart");
        }

        if (request.getQuantity() <= 0) {
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
        } else {
            if (item.getProduct().getStock() < request.getQuantity()) {
                throw new InsufficientStockException("Insufficient stock. Only " + item.getProduct().getStock() + " available.");
            }
            item.setQuantity(request.getQuantity());
            item.setPrice(item.getProduct().getPrice());
            cartItemRepository.save(item);
        }

        return getCartForUser(userEmail);
    }

    @Transactional
    public CartDTO removeItemFromCart(String userEmail, Long itemId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Cart cart = getOrCreateCart(user);

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + itemId));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Cart item does not belong to user's cart");
        }

        cart.getItems().remove(item);
        cartItemRepository.delete(item);

        return getCartForUser(userEmail);
    }

    @Transactional
    public void clearCart(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Cart cart = getOrCreateCart(user);
        cart.getItems().clear();
        cartItemRepository.deleteByCart(cart);
    }
}
