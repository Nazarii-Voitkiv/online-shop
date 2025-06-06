package com.example.onlineshopbackend.product.infrastructure.primary;

import com.example.onlineshopbackend.product.application.ProductsApplicationService;
import com.example.onlineshopbackend.product.domain.aggregate.FilterQueryBuilder;
import com.example.onlineshopbackend.product.domain.aggregate.Product;
import com.example.onlineshopbackend.product.domain.vo.ProductSize;
import com.example.onlineshopbackend.product.domain.vo.PublicId;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/products-shop")
public class ProductsShopResource {

  private final ProductsApplicationService productsApplicationService;

  public ProductsShopResource(ProductsApplicationService productsApplicationService) {
    this.productsApplicationService = productsApplicationService;
  }

  @GetMapping("/featured")
  public ResponseEntity<Page<RestProduct>> getAllFeatured(Pageable pageable) {
    Page<Product> products = productsApplicationService.getFeaturedProducts(pageable);

    PageImpl<RestProduct> restProducts = new PageImpl<>(
      products.getContent().stream().map(RestProduct::fromDomain).toList(),
      pageable,
      products.getTotalElements()
    );
    return ResponseEntity.ok(restProducts);
  }

  @GetMapping("/find-one")
  public ResponseEntity<RestProduct> getOne(@RequestParam("publicId") UUID id) {
    Optional<Product> productOpt = productsApplicationService.findOne(new PublicId(id));

    return productOpt.map(product -> ResponseEntity.ok(RestProduct.fromDomain(product)))
      .orElseGet(() -> ResponseEntity.badRequest().build());
  }

  @GetMapping("/related")
  public ResponseEntity<Page<RestProduct>> findRelated(Pageable pageable,
                                                       @RequestParam("publicId") UUID id) {
    try {
      Page<Product> products = productsApplicationService.findRelated(pageable, new PublicId(id));
      PageImpl<RestProduct> restProducts = new PageImpl<>(
        products.getContent().stream().map(RestProduct::fromDomain).toList(),
        pageable,
        products.getTotalElements()
      );
      return ResponseEntity.ok(restProducts);
    } catch (EntityNotFoundException enfe) {
      return ResponseEntity.badRequest().build();
    }
  }

  @GetMapping("/filter")
  public ResponseEntity<Page<RestProduct>> filter(Pageable pageable,
                                                  @RequestParam(value = "categoryId", required = false) UUID categoryId,
                                                  @RequestParam(value = "productSizes", required = false) List<ProductSize> productSizes,
                                                  @RequestParam(value = "name", required = false) String name) {
    FilterQueryBuilder filterQueryBuilder = FilterQueryBuilder.filterQuery();

    if (categoryId != null) {
      filterQueryBuilder.categoryId(new PublicId(categoryId));
    }

    if (productSizes != null && !productSizes.isEmpty()) {
      filterQueryBuilder.sizes(productSizes);
    }

    if (name != null && !name.isBlank()) {
      filterQueryBuilder.name(name);
    }

    Page<Product> products = productsApplicationService.filter(pageable, filterQueryBuilder.build());
    PageImpl<RestProduct> restProducts = new PageImpl<>(
            products.getContent().stream().map(RestProduct::fromDomain).toList(),
            pageable,
            products.getTotalElements()
    );
    return ResponseEntity.ok(restProducts);
  }
}
