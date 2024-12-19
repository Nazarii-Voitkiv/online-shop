package com.example.onlineshopbackend.order.domain.user.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record UserEmail(String value) {

  public UserEmail {
    Assert.field("value", value).maxLength(255);
  }
}
