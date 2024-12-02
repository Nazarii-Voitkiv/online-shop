package com.example.onlineshop_backend.repository;

import com.example.onlineshop_backend.entities.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemsRepository extends JpaRepository<CartItems, Long> {
    Optional<CartItems> findByUserIdAndProductIdAndOrderId(Long userId, Long productId, Long orderId);
}
