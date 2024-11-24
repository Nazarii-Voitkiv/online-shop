package com.example.online_shop.service.admin;

import com.example.online_shop.dto.CategoryDTO;
import com.example.online_shop.entities.Category;

public interface AdminService {
    Category createCategory(CategoryDTO categoryDTO);
}
