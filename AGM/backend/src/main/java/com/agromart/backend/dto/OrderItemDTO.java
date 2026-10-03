package com.agromart.backend.dto;

import com.agromart.backend.entity.OrderItem;
import java.math.BigDecimal;

public class OrderItemDTO {

    private Long id;
    private Long productId;
    private String productName;
    private String productImageUrl;
    private String unit;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal subtotal;

    public OrderItemDTO() {
    }

    public OrderItemDTO(OrderItem item) {
        if (item != null) {
            this.id = item.getId();
            if (item.getProduct() != null) {
                this.productId = item.getProduct().getId();
                this.productName = item.getProduct().getName();
                this.productImageUrl = item.getProduct().getImageUrl();
                this.unit = item.getProduct().getUnit();
            }
            this.price = item.getPrice();
            this.quantity = item.getQuantity();
            this.subtotal = item.getSubtotal();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductImageUrl() {
        return productImageUrl;
    }

    public void setProductImageUrl(String productImageUrl) {
        this.productImageUrl = productImageUrl;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }
}
