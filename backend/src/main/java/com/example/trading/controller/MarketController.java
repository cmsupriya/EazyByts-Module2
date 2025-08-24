package com.example.trading.controller;

import com.example.trading.dto.Quote;
import com.example.trading.service.MarketDataService;
import com.example.trading.repository.InstrumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/market")
@RequiredArgsConstructor
public class MarketController {
  private final InstrumentRepository repo;
  private final MarketDataService market;

  @GetMapping("/instruments")
  public List<?> instruments(){ return repo.findAll(); }

  @GetMapping("/quote/{symbol}")
  public Quote quote(@PathVariable String symbol){ return market.getQuote(symbol); }
}
