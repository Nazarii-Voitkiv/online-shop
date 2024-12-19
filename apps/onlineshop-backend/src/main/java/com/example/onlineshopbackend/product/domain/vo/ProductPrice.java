package com.example.onlineshopbackend.product.domain.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record ProductPrice(double value) {

  public ProductPrice {
    Assert.field("value", value).min(0.1);
  }
}
