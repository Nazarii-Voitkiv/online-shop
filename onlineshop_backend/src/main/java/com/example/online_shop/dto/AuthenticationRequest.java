package com.example.online_shop.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {

    private String username;

    private String password;
}
