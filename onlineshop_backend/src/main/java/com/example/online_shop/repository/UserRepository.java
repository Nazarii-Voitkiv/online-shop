package com.example.online_shop.repository;

import com.example.online_shop.entities.User;
import com.example.online_shop.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByEmail(String email);

    User findByUserRole(UserRole userRole);
}
