package com.example.onlineshopbackend.order.domain.order.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record StripeSessionId(String value) {

  public StripeSessionId {
    Assert.notNull("value", value);
  }
}
