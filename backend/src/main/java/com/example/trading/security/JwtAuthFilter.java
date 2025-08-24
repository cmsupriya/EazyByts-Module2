package com.example.trading.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
  private final JwtUtil jwtUtil;
  public JwtAuthFilter(JwtUtil jwtUtil){ this.jwtUtil = jwtUtil; }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    String auth = request.getHeader(HttpHeaders.AUTHORIZATION);
    if(auth != null && auth.startsWith("Bearer ")){
      String token = auth.substring(7);
      try {
        var claimsJws = jwtUtil.parser().parseClaimsJws(token);
        var claims = claimsJws.getBody();
        var userId = Long.valueOf(claims.getSubject());
        String role = (String) claims.get("role");
        var authObj = new UsernamePasswordAuthenticationToken(userId, null,
            List.of(new SimpleGrantedAuthority("ROLE_"+role)));
        SecurityContextHolder.getContext().setAuthentication(authObj);
      } catch (Exception ignored) {}
    }
    chain.doFilter(request, response);
  }
}
