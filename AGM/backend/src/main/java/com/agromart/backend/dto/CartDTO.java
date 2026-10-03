package com.agromart.backend.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CartDTO {

    private Long id;
    private List<CartItemDTO> items = new ArrayList<>();
    private BigDecimal subtotal = BigDecimal.ZERO;
    private BigDecimal deliveryCharge = BigDecimal.ZERO;
    private BigDecimal totalAmount = BigDecimal.ZERO;
    private Integer totalItems = 0;

    public CartDTO() {
    }

    public CartDTO(Long id, List<CartItemDTO> items) {
        this.id = id;
        this.items = items != null ? items : new ArrayList<>();
        calculateTotals();
    }

    public void calculateTotals() {
        this.subtotal = BigDecimal.ZERO;
        this.totalItems = 0;
        if (items != null) {
            for (CartItemDTO item : items) {
                if (item.getSubtotal() != null) {
                    this.subtotal = this.subtotal.add(item.getSubtotal());
                }
                if (item.getQuantity() != null) {
                    this.totalItems += item.getQuantity();
                }
            }
        }
        // Free delivery on orders ₹1000 and above; otherwise ₹50. ₹0 if empty.
        if (this.subtotal.compareTo(BigDecimal.ZERO) == 0) {
            this.deliveryCharge = BigDecimal.ZERO;
        } else if (this.subtotal.compareTo(new BigDecimal("1000.00")) >= 0) {
            this.deliveryCharge = BigDecimal.ZERO;
        } else {
            this.deliveryCharge = new BigDecimal("50.00");
        }
        this.totalAmount = this.subtotal.add(this.deliveryCharge);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemDTO> items) {
        this.items = items;
        calculateTotals();
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public BigDecimal getDeliveryCharge() {
        return deliveryCharge;
    }

    public void setDeliveryCharge(BigDecimal deliveryCharge) {
        this.deliveryCharge = deliveryCharge;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Integer getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(Integer totalItems) {
        this.totalItems = totalItems;
    }
}
