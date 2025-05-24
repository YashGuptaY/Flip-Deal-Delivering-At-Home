package com.prb.demo.repository;

import com.prb.demo.entity.RefreshToken;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRespository extends MongoRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);
}

