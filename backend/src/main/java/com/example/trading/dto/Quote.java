package com.example.trading.dto;
import java.math.BigDecimal;
import java.time.Instant;

public record Quote(String symbol, BigDecimal bid, BigDecimal ask, BigDecimal last, Instant ts) {}
