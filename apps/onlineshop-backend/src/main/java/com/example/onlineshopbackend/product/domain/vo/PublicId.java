package com.example.onlineshopbackend.product.domain.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

import java.util.UUID;

public record PublicId(UUID value) {

  public PublicId {
    Assert.notNull("value", value);
  }
}
