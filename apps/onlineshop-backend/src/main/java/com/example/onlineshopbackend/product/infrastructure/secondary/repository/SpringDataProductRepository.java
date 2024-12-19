package com.example.onlineshopbackend.product.infrastructure.secondary.repository;

import com.example.onlineshopbackend.order.domain.order.vo.ProductPublicId;
import com.example.onlineshopbackend.product.domain.aggregate.FilterQuery;
import com.example.onlineshopbackend.product.domain.aggregate.Picture;
import com.example.onlineshopbackend.product.domain.aggregate.Product;
import com.example.onlineshopbackend.product.domain.repository.ProductRepository;
import com.example.onlineshopbackend.product.domain.vo.ProductSize;
import com.example.onlineshopbackend.product.domain.vo.PublicId;
import com.example.onlineshopbackend.product.infrastructure.secondary.entity.CategoryEntity;
import com.example.onlineshopbackend.product.infrastructure.secondary.entity.PictureEntity;
import com.example.onlineshopbackend.product.infrastructure.secondary.entity.ProductEntity;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public class SpringDataProductRepository implements ProductRepository {

  private final JpaCategoryRepository jpaCategoryRepository;

  private final JpaProductRepository jpaProductRepository;

  private final JpaProductPictureRepository jpaProductPictureRepository;

  public SpringDataProductRepository(JpaCategoryRepository jpaCategoryRepository, JpaProductRepository jpaProductRepository, JpaProductPictureRepository jpaProductPictureRepository) {
    this.jpaCategoryRepository = jpaCategoryRepository;
    this.jpaProductRepository = jpaProductRepository;
    this.jpaProductPictureRepository = jpaProductPictureRepository;
  }

  @Override
  public Product save(Product productToCreate) {
    ProductEntity newProductEntity = ProductEntity.from(productToCreate);
    Optional<CategoryEntity> categoryEntityOpt = jpaCategoryRepository.findByPublicId(newProductEntity.getCategory().getPublicId());
    CategoryEntity categoryEntity = categoryEntityOpt.orElseThrow(() -> new EntityNotFoundException(String.format("No category found with Id %s", productToCreate.getCategory().getPublicId())));
    newProductEntity.setCategory(categoryEntity);
    ProductEntity savedProductEntity = jpaProductRepository.save(newProductEntity);

    saveAllPictures(productToCreate.getPictures(), savedProductEntity);

    return ProductEntity.to(savedProductEntity);
  }

  private void saveAllPictures(List<Picture> pictures, ProductEntity newProductEntity) {
    Set<PictureEntity> picturesEntities = PictureEntity.from(pictures);

    for (PictureEntity picturesEntity : picturesEntities) {
      picturesEntity.setProduct(newProductEntity);
    }

    jpaProductPictureRepository.saveAll(picturesEntities);
  }

  @Override
  public Page<Product> findAll(Pageable pageable) {
    return jpaProductRepository.findAll(pageable).map(ProductEntity::to);
  }

  @Override
  public int delete(PublicId publicId) {
    return jpaProductRepository.deleteByPublicId(publicId.value());
  }

  @Override
  public Page<Product> findAllFeaturedProduct(Pageable pageable) {
    return jpaProductRepository.findAllByFeaturedTrue(pageable).map(ProductEntity::to);
  }

  @Override
  public Optional<Product> findOne(PublicId publicId) {
    return jpaProductRepository.findByPublicId(publicId.value()).map(ProductEntity::to);
  }

  @Override
  public Page<Product> findByCategoryExcludingOne(Pageable pageable, PublicId categoryPublicId, PublicId productPublicId) {
    return jpaProductRepository.findByCategoryPublicIdAndPublicIdNot(pageable, categoryPublicId.value(), productPublicId.value())
      .map(ProductEntity::to);
  }

  @Override
  public Page<Product> findByCategoryAndSize(Pageable pageable, FilterQuery filterQuery) {
    return jpaProductRepository.findByCategoryPublicIdAndSizesIn(
      pageable, filterQuery.categoryId().value(), filterQuery.sizes()
    ).map(ProductEntity::to);
  }

  @Override
  public List<Product> findByPublicIds(List<PublicId> publicIds) {
    List<UUID> publicIdsUUID = publicIds.stream().map(PublicId::value).toList();
    return jpaProductRepository.findAllByPublicIdIn(publicIdsUUID)
      .stream().map(ProductEntity::to).toList();
  }

  @Override
  public void updateQuantity(ProductPublicId productPublicId, long quantity) {
    jpaProductRepository.updateQuantity(productPublicId.value(), quantity);
  }

  @Override
  public Page<Product> findBySizes(Pageable pageable, List<ProductSize> sizes) {
    return jpaProductRepository.findBySizesIn(pageable, sizes)
      .map(ProductEntity::to);
  }

  @Override
  public Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable) {
    return jpaProductRepository.findByNameContainingIgnoreCase(name, pageable).map(ProductEntity::to);
  }

  @Override
  public Page<Product> findByNameAndCategory(Pageable pageable, String name, PublicId categoryId) {
    return jpaProductRepository.findByCategoryPublicIdAndNameContainingIgnoreCase(categoryId.value(), name, pageable)
            .map(ProductEntity::to);
  }

  @Override
  public Page<Product> findByNameAndSizes(Pageable pageable, String name, List<ProductSize> sizes) {
    return jpaProductRepository.findByNameContainingIgnoreCaseAndSizeIn(name, sizes, pageable)
            .map(ProductEntity::to);
  }

  @Override
  public Page<Product> findByNameCategoryAndSizes(Pageable pageable, String name, PublicId categoryId, List<ProductSize> sizes) {
    return jpaProductRepository.findByCategoryPublicIdAndNameContainingIgnoreCaseAndSizeIn(categoryId.value(), name, sizes, pageable)
            .map(ProductEntity::to);
  }
}
