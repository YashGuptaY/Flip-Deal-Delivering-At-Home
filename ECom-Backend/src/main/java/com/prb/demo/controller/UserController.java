package com.prb.demo.controller;

import com.prb.demo.io.UserRequest;
import com.prb.demo.io.UserResponse;
import com.prb.demo.io.UserUpdateRequest;
import com.prb.demo.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    
//    @PatchMapping("/{id}")
//    public UserResponse updateUser(
//            @PathVariable String id,
//            @RequestBody UserUpdateRequest request
//    ) {
//        return userService.updateUserForAdmin(id, request);
//    }
    
}
