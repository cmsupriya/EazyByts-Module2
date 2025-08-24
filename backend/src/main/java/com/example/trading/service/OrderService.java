package com.example.trading.service;

import com.example.trading.entity.OrderEntity;
import com.example.trading.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository repo;

    public OrderEntity place(OrderEntity order) {
        return repo.save(order); // auto NEW order
    }

    public Page<OrderEntity> list(Long userId, Pageable pageable) {
        return repo.findAll(pageable)
                   .map(o -> o); // later filter by userId
    }
}
