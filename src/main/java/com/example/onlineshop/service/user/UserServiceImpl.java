package com.example.onlineshop.service.user;

import com.example.onlineshop.dto.SignupDTO;
import com.example.onlineshop.dto.UserDTO;
import com.example.onlineshop.entities.User;
import com.example.onlineshop.enums.UserRole;
import com.example.onlineshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO createUser(SignupDTO signupDTO) {
        User user = new User();
        user.setName(signupDTO.getName());
        user.setEmail(signupDTO.getEmail());
        user.setUserRole(UserRole.USER);
        user.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));
        User createdUser =  userRepository.save(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setId(createdUser.getId());
        userDTO.setName(createdUser.getName());
        userDTO.setEmail(createdUser.getEmail());
        userDTO.setUserRole(createdUser.getUserRole());
        return userDTO;
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email) != null;
    }
}
