package com.example.onlineshopbackend.order.infrastructure.secondary.repository;

import com.example.onlineshopbackend.order.infrastructure.secondary.entity.OrderedProductEntity;
import com.example.onlineshopbackend.order.infrastructure.secondary.entity.OrderedProductEntityPk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaOrderedProductRepository extends JpaRepository<OrderedProductEntity, OrderedProductEntityPk> {

}
