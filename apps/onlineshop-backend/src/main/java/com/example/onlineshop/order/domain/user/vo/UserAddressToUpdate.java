package com.example.onlineshop.order.domain.user.vo;

import com.example.onlineshop.shared.error.domain.Assert;
import org.jilt.Builder;

@Builder
public record UserAddressToUpdate(UserPublicId userPublicId, UserAddress userAddress) {

    public UserAddressToUpdate {
        Assert.notNull("value", userPublicId);
        Assert.notNull("value", userAddress);
    }
}
