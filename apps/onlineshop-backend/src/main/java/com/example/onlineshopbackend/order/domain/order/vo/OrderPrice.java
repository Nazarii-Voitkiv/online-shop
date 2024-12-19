package com.example.onlineshopbackend.order.domain.order.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record OrderPrice(double value) {

  public OrderPrice {
    Assert.field("value", value).strictlyPositive();
  }
}
