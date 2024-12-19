package com.example.onlineshopbackend.order.domain.user.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record UserLastname(String value) {

  public UserLastname {
    Assert.field("value", value).maxLength(255);
  }
}
