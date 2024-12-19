package com.example.onlineshopbackend.order.domain.order.aggregate;

import com.example.onlineshopbackend.order.domain.order.vo.OrderQuantity;
import com.example.onlineshopbackend.order.domain.order.vo.ProductPublicId;
import org.jilt.Builder;

@Builder
public record OrderProductQuantity(OrderQuantity quantity, ProductPublicId productPublicId) {
}
