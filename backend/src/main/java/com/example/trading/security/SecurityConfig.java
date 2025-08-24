package com.example.trading.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
  private final JwtAuthFilter jwtFilter;

  public SecurityConfig(JwtAuthFilter jwtFilter) {
    this.jwtFilter = jwtFilter;
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {
        }) // ✅ enable cors
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**", "/ws/**", "/index.html", "/", "/error", "/api/orders").permitAll()
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // allow preflight
            .requestMatchers(
                "/swagger-ui/**",
                "/v3/api-docs/**",
                "/v3/api-docs.yaml",
                "/swagger-resources/**",
                "/webjars/**")
            .permitAll()
            .requestMatchers("/api/orders/**").authenticated() // only logged-in users
            .requestMatchers("/api/orders").authenticated()
            .anyRequest().authenticated())

        .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
    return cfg.getAuthenticationManager();
  }

  // ✅ Define allowed origins (frontend)
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:5173")); // frontend
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("*"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
