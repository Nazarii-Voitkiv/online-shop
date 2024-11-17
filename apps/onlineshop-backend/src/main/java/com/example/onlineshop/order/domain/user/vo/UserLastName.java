package com.example.onlineshop.order.domain.user.vo;

import com.example.onlineshop.shared.error.domain.Assert;

public record UserLastName(String value) {

    public UserLastName {
        Assert.field("value", value).maxLength(255);
    }
}
