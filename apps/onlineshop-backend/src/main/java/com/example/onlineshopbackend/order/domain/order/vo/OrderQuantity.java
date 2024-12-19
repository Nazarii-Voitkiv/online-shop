package com.example.onlineshopbackend.order.domain.order.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record OrderQuantity(long value) {

  public OrderQuantity {
    Assert.field("value", value).positive();

  }
}
