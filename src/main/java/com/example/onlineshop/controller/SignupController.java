package com.example.onlineshop.controller;

import com.example.onlineshop.dto.SignupDTO;
import com.example.onlineshop.dto.UserDTO;
import com.example.onlineshop.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignupController {

    @Autowired
    private UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody SignupDTO signupDTO) {
        UserDTO createdUser = userService.createUser(signupDTO);
        if (createdUser == null) {
            return new ResponseEntity<>("User not created. Come againlater", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("User created", HttpStatus.CREATED);
    }
}
