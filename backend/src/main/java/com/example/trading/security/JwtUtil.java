package com.example.trading.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.JwtParser;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    private final SecretKey key;
    private final String issuer;
    private final long ttlMinutes;

    public JwtUtil(@Value("${jwt.secret}") String secret,
                   @Value("${jwt.issuer}") String issuer,
                   @Value("${jwt.access-token-ttl-minutes}") long ttlMinutes) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.issuer = issuer;
        this.ttlMinutes = ttlMinutes;
    }

    public String generateToken(Long userId, String email, String role) {
        Instant now = Instant.now();
        return Jwts.builder()
            .setSubject(String.valueOf(userId))
            .setIssuer(issuer)
            .claim("email", email)
            .claim("role", role)
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(now.plusSeconds(ttlMinutes * 60)))
            .signWith(key)
            .compact();
    }

    public JwtParser parser() {
        return Jwts.parserBuilder().setSigningKey(key).build();
    }
}
