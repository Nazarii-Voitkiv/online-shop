package com.example.onlineshopbackend.order.infrastructure.primary.order;

import com.example.onlineshopbackend.order.domain.order.aggregate.DetailCartResponse;
import org.jilt.Builder;

import java.util.List;

@Builder
public record RestDetailCartResponse(List<RestProductCart> products) {

  public static RestDetailCartResponse from(DetailCartResponse detailCartResponse) {
    return RestDetailCartResponseBuilder.restDetailCartResponse()
      .products(detailCartResponse.getProducts().stream().map(RestProductCart::from).toList())
      .build();
  }
}
