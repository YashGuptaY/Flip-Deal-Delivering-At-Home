package com.prb.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.prb.demo.io.UserRequest;
import com.prb.demo.io.UserResponse;
import com.prb.demo.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request) {
        return userService.registerUser(request);
    }
    
    @GetMapping("/user")
    public List<UserResponse> getAllUsers() {
        return userService.findAllUser();
    }
    
    @GetMapping("/user/{id}")
    public UserResponse getUserById(@PathVariable String id) {
    	return userService.findUserForAdmin(id);
    }
    
    @DeleteMapping("/user/{id}")
    public boolean deleteUserById(@PathVariable String id) {
    	return userService.deleteUserById(id);
    }
    
}
