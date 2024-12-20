package com.example.onlineshopbackend.shared.error.domain;

public abstract class AssertionException extends RuntimeException {

  private final String field;

  protected AssertionException(String field, String message) {
    super(message);
    this.field = field;
  }

  public abstract AssertionErrorType type();

  public String field() {
    return field;
  }
}
