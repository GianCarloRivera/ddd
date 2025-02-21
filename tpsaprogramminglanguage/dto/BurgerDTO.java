package com.example.burger.dto;

import lombok.Data;

@Data
public class BurgerDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private String image;
} 