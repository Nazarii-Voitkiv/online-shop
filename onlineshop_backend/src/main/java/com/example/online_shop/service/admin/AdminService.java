package com.example.online_shop.service.admin;

import com.example.online_shop.dto.CategoryDTO;
import com.example.online_shop.dto.ProductDTO;
import com.example.online_shop.entities.Category;
import com.example.online_shop.entities.Product;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    Category createCategory(CategoryDTO categoryDTO);

    List<CategoryDTO> getAllCategories();

    Product postProduct(Long categoryId, ProductDTO productDTO) throws IOException;

    List<ProductDTO> getAllProducts();

    void deleteProduct(Long id);
}
