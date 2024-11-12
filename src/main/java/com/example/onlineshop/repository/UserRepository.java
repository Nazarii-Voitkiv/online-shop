package com.example.onlineshop.repository;

import com.example.onlineshop.entities.User;
import com.example.onlineshop.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findFirstByEmail(String email);

    User findByUserRole(UserRole userRole);
}
