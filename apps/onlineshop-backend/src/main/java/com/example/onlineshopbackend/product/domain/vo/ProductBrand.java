package com.example.onlineshopbackend.product.domain.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record ProductBrand(String value) {

  public ProductBrand {
    Assert.field("value", value).notNull().minLength(3);
  }
}
