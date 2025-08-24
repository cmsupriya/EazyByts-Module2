package com.example.trading.service;

import com.example.trading.entity.Instrument;
import com.example.trading.entity.User;
import com.example.trading.repository.UserRepository;
import com.example.trading.repository.InstrumentRepository;
import com.example.trading.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository users;
  private final PasswordEncoder encoder;
  private final JwtUtil jwt;
  private final InstrumentRepository instruments;

  public void register(String email, String password){
    if(users.findByEmail(email).isPresent()) throw new RuntimeException("email already exists");
    var u = users.save(User.builder().email(email).passwordHash(encoder.encode(password)).role("USER").build());
    // seed default instruments if empty
    if(instruments.count() == 0){
      instruments.save(Instrument.builder().symbol("INFY").name("Infosys").exchange("NSE").tickSize(new java.math.BigDecimal("0.05")).lotSize(1).build());
      instruments.save(Instrument.builder().symbol("TCS").name("TCS").exchange("NSE").tickSize(new java.math.BigDecimal("0.05")).lotSize(1).build());
    }
  }

  public String login(String email, String password){
    var u = users.findByEmail(email).orElseThrow(() -> new RuntimeException("invalid credentials"));
    if(!encoder.matches(password, u.getPasswordHash())) throw new RuntimeException("invalid credentials");
    return jwt.generateToken(u.getId(), u.getEmail(), u.getRole());
  }
}
