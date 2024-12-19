package com.example.onlineshopbackend.product.infrastructure.secondary.repository;

import com.example.onlineshopbackend.product.infrastructure.secondary.entity.PictureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaProductPictureRepository extends JpaRepository<PictureEntity, Long> {
}
