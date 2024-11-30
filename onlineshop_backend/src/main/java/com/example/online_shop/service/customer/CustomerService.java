package com.example.online_shop.service.customer;

import com.example.online_shop.dto.CartItemDTO;
import com.example.online_shop.dto.OrderDTO;
import com.example.online_shop.dto.ProductDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CustomerService {

    List<ProductDTO> getAllProducts();

    List<ProductDTO> searchProductsByTitle(String title);

    ResponseEntity<?> addProductToCart(CartItemDTO cartItemDTO);

    OrderDTO getCartByUserId(Long userId);

    OrderDTO addMinusOnProduct(Long userId, Long productId);

    OrderDTO addPlusOnProduct(Long userId, Long productId);
}
