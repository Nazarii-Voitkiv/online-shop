package com.example.onlineshop_backend.service.user;

import com.example.onlineshop_backend.dto.SignupDTO;
import com.example.onlineshop_backend.dto.UserDTO;

public interface UserService {
    UserDTO createUser(SignupDTO signupDTO);

    boolean hasUserWithEmail(String email);
}
