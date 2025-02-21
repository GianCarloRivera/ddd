package com.burgerapp.controller;

import com.burgerapp.model.Order;
import com.burgerapp.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order, Authentication auth) {
        return ResponseEntity.ok(orderService.createOrder(order, auth.getName()));
    }

    @GetMapping("/myorders")
    public ResponseEntity<?> getMyOrders(Authentication auth) {
        return ResponseEntity.ok(orderService.getOrdersByUser(auth.getName()));
    }
} 