package com.example.onlineshop_backend.service.customer;

import com.example.onlineshop_backend.dto.CartItemDTO;
import com.example.onlineshop_backend.dto.OrderDTO;
import com.example.onlineshop_backend.dto.PlaceOrderDTO;
import com.example.onlineshop_backend.dto.ProductDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CustomerService {

    List<ProductDTO> getAllProducts();

    List<ProductDTO> searchProductsByTitle(String title);

    ResponseEntity<?> addProductToCart(CartItemDTO cartItemDTO);

    OrderDTO getCartByUserId(Long userId);

    OrderDTO addMinusOnProduct(Long userId, Long productId);

    OrderDTO addPlusOnProduct(Long userId, Long productId);

    OrderDTO placeOrder(PlaceOrderDTO placeOrderDTO);

    List<OrderDTO> getOrdersByUserId(Long userId);
}