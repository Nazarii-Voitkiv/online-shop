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

  // Вкладений клас CustomerDetails
  public static class CustomerDetails {
    @SerializedName("address")
    private Address address;

    public Address getAddress() {
      return address;
    }

    public void setAddress(Address address) {
      this.address = address;
    }
  }

  // Вкладений клас Address
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

    public void setLine1(String line1) {
      this.line1 = line1;
    }

    public String getCity() {
      return city;
    }

    public void setCity(String city) {
      this.city = city;
    }

    public String getCountry() {
      return country;
    }

    public void setCountry(String country) {
      this.country = country;
    }

    public String getPostalCode() {
      return postalCode;
    }

    public void setPostalCode(String postalCode) {
      this.postalCode = postalCode;
    }
  }

  // Гетери та сетери для основних полів
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getPaymentIntent() {
    return paymentIntent;
  }

  public void setPaymentIntent(String paymentIntent) {
    this.paymentIntent = paymentIntent;
  }

  public CustomerDetails getCustomerDetails() {
    return customerDetails;
  }

  public void setCustomerDetails(CustomerDetails customerDetails) {
    this.customerDetails = customerDetails;
  }

  public Map<String, String> getMetadata() {
    return metadata;
  }

  public void setMetadata(Map<String, String> metadata) {
    this.metadata = metadata;
  }
}
