package com.example.onlineshop.order.domain.user.vo;

import com.example.onlineshop.shared.error.domain.Assert;
import org.jilt.Builder;


public record UserAddress(String street, String city, String zipCode, String country) {
    @Builder
    public UserAddress {
        Assert.field("street", street).notNull();
        Assert.field("city", city).notNull();
        Assert.field("zipCode", zipCode).notNull();
        Assert.field("country", country).notNull();
    }
}
