package com.example.burger.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BurgerException extends RuntimeException {
    private final HttpStatus status;

    public BurgerException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
} 