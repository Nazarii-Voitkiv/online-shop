package com.example.onlineshopbackend.order.domain.user.service;

import com.example.onlineshopbackend.order.domain.user.aggregate.User;
import com.example.onlineshopbackend.order.domain.user.repository.UserRepository;
import com.example.onlineshopbackend.order.domain.user.vo.UserEmail;

import java.util.Optional;

public class UserReader {

  private final UserRepository userRepository;

  public UserReader(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public Optional<User> getByEmail(UserEmail userEmail) {
    return userRepository.getOneByEmail(userEmail);
  }
}
