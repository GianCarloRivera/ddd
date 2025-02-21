package com.burgerapp.repository;

import com.burgerapp.model.Order;
import com.burgerapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
} 