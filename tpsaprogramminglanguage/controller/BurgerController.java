package com.example.burger.controller;

import com.example.burger.dto.BurgerDTO;
import com.example.burger.service.BurgerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/burgers")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
public class BurgerController {

    @Autowired
    private BurgerService burgerService;

    @GetMapping
    public ResponseEntity<List<BurgerDTO>> getAllBurgers() {
        return ResponseEntity.ok(burgerService.getAllBurgers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BurgerDTO> getBurger(@PathVariable Long id) {
        return ResponseEntity.ok(burgerService.getBurgerById(id));
    }
} 