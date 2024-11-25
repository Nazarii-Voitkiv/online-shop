package com.example.online_shop.service.customer;

import com.example.online_shop.dto.CartItemDTO;
import com.example.online_shop.dto.ProductDTO;
import com.example.online_shop.entities.CartItems;
import com.example.online_shop.entities.Order;
import com.example.online_shop.entities.Product;
import com.example.online_shop.entities.User;
import com.example.online_shop.enums.OrderStatus;
import com.example.online_shop.repository.CartItemsRepository;
import com.example.online_shop.repository.OrderRepository;
import com.example.online_shop.repository.ProductRepository;
import com.example.online_shop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final ProductRepository productRepository;

    private final OrderRepository orderRepository;

    private final CartItemsRepository cartItemsRepository;

    private final UserRepository userRepository;

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(Product::getProductDTO).collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> searchProductsByTitle(String title) {
        return productRepository.findAllByNameContaining(title).stream().map(Product::getProductDTO).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> addProductToCart(CartItemDTO cartItemDTO) {
        Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(cartItemDTO.getUserId(), OrderStatus.PENDING);
        Optional<CartItems> optionalCartItem = cartItemsRepository.findByUserIdAndProductIdAndOrderId(
                cartItemDTO.getUserId(),
                cartItemDTO.getProductId(),
                cartItemDTO.getOrderId());
        if(optionalCartItem.isPresent()) {
            CartItemDTO productAlreadyExistInCart = new CartItemDTO();
            productAlreadyExistInCart.setProductId(null);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(productAlreadyExistInCart);
        } else {
            Optional<Product> optionalProduct = productRepository.findById(cartItemDTO.getProductId());
            Optional<User> optionalUser = userRepository.findById(cartItemDTO.getUserId());
            if(optionalProduct.isPresent() && optionalUser.isPresent()) {
                Product product = optionalProduct.get();
                CartItems cartItem = new CartItems();
                cartItem.setProduct(product);
                cartItem.setUser(optionalUser.get());
                cartItem.setQuantity(1L);
                cartItem.setOrder(pendingOrder);
                cartItem.setPrice(product.getPrice());
                CartItems updatedCart = cartItemsRepository.save(cartItem);
                pendingOrder.setPrice(pendingOrder.getPrice() + cartItem.getPrice());
                pendingOrder.getCartItems().add(cartItem);
                orderRepository.save(pendingOrder);
                CartItemDTO updatedCartItemDTO = new CartItemDTO();
                updatedCartItemDTO.setId(updatedCart.getId());
                return ResponseEntity.status(HttpStatus.CREATED).body(updatedCartItemDTO);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or product not found");
            }
        }
    }
}