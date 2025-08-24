package com.example.trading.controller;

import com.example.trading.dto.OrderRequest;
import com.example.trading.entity.OrderEntity;
import com.example.trading.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderEntity> placeOrder(@RequestBody OrderRequest req) {
        return ResponseEntity.ok(orderService.place(req.toEntity()));
    }

    @GetMapping
    public Page<OrderEntity> listOrders(@RequestParam Long userId, Pageable pageable) {
        return orderService.list(userId, pageable);
    }
}
