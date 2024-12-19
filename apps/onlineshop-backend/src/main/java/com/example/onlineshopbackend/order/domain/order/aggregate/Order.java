package com.example.onlineshopbackend.order.domain.order.aggregate;

import com.example.onlineshopbackend.order.domain.order.vo.OrderStatus;
import com.example.onlineshopbackend.order.domain.order.vo.StripeSessionId;
import com.example.onlineshopbackend.order.domain.user.aggregate.User;
import com.example.onlineshopbackend.product.domain.vo.PublicId;
import org.jilt.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public class Order {

  private OrderStatus status;

  private User user;

  private String stripeId;

  private PublicId publicId;

  private List<OrderedProduct> orderedProducts;

  public Order(OrderStatus status, User user, String stripeId, PublicId publicId, List<OrderedProduct> orderedProducts) {
    this.status = status;
    this.user = user;
    this.stripeId = stripeId;
    this.publicId = publicId;
    this.orderedProducts = orderedProducts;
  }

  public OrderStatus getStatus() {
    return status;
  }

  public User getUser() {
    return user;
  }

  public String getStripeId() {
    return stripeId;
  }

  public PublicId getPublicId() {
    return publicId;
  }

  public List<OrderedProduct> getOrderedProducts() {
    return orderedProducts;
  }

  public static Order create(User connectedUser, List<OrderedProduct> orderedProducts,
                       StripeSessionId stripeSessionId) {
    return OrderBuilder.order()
      .publicId(new PublicId(UUID.randomUUID()))
      .user(connectedUser)
      .status(OrderStatus.PENDING)
      .orderedProducts(orderedProducts)
      .stripeId(stripeSessionId.value())
      .build();
  }

  public void validatePayment() {
    this.status =  OrderStatus.PAID;
  }
}
