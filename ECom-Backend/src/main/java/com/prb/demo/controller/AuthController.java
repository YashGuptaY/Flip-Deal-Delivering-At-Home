package com.prb.demo.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import com.prb.demo.entity.RefreshToken;
import com.prb.demo.io.AuthenticationRequest;
import com.prb.demo.io.AuthenticationResponse;
import com.prb.demo.io.RefreshTokenRequest;
import com.prb.demo.service.RefreshTokenImpl;
import com.prb.demo.util.JwtUtil;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RefreshTokenImpl refreshTokenImpl;

    
    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request) {
    	Authentication authentication =  authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        if (authentication.isAuthenticated()) {
        	RefreshToken refreshToken = refreshTokenImpl.createRefreshToken(request.getEmail());
            return AuthenticationResponse.builder()
                    .accessToken(jwtUtil.generateToken(request.getEmail()))
                    .token(refreshToken.getToken())
                    .build();
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }

    @PostMapping("/refreshToken")
    public AuthenticationResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return refreshTokenImpl.findByToken(refreshTokenRequest.getToken())
                .map(refreshTokenImpl::verifyExpiration)
                .map(RefreshToken::getUserEntity)
                .map(userEntity -> {
                    String accessToken = jwtUtil.generateToken(userEntity.getName());
                    return AuthenticationResponse.builder()
                            .accessToken(accessToken)
                            .token(refreshTokenRequest.getToken())
                            .build();
                }).orElseThrow(() -> new RuntimeException(
                        "Refresh token is not in database!"));
    }
 
}
