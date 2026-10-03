package com.agromart.backend.service;

import com.agromart.backend.dto.CategoryDTO;
import com.agromart.backend.entity.Category;
import com.agromart.backend.exception.BadRequestException;
import com.agromart.backend.exception.ResourceNotFoundException;
import com.agromart.backend.repository.CategoryRepository;
import com.agromart.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(cat -> new CategoryDTO(cat, productRepository.countByCategoryId(cat.getId())))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return new CategoryDTO(category, productRepository.countByCategoryId(category.getId()));
    }

    @Transactional
    public CategoryDTO createCategory(CategoryDTO dto) {
        if (categoryRepository.existsByName(dto.getName().trim())) {
            throw new BadRequestException("Category already exists: " + dto.getName());
        }
        Category category = new Category(dto.getName().trim(), dto.getDescription(), dto.getImage());
        Category saved = categoryRepository.save(category);
        return new CategoryDTO(saved, 0L);
    }

    @Transactional
    public CategoryDTO updateCategory(Long id, CategoryDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        if (dto.getName() != null && !dto.getName().isBlank()) {
            category.setName(dto.getName().trim());
        }
        if (dto.getDescription() != null) {
            category.setDescription(dto.getDescription());
        }
        if (dto.getImage() != null) {
            category.setImage(dto.getImage());
        }

        Category updated = categoryRepository.save(category);
        return new CategoryDTO(updated, productRepository.countByCategoryId(updated.getId()));
    }

    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }
        long count = productRepository.countByCategoryId(id);
        if (count > 0) {
            throw new BadRequestException("Cannot delete category with " + count + " associated products.");
        }
        categoryRepository.deleteById(id);
    }
}
