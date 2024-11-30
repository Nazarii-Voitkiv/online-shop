package com.example.online_shop.repository;

import com.example.online_shop.dto.ProductDTO;
import com.example.online_shop.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByNameContaining(String title);
}
