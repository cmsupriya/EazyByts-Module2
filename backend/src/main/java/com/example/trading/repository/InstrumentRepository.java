package com.example.trading.repository;
import com.example.trading.entity.Instrument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentRepository extends JpaRepository<Instrument, String> 
{}
