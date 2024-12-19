package com.example.onlineshopbackend.order.domain.order.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

import java.util.UUID;

public record ProductPublicId(UUID value) {

  public ProductPublicId {
    Assert.notNull("value", value);
  }
}
