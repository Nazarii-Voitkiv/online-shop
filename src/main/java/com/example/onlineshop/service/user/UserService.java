package com.example.onlineshop.service.user;

import com.example.onlineshop.dto.SignupDTO;
import com.example.onlineshop.dto.UserDTO;

public interface UserService {
    UserDTO createUser(SignupDTO signupDTO);

    boolean hasUserWithEmail(String email);
}
