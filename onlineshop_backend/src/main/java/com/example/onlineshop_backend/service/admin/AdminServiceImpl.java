package com.example.onlineshop_backend.service.admin;

import com.example.onlineshop_backend.dto.CategoryDTO;
import com.example.onlineshop_backend.dto.OrderDTO;
import com.example.onlineshop_backend.dto.ProductDTO;
import com.example.onlineshop_backend.entities.Category;
import com.example.onlineshop_backend.entities.Order;
import com.example.onlineshop_backend.entities.Product;
import com.example.onlineshop_backend.enums.OrderStatus;
import com.example.onlineshop_backend.repository.CategoryRepository;
import com.example.onlineshop_backend.repository.OrderRepository;
import com.example.onlineshop_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Category createCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        return categoryRepository.save(category);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream().map(Category::getCategoryDTO).collect(Collectors.toList());
    }

    @Override
    public Product postProduct(Long categoryId, ProductDTO productDTO) throws IOException {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            Product product = new Product();
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            product.setDescription(productDTO.getDescription());
            product.setImage(productDTO.getImage().getBytes());
            product.setCategory(optionalCategory.get());
            return productRepository.save(product);
        }
        return null;
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(Product::getProductDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteProduct(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new IllegalArgumentException("Product not found");
        }
        productRepository.deleteById(id);
    }

    @Override
    public ProductDTO getProductById(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return product.getProductDTO();
        }
        return null;
    }

    @Override
    public ProductDTO updateProduct(Long categoryId, Long productId, ProductDTO productDTO) throws IOException {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if(optionalCategory.isPresent() && optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            product.setDescription(productDTO.getDescription());
            product.setCategory(optionalCategory.get());
            if(productDTO.getImage() != null) {
                product.setImage(productDTO.getImage().getBytes());
            }
            Product updatedProduct = productRepository.save(product);
            ProductDTO updatedProductDTO = new ProductDTO();
            updatedProductDTO.setId(updatedProduct.getId());
            return updatedProductDTO;
        }
        return null;
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllByOrderStatus(OrderStatus.SUBMITTED).stream().map(Order::getOrderDTO).collect(Collectors.toList());
    }
}