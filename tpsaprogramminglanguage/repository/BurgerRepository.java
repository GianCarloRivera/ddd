package com.example.burger.repository;

import com.example.burger.model.Burger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BurgerRepository extends JpaRepository<Burger, Long> {
} 