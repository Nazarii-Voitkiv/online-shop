package com.example.onlineshop_backend.controller;

import com.example.onlineshop_backend.dto.CartItemDTO;
import com.example.onlineshop_backend.dto.OrderDTO;
import com.example.onlineshop_backend.dto.PlaceOrderDTO;
import com.example.onlineshop_backend.dto.ProductDTO;
import com.example.onlineshop_backend.service.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/{userId}/deduct/{productId}")
    public ResponseEntity<OrderDTO> addMinusOnProduct(@PathVariable Long userId, @PathVariable Long productId) {
        OrderDTO orderDTO = customerService.addMinusOnProduct(userId, productId);
        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping("/{userId}/add/{productId}")
    public ResponseEntity<OrderDTO> addPlusOnProduct(@PathVariable Long userId, @PathVariable Long productId) {
        OrderDTO orderDTO = customerService.addPlusOnProduct(userId, productId);
        return ResponseEntity.ok(orderDTO);
    }

    @PostMapping("/placeOrder")
    public ResponseEntity<OrderDTO> placeOrder(@RequestBody PlaceOrderDTO placeOrderDTO) {
        OrderDTO orderDTO = customerService.placeOrder(placeOrderDTO);
        if(orderDTO == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(orderDTO);
    }

    @GetMapping("/orders/{userId}")
    public ResponseEntity<List <OrderDTO>> getOrdersByUserId(@PathVariable Long userId) {
        List<OrderDTO> orderDTOList = customerService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orderDTOList);
    }
}