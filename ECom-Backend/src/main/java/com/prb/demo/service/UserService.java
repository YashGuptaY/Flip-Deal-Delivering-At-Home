package com.prb.demo.service;

import java.util.List;

import com.prb.demo.io.UserRequest;
import com.prb.demo.io.UserResponse;
import com.prb.demo.io.UserUpdateRequest;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();

	List<UserResponse> findAllUser();

	UserResponse findUserForAdmin(String id);

	boolean deleteUserById(String id);
}
