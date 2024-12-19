package com.example.onlineshopbackend.order.domain.user.vo;

import com.example.onlineshopbackend.shared.error.domain.Assert;

public record AuthorityName(String name) {

  public AuthorityName {
    Assert.field("name", name).notNull();
  }
}
