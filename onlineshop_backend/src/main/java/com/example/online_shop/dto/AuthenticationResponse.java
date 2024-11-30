package com.example.online_shop.dto;

import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwtToken;

    public AuthenticationResponse(String jwt) {
        this.jwtToken = jwt;
    }
}
