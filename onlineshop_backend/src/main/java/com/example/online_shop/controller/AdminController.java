package com.example.online_shop.controller;

import com.example.online_shop.dto.CategoryDTO;
import com.example.online_shop.dto.ProductDTO;
import com.example.online_shop.entities.Category;
import com.example.online_shop.entities.Product;
import com.example.online_shop.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/category")
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDTO categoryDTO) {
        System.out.println("Received request: " + categoryDTO);
        Category createdCategory = adminService.createCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> allCategories = adminService.getAllCategories();
        return ResponseEntity.ok(allCategories);
    }

    @PostMapping("/product/{categoryId}")
    public ResponseEntity<Product> postProduct(@PathVariable Long categoryId, @ModelAttribute ProductDTO productDTO) throws IOException {
        Product postedProduct = adminService.postProduct(categoryId, productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(postedProduct);
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> productDTOList = adminService.getAllProducts();
        return ResponseEntity.ok(productDTOList);
    }
}