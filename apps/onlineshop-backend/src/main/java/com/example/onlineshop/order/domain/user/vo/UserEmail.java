package com.example.onlineshop.order.domain.user.vo;

import com.example.onlineshop.shared.error.domain.Assert;

public record UserEmail(String value) {

    public UserEmail {
        Assert.field("value", value).maxLength(255);
    }
}
