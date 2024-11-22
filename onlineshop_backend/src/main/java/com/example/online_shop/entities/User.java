package com.example.online_shop.entities;

import com.example.online_shop.dto.UserDTO;
import com.example.online_shop.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String email;

    private String password;

    private UserRole userRole;

    private byte[] img;
}