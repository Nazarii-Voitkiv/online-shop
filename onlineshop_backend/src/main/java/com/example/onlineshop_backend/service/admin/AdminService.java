package com.example.onlineshop_backend.service.admin;

import com.example.onlineshop_backend.dto.CategoryDTO;
import com.example.onlineshop_backend.dto.OrderDTO;
import com.example.onlineshop_backend.dto.ProductDTO;
import com.example.onlineshop_backend.entities.Category;
import com.example.onlineshop_backend.entities.Product;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    Category createCategory(CategoryDTO categoryDTO);

    List<CategoryDTO> getAllCategories();

    Product postProduct(Long categoryId, ProductDTO productDTO) throws IOException;

    List<ProductDTO> getAllProducts();

    void deleteProduct(Long id);

    ProductDTO getProductById(Long id);

    ProductDTO updateProduct(Long categoryId, Long productId, ProductDTO productDTO) throws IOException;

    List<OrderDTO> getAllOrders();
}