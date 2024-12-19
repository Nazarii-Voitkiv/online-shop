package com.example.onlineshopbackend.order.domain.order.aggregate;

import com.example.onlineshopbackend.product.domain.vo.PublicId;
import org.jilt.Builder;

@Builder
public record DetailCartItemRequest(PublicId productId, long quantity) {
}
