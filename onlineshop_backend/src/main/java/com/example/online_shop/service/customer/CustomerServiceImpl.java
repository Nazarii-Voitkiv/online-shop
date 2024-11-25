package com.example.online_shop.service.customer;

import com.example.online_shop.dto.ProductDTO;
import com.example.online_shop.entities.Product;
import com.example.online_shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(Product::getProductDTO).collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> searchProductsByTitle(String title) {
        return productRepository.findAllByNameContaining(title).stream().map(Product::getProductDTO).collect(Collectors.toList());
    }
}
