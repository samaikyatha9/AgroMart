package com.agromart.backend.dto;

import com.agromart.backend.entity.WishlistItem;
import java.math.BigDecimal;

public class WishlistItemDTO {

    private Long id;
    private Long productId;
    private String productName;
    private String productImageUrl;
    private BigDecimal price;
    private Integer stockAvailable;
    private String unit;
    private String categoryName;

    public WishlistItemDTO() {
    }

    public WishlistItemDTO(WishlistItem item) {
        if (item != null) {
            this.id = item.getId();
            if (item.getProduct() != null) {
                this.productId = item.getProduct().getId();
                this.productName = item.getProduct().getName();
                this.productImageUrl = item.getProduct().getImageUrl();
                this.price = item.getProduct().getPrice();
                this.stockAvailable = item.getProduct().getStock();
                this.unit = item.getProduct().getUnit();
                if (item.getProduct().getCategory() != null) {
                    this.categoryName = item.getProduct().getCategory().getName();
                }
            }
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStockAvailable() {
        return stockAvailable;
    }

    public void setStockAvailable(Integer stockAvailable) {
        this.stockAvailable = stockAvailable;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
