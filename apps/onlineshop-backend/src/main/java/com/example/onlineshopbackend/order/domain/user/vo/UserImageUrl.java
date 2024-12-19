package com.example.onlineshopbackend.order.domain.user.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record UserImageUrl(String value) {

  public UserImageUrl {
    Assert.field("value", value).maxLength(1000);
  }
}
