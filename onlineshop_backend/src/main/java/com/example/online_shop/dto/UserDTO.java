package com.example.online_shop.dto;

import com.example.online_shop.enums.UserRole;
import lombok.Data;

@Data
public class UserDTO {

    private long id;

    private String name;

    private String email;

    private String password;

    private UserRole userRole;
}
