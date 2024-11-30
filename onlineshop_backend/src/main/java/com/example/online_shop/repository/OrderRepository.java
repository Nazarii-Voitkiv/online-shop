package com.example.online_shop.repository;

import com.example.online_shop.entities.Order;
import com.example.online_shop.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByUserIdAndOrderStatus(Long userId, OrderStatus orderStatus);
}
