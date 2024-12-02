package com.example.onlineshop_backend.dto;

import com.example.onlineshop_backend.enums.UserRole;
import lombok.Data;

@Data
public class UserDTO {

    private long id;

    private String name;

    private String email;

    private String password;

    private UserRole userRole;
}
