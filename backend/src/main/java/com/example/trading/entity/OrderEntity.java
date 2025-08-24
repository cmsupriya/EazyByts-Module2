package com.example.trading.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity @Table(name="orders")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderEntity {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;
  @Column(nullable=false) private Long userId;
  @Column(nullable=false) private String symbol;
  @Column(nullable=false) private String side; // BUY/SELL
  @Column(nullable=false, precision=18, scale=4) private BigDecimal qty;
  @Column(nullable=false) private String type; // MARKET/LIMIT
  private BigDecimal limitPrice;
  @Column(nullable=false) private String status; // NEW/FILLED/REJECTED
  @Column(nullable=false, precision=18, scale=4) private BigDecimal filledQty;
  private BigDecimal avgPrice;
  private Instant createdAt;

  @PrePersist
public void prePersist() {
    this.createdAt = Instant.now();
    this.status = (this.status == null) ? "NEW" : this.status; // default status
    this.filledQty = (this.filledQty == null) ? BigDecimal.ZERO : this.filledQty;
}

}
