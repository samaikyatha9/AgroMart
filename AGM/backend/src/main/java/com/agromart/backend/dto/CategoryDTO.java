package com.agromart.backend.dto;

import com.agromart.backend.entity.Category;

public class CategoryDTO {

    private Long id;
    private String name;
    private String description;
    private String image;
    private Long productCount;

    public CategoryDTO() {
    }

    public CategoryDTO(Category category) {
        if (category != null) {
            this.id = category.getId();
            this.name = category.getName();
            this.description = category.getDescription();
            this.image = category.getImage();
        }
    }

    public CategoryDTO(Category category, Long productCount) {
        this(category);
        this.productCount = productCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getProductCount() {
        return productCount;
    }

    public void setProductCount(Long productCount) {
        this.productCount = productCount;
    }
}
