package com.example.trading.service;

import com.example.trading.dto.Quote;
import com.example.trading.repository.InstrumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.random.RandomGenerator;

@Service
@RequiredArgsConstructor
public class MarketDataService {
  private final InstrumentRepository instruments;
  private final SimpMessagingTemplate broker;
  private final Map<String, Quote> last = new ConcurrentHashMap<>();
  private final RandomGenerator rng = RandomGenerator.getDefault(); // ✅ safe choice

  @Scheduled(fixedRate = 1000)
  public void tick(){
    instruments.findAll().forEach(inst -> {
      var prev = last.getOrDefault(inst.getSymbol(),
          new Quote(inst.getSymbol(), bd(100), bd(100.1), bd(100), Instant.now()));

      double jitter = (rng.nextDouble() - 0.5) * 0.5;
      BigDecimal lastPx = prev.last().add(BigDecimal.valueOf(jitter))
          .setScale(2, java.math.RoundingMode.HALF_UP);

      BigDecimal bid = lastPx.subtract(BigDecimal.valueOf(0.05));
      BigDecimal ask = lastPx.add(BigDecimal.valueOf(0.05));

      var q = new Quote(inst.getSymbol(), bid, ask, lastPx, Instant.now());
      last.put(inst.getSymbol(), q);
      broker.convertAndSend("/topic/quotes/" + inst.getSymbol(), q);
    });
  }

  public Quote getQuote(String symbol){ return last.get(symbol); }
  private static BigDecimal bd(double d){ return BigDecimal.valueOf(d); }
}

