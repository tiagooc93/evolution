package com.tiago.evolution_app.service;

import com.tiago.evolution_app.model.Users;
import com.tiago.evolution_app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Users createUser(Users user){
        log.info("Saving user: {}", user.getName());

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use !");
        }

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already in use !");
        }

        return userRepository.save(user);
    }

    public List<Users> listAllUsers(){
        log.info("Listing all users");
        return userRepository.findAll();
    }

    public void deleteUser(Long userId){
        log.info("Deleting user of ID: {}", userId);
        userRepository.deleteById(userId);
    }
}


