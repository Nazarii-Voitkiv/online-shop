package com.example.online_shop.controller;

import com.example.online_shop.dto.CartItemDTO;
import com.example.online_shop.dto.OrderDTO;
import com.example.online_shop.dto.ProductDTO;
import com.example.online_shop.service.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/customer")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> productDTOList = customerService.getAllProducts();
        return ResponseEntity.ok(productDTOList);
    }

    @GetMapping("/product/search/{title}")
    public ResponseEntity<List<ProductDTO>> searchProductByTitle(@PathVariable String title) {
        List<ProductDTO> productDTOList = customerService.searchProductsByTitle(title);
        return ResponseEntity.ok(productDTOList);
    }

    @PostMapping("/cart")
    public ResponseEntity<?> postProductToCart(@RequestBody CartItemDTO cartItemDTO) {
        return customerService.addProductToCart(cartItemDTO);
    }

    @GetMapping("/cart/{userId}")
    public ResponseEntity<OrderDTO> getCartByUserId(@PathVariable Long userId) {
        OrderDTO orderDTO = customerService.getCartByUserId(userId);
        if(orderDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orderDTO);
    }

    @PostMapping("{userId}/deduct/{productId}")
    public ResponseEntity<OrderDTO> addMinusOnProduct(@PathVariable Long userId, @PathVariable Long productId) {
        OrderDTO orderDTO = customerService.addMinusOnProduct(userId, productId);
        return ResponseEntity.ok(orderDTO);
    }

    @PostMapping("{userId}/add/{productId}")
    public ResponseEntity<OrderDTO> addPlusOnProduct(@PathVariable Long userId, @PathVariable Long productId) {
        OrderDTO orderDTO = customerService.addPlusOnProduct(userId, productId);
        return ResponseEntity.ok(orderDTO);
    }
}