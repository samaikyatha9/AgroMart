package com.agromart.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public class SellerDashboardStatsDTO {

    private long totalProducts;
    private long lowStockProducts;
    private long totalOrders;
    private BigDecimal totalSales;
    private List<ProductDTO> lowStockItems;
    private List<OrderDTO> recentOrders;

    public SellerDashboardStatsDTO() {
        this.totalSales = BigDecimal.ZERO;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getLowStockProducts() {
        return lowStockProducts;
    }

    public void setLowStockProducts(long lowStockProducts) {
        this.lowStockProducts = lowStockProducts;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public BigDecimal getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(BigDecimal totalSales) {
        this.totalSales = totalSales;
    }

    public List<ProductDTO> getLowStockItems() {
        return lowStockItems;
    }

    public void setLowStockItems(List<ProductDTO> lowStockItems) {
        this.lowStockItems = lowStockItems;
    }

    public List<OrderDTO> getRecentOrders() {
        return recentOrders;
    }

    public void setRecentOrders(List<OrderDTO> recentOrders) {
        this.recentOrders = recentOrders;
    }
}
