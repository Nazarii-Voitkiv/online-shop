package com.example.onlineshop_backend.repository;

import com.example.onlineshop_backend.entities.User;
import com.example.onlineshop_backend.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByEmail(String email);

    User findByUserRole(UserRole userRole);
}
