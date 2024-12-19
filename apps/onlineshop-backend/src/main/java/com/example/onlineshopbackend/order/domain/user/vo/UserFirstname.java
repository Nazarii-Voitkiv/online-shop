package com.example.onlineshopbackend.order.domain.user.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record UserFirstname(String value) {

  public UserFirstname {
    Assert.field("value", value).maxLength(255);
  }
}
