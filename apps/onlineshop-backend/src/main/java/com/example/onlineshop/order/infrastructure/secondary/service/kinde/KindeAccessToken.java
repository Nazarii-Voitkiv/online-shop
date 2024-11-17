package com.example.onlineshop.order.infrastructure.secondary.service.kinde;

import com.fasterxml.jackson.annotation.JsonProperty;

public record KindeAccessToken(@JsonProperty("access_token") String accessToken,
                               @JsonProperty("token_type") String tokenType) {
}
