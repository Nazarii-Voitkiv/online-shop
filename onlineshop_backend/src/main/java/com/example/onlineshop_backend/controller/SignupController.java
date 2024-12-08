package com.example.onlineshop_backend.controller;

import com.example.onlineshop_backend.dto.SignupDTO;
import com.example.onlineshop_backend.dto.UserDTO;
import com.example.onlineshop_backend.entities.User;
import com.example.onlineshop_backend.repository.UserRepository;
import com.example.onlineshop_backend.service.user.UserService;
import com.example.onlineshop_backend.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class SignupController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody SignupDTO signupDTO, HttpServletResponse response) throws IOException, JSONException {

        if (userService.hasUserWithEmail(signupDTO.getEmail())) {
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDTO createdUser = userService.createUser(signupDTO);
        if (createdUser == null) {
            return new ResponseEntity<>("User not created. Come again later", HttpStatus.BAD_REQUEST);
        }

        // Генерація JWT токена
        final String username = createdUser.getEmail();
        final String jwt = jwtUtil.generateToken(username);
        User user = userRepository.findFirstByEmail(username);

        // Повернення даних про користувача
        JSONObject responseBody = new JSONObject();
        responseBody.put("userId", user.getId());
        responseBody.put("userRole", user.getUserRole());
        responseBody.put("token", jwt);

        response.addHeader("Access-Control-Expose-Headers", "Authorization");
        response.addHeader("Access-Control-Allow-Headers", "Authorization,X-PINGGOTHER,Origin,X-Requested-With,Content-Type,Accept,X-Custom-Header");
        response.addHeader(AuthenticationController.HEADER_STRING, AuthenticationController.TOKEN_PREFIX + jwt);

        return new ResponseEntity<>(responseBody.toString(), HttpStatus.CREATED);
    }
}
