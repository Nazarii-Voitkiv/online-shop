package com.example.onlineshop.order.domain.user.vo;

import com.example.onlineshop.shared.error.domain.Assert;

import java.util.UUID;

public record UserPublicId(UUID value) {

    public UserPublicId {
        Assert.notNull("value", value);
    }
}
