package com.example.burger.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderDTO {
    private List<BurgerDTO> items;
    private double total;
} 