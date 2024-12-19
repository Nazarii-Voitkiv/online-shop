package com.example.onlineshopbackend.product.domain.repository;

import com.example.onlineshopbackend.product.domain.aggregate.Category;
import com.example.onlineshopbackend.product.domain.vo.PublicId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryRepository {

  Page<Category> findAll(Pageable pageable);

  int delete(PublicId publicId);

  Category save(Category categoryToCreate);
}
