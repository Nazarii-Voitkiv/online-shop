package com.example.onlineshopbackend.product.domain.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record CategoryName(String value) {
  public CategoryName {
    Assert.field("value", value).notNull().minLength(3);
  }
}
