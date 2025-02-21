package com.example.burger.service;

import com.example.burger.dto.OrderDTO;
import com.example.burger.exception.BurgerException;
import com.example.burger.model.Order;
import com.example.burger.repository.OrderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public OrderDTO createOrder(OrderDTO orderDTO) {
        if (orderDTO.getItems() == null || orderDTO.getItems().isEmpty()) {
            throw new BurgerException("Order must contain at least one item", HttpStatus.BAD_REQUEST);
        }

        Order order = convertToEntity(orderDTO);
        order.setStatus("pending");
        order.setCreatedAt(LocalDateTime.now());
        
        Order savedOrder = orderRepository.save(order);
        return convertToDTO(savedOrder);
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        BeanUtils.copyProperties(order, dto);
        return dto;
    }

    private Order convertToEntity(OrderDTO dto) {
        Order order = new Order();
        BeanUtils.copyProperties(dto, order);
        return order;
    }
} 