package com.example.onlineshopbackend.product.infrastructure.secondary.repository;

import com.example.onlineshopbackend.product.domain.vo.ProductSize;
import com.example.onlineshopbackend.product.infrastructure.secondary.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JpaProductRepository  extends JpaRepository<ProductEntity, Long> {

  int deleteByPublicId(UUID publicId);

  Optional<ProductEntity> findByPublicId(UUID publicId);

  Page<ProductEntity> findAllByFeaturedTrue(Pageable pageable);

  Page<ProductEntity> findByCategoryPublicIdAndPublicIdNot(Pageable pageable, UUID categoryPublicId, UUID excludedProductPublicId);

  @Query("SELECT product FROM ProductEntity product WHERE (:sizes is null or product.size IN (:sizes)) AND " +
    "product.category.publicId = :categoryPublicId")
  Page<ProductEntity> findByCategoryPublicIdAndSizesIn(Pageable pageable, UUID categoryPublicId, List<ProductSize> sizes);

  List<ProductEntity> findAllByPublicIdIn(List<UUID> publicIds);

  @Modifying
  @Query("UPDATE ProductEntity  product " +
    "SET product.nbInStock = product.nbInStock - :quantity " +
    "WHERE product.publicId = :productPublicId")
  void updateQuantity(UUID productPublicId, long quantity);

  @Query("SELECT p FROM ProductEntity p WHERE p.size IN :sizes")
  Page<ProductEntity> findBySizesIn(Pageable pageable, @Param("sizes") List<ProductSize> sizes);

  Page<ProductEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);

  @Query("SELECT p FROM ProductEntity p WHERE p.category.publicId = :categoryPublicId AND LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
  Page<ProductEntity> findByCategoryPublicIdAndNameContainingIgnoreCase(@Param("categoryPublicId") UUID categoryPublicId, @Param("name") String name, Pageable pageable);

  @Query("SELECT p FROM ProductEntity p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) AND p.size IN :sizes")
  Page<ProductEntity> findByNameContainingIgnoreCaseAndSizeIn(@Param("name") String name, @Param("sizes") List<ProductSize> sizes, Pageable pageable);

  @Query("SELECT p FROM ProductEntity p WHERE p.category.publicId = :categoryPublicId " +
          "AND LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) AND p.size IN :sizes")
  Page<ProductEntity> findByCategoryPublicIdAndNameContainingIgnoreCaseAndSizeIn(@Param("categoryPublicId") UUID categoryPublicId,
                                                                                 @Param("name") String name,
                                                                                 @Param("sizes") List<ProductSize> sizes,
                                                                                 Pageable pageable);
}
