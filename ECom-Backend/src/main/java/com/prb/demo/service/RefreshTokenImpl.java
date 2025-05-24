package com.prb.demo.service;

import com.prb.demo.entity.RefreshToken;
import com.prb.demo.entity.UserEntity;
import com.prb.demo.repository.RefreshTokenRespository;
import com.prb.demo.repository.UserRepository;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RefreshTokenImpl {

    private final UserRepository userRepository;
    private final RefreshTokenRespository refreshTokenRepository;

    public RefreshToken createRefreshToken(String email) {
        UserEntity user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        RefreshToken refreshToken = RefreshToken.builder()
            .userEntity(user)
            .token(UUID.randomUUID().toString())
            .expiryDate(Instant.now().plusMillis(604800000))
            .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token expired. Please login again.");
        }
        return token;
    }
    
    
    

}
