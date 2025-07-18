package com.tiago.evolution_app.controller;


import com.tiago.evolution_app.model.Users;
import com.tiago.evolution_app.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
@Slf4j
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping("/create")
    public ResponseEntity<Users> createUser(@RequestBody Users user){
        log.info("POST /api/user/create called");
        return ResponseEntity.ok(userService.createUser(user));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Users>> listUsers(){
        log.info("GET /api/user/list called");
        return ResponseEntity.ok(userService.listAllUsers());
    }







}
