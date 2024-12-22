package com.example.onlineshopbackend.order.infrastructure.secondary.service.stripe;

import com.google.gson.annotations.SerializedName;

import java.util.Map;

public class CustomSession {

  @SerializedName("id")
  private String id;

  @SerializedName("payment_intent")
  private String paymentIntent;

  @SerializedName("customer_details")
  private CustomerDetails customerDetails;

  @SerializedName("metadata")
  private Map<String, String> metadata;

  public static class CustomerDetails {
    @SerializedName("address")
    private Address address;

    public Address getAddress() {
      return address;
    }

  }

  public static class Address {
    @SerializedName("line1")
    private String line1;

    @SerializedName("city")
    private String city;

    @SerializedName("country")
    private String country;

    @SerializedName("postal_code")
    private String postalCode;

    public String getLine1() {
      return line1;
    }

    public String getCity() {
      return city;
    }

    public String getCountry() {
      return country;
    }

    public String getPostalCode() {
      return postalCode;
    }

  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getPaymentIntent() {
    return paymentIntent;
  }

  public CustomerDetails getCustomerDetails() {
    return customerDetails;
  }

  public Map<String, String> getMetadata() {
    return metadata;
  }
}
