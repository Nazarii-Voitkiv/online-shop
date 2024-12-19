package com.example.onlineshopbackend.order.domain.user.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

import java.util.UUID;

public record UserPublicId(UUID value) {

  public UserPublicId {
    Assert.notNull("value", value);
  }
}
