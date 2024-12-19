package com.example.onlineshopbackend.product.domain.service;

import com.example.onlineshopbackend.product.domain.aggregate.FilterQuery;
import com.example.onlineshopbackend.product.domain.aggregate.Product;
import com.example.onlineshopbackend.product.domain.repository.ProductRepository;
import com.example.onlineshopbackend.product.domain.vo.PublicId;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public class ProductShop {

  private ProductRepository productRepository;

  public ProductShop(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  public Page<Product> getFeaturedProducts(Pageable pageable) {
    return productRepository.findAllFeaturedProduct(pageable);
  }

  public Page<Product> findRelated(Pageable pageable, PublicId productPublicId) {
    Optional<Product> productOpt = productRepository.findOne(productPublicId);
    if (productOpt.isPresent()) {
      Product product = productOpt.get();
      return productRepository.findByCategoryExcludingOne(pageable,
        product.getCategory().getPublicId(),
        productPublicId);
    } else {
      throw new EntityNotFoundException(String.format("No product found with id %s", productPublicId));
    }
  }

  /**
   * Існуючий метод, який фільтрує за категорією та розміром.
   */
  public Page<Product> filter(Pageable pageable, FilterQuery query) {
    return productRepository.findByCategoryAndSize(pageable, query);
  }

  /**
   * Новий метод, який фільтрує продукти без категорії.
   * Наприклад, фільтрація лише за розміром (якщо query містить розміри).
   */
  public Page<Product> filterBySizesOnly(Pageable pageable, FilterQuery query) {
    // Тут викликаємо новий метод репозиторію, який повертає продукти за розміром без категорії.
    return productRepository.findBySizes(pageable, query.sizes());
  }
}
