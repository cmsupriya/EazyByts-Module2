package com.example.trading.repository;
import com.example.trading.entity.Execution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExecutionRepository extends JpaRepository<Execution, Long> {}
