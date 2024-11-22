package com.example.online_shop.service.user;

import com.example.online_shop.dto.SignupDTO;
import com.example.online_shop.dto.UserDTO;

public interface UserService {
    UserDTO createUser(SignupDTO signupDTO);

    boolean hasUserWithEmail(String email);
}
