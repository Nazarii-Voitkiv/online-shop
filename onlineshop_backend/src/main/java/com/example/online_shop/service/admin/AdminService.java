package com.example.online_shop.service.admin;

import com.example.online_shop.dto.CategoryDTO;
import com.example.online_shop.entities.Category;

import java.util.List;

public interface AdminService {
    Category createCategory(CategoryDTO categoryDTO);

    public List<CategoryDTO> getAllCategories();
}
