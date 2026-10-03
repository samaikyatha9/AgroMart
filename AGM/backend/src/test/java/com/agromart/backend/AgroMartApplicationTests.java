package com.agromart.backend;

import com.agromart.backend.dto.*;
import com.agromart.backend.entity.Role;
import com.agromart.backend.service.AuthService;
import com.agromart.backend.service.CartService;
import com.agromart.backend.service.OrderService;
import com.agromart.backend.service.ProductService;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class AgroMartApplicationTests {

    @Autowired
    private AuthService authService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;

    private static String uniqueCustomerEmail = "test_customer_" + UUID.randomUUID().toString().substring(0, 6) + "@test.com";
    private static Long createdProductId;

    @Test
    @Order(1)
    void contextLoads() {
        assertNotNull(authService);
        assertNotNull(productService);
        assertNotNull(cartService);
        assertNotNull(orderService);
    }

    @Test
    @Order(2)
    void testRegistration() {
        RegisterRequest registerReq = new RegisterRequest(
                "Test Farmer",
                uniqueCustomerEmail,
                "password123",
                "9876543210",
                Role.CUSTOMER,
                "Farm Road 10",
                "Indore",
                "Madhya Pradesh",
                "452001"
        );

        AuthResponse response = authService.register(registerReq);
        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals(uniqueCustomerEmail, response.getUser().getEmail());
        assertEquals("Test Farmer", response.getUser().getName());
        assertEquals(Role.CUSTOMER, response.getUser().getRole());
    }

    @Test
    @Order(3)
    void testLogin() {
        AuthRequest loginReq = new AuthRequest(uniqueCustomerEmail, "password123");
        AuthResponse response = authService.login(loginReq);
        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals(uniqueCustomerEmail, response.getUser().getEmail());
    }

    @Test
    @Order(4)
    void testProductRetrieval() {
        List<ProductDTO> products = productService.getAllProducts("newest");
        assertNotNull(products);
        assertFalse(products.isEmpty(), "Sample products should be pre-seeded by DataInitializer");
    }

    @Test
    @Order(5)
    void testProductCreation() {
        ProductRequest productReq = new ProductRequest(
                "Automated Test Wheat Seeds",
                "Certified test seeds for testing stock and cart functionality",
                new BigDecimal("500.00"),
                50,
                "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
                1L, // First seeded category (Seeds)
                "AgriTestBrand",
                "5 kg Bag"
        );

        ProductDTO product = productService.createProduct(productReq, "seller@agromart.com");
        assertNotNull(product);
        assertNotNull(product.getId());
        assertEquals("Automated Test Wheat Seeds", product.getName());
        assertEquals(50, product.getStock());
        createdProductId = product.getId();
    }

    @Test
    @Order(6)
    void testCartOperations() {
        assertNotNull(createdProductId);

        // Add to cart
        AddToCartRequest addReq = new AddToCartRequest(createdProductId, 2);
        CartDTO cart = cartService.addItemToCart(uniqueCustomerEmail, addReq);
        assertNotNull(cart);
        assertFalse(cart.getItems().isEmpty());

        CartItemDTO item = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(createdProductId))
                .findFirst()
                .orElse(null);
        assertNotNull(item);
        assertEquals(2, item.getQuantity());
        assertEquals(new BigDecimal("1000.00"), cart.getSubtotal());

        // Update quantity
        UpdateCartItemRequest updateReq = new UpdateCartItemRequest(3);
        cart = cartService.updateCartItem(uniqueCustomerEmail, item.getId(), updateReq);
        assertEquals(3, cart.getTotalItems());
        assertEquals(new BigDecimal("1500.00"), cart.getSubtotal());
    }

    @Test
    @Order(7)
    void testOrderCreationAndStockValidation() {
        // Place order for the 3 items currently in cart
        OrderRequest orderReq = new OrderRequest("Farm House 10, Indore", "CASH_ON_DELIVERY");
        OrderDTO order = orderService.createOrder(uniqueCustomerEmail, orderReq);

        assertNotNull(order);
        assertNotNull(order.getId());
        assertEquals(new BigDecimal("1500.00"), order.getTotalAmount()); // 1500 >= 1000, free delivery

        // Verify stock decreased from 50 to 47
        ProductDTO updatedProduct = productService.getProductById(createdProductId);
        assertEquals(47, updatedProduct.getStock());

        // Verify user cart is cleared
        CartDTO emptyCart = cartService.getCartForUser(uniqueCustomerEmail);
        assertTrue(emptyCart.getItems().isEmpty());
    }
}
