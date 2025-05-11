package com.prb.demo.service;

import com.prb.demo.io.UserRequest;
import com.prb.demo.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}
