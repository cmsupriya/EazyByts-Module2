package com.example.trading.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity @Table(name="instruments")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Instrument {
  @Id
  private String symbol;
  @Column(nullable=false) private String name;
  @Column(nullable=false) private String exchange;
  @Column(nullable=false, precision=10, scale=6) private BigDecimal tickSize;
  @Column(nullable=false) private Integer lotSize;
}
