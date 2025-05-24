package com.prb.demo.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class AuthenticationResponse {
    private String token;//refreshtoken
    private String accessToken;
}
