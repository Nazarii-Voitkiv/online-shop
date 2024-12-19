package com.example.onlineshopbackend.order.domain.order;

public class CartPaymentException extends RuntimeException {
  public CartPaymentException(String message) {
    super(message);
  }
}
