package com.example.onlineshop.order.domain.user.vo;

import com.example.onlineshop.shared.error.domain.Assert;

public record UserFirstName(String value) {

    public UserFirstName {
        Assert.field("value", value).maxLength(255);
    }
}
