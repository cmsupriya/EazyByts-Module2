package com.example.trading.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity @Table(name="executions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Execution {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;
  private Long orderId;
  private String symbol;
  private BigDecimal qty;
  private BigDecimal price;
  private Instant ts;
}
