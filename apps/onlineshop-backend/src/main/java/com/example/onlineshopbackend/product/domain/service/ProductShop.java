package com.example.onlineshopbackend.product.domain.service;

import com.example.onlineshopbackend.product.domain.aggregate.FilterQuery;
import com.example.onlineshopbackend.product.domain.aggregate.Product;
import com.example.onlineshopbackend.product.domain.repository.ProductRepository;
import com.example.onlineshopbackend.product.domain.vo.ProductSize;
import com.example.onlineshopbackend.product.domain.vo.PublicId;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
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

  public Page<Product> filter(Pageable pageable, FilterQuery query) {
    return productRepository.findByCategoryAndSize(pageable, query);
  }

  public Page<Product> filterBySizesOnly(Pageable pageable, FilterQuery query) {
    return productRepository.findBySizes(pageable, query.sizes());
  }

  public Page<Product> filterByName(Pageable pageable, String name) {
    return productRepository.findByNameContainingIgnoreCase(name, pageable);
  }

  public Page<Product> filterByNameAndCategory(Pageable pageable, String name, PublicId categoryId) {
    return productRepository.findByNameAndCategory(pageable, name, categoryId);
  }

  public Page<Product> filterByNameAndSizes(Pageable pageable, String name, List<ProductSize> sizes) {
    return productRepository.findByNameAndSizes(pageable, name, sizes);
  }

  public Page<Product> filterByNameCategoryAndSizes(Pageable pageable, String name, PublicId categoryId, List<ProductSize> sizes) {
    return productRepository.findByNameCategoryAndSizes(pageable, name, categoryId, sizes);
  }
}
