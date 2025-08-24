package com.example.trading.controller;

import com.example.trading.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final AuthService auth;

    // DTO for request
    public record AuthRequest(String email, String password) {}

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody AuthRequest request) {
        auth.register(request.email(), request.password());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(auth.login(request.email(), request.password()));
    }
}
