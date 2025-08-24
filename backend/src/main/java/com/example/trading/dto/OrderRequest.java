package com.example.trading.dto;

import com.example.trading.entity.OrderEntity;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderRequest {
    private Long userId;
    private String symbol;
    private String side;   // BUY/SELL
    private BigDecimal qty;
    private String type;   // MARKET/LIMIT
    private BigDecimal limitPrice;

    // ✅ Mapping method
    public OrderEntity toEntity() {
        return OrderEntity.builder()
                .userId(userId)
                .symbol(symbol)
                .side(side)
                .qty(qty)
                .type(type)
                .limitPrice(limitPrice)
                .build();
    }
}
