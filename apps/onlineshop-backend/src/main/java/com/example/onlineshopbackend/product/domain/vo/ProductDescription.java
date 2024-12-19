package com.example.onlineshopbackend.product.domain.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record ProductDescription(String value) {

  public ProductDescription {
    Assert.field("value", value).notNull().minLength(10);
  }
}
