package com.example.trading;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TradingSimApplication {
  public static void main(String[] args) {
    SpringApplication.run(TradingSimApplication.class, args);
  }
}
