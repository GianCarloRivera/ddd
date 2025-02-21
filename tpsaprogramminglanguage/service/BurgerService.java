package com.example.burger.service;

import com.example.burger.dto.BurgerDTO;
import com.example.burger.exception.BurgerException;
import com.example.burger.model.Burger;
import com.example.burger.repository.BurgerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BurgerService {

    @Autowired
    private BurgerRepository burgerRepository;

    public List<BurgerDTO> getAllBurgers() {
        return burgerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BurgerDTO getBurgerById(Long id) {
        Burger burger = burgerRepository.findById(id)
                .orElseThrow(() -> new BurgerException("Burger not found", HttpStatus.NOT_FOUND));
        return convertToDTO(burger);
    }

    private BurgerDTO convertToDTO(Burger burger) {
        BurgerDTO dto = new BurgerDTO();
        BeanUtils.copyProperties(burger, dto);
        return dto;
    }

    private Burger convertToEntity(BurgerDTO dto) {
        Burger burger = new Burger();
        BeanUtils.copyProperties(dto, burger);
        return burger;
    }
} 