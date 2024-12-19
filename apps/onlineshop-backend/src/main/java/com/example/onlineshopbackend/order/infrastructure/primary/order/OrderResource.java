package com.example.onlineshopbackend.order.infrastructure.primary.order;

import com.example.onlineshopbackend.order.infrastructure.secondary.service.stripe.CustomSession;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Address;
import com.stripe.model.Event;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.example.onlineshopbackend.order.application.OrderApplicationService;
import com.example.onlineshopbackend.order.domain.order.CartPaymentException;
import com.example.onlineshopbackend.order.domain.order.aggregate.*;
import com.example.onlineshopbackend.order.domain.order.vo.StripeSessionId;
import com.example.onlineshopbackend.order.domain.user.vo.*;
import com.example.onlineshopbackend.product.domain.vo.PublicId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.example.onlineshopbackend.product.infrastructure.primary.ProductsAdminResource.ROLE_ADMIN;

@RestController
@RequestMapping("/api/orders")
public class OrderResource {

  private final OrderApplicationService orderApplicationService;

  @Value("${application.stripe.webhook-secret}")
  private String webhookSecret;


  public OrderResource(OrderApplicationService orderApplicationService) {
    this.orderApplicationService = orderApplicationService;
  }

  @GetMapping("/get-cart-details")
  public ResponseEntity<RestDetailCartResponse> getDetails(@RequestParam List<UUID> productIds) {
    List<DetailCartItemRequest> cartItemRequests = productIds.stream()
      .map(uuid -> new DetailCartItemRequest(new PublicId(uuid), 1))
      .toList();

    DetailCartRequest detailCartRequest = DetailCartRequestBuilder.detailCartRequest().items(cartItemRequests).build();
    DetailCartResponse cartDetails = orderApplicationService.getCartDetails(detailCartRequest);
    return ResponseEntity.ok(RestDetailCartResponse.from(cartDetails));
  }

  @PostMapping("/init-payment")
  public ResponseEntity<RestStripeSession> initPayment(@RequestBody List<RestCartItemRequest> items) {
    List<DetailCartItemRequest> detailCartItemRequests = RestCartItemRequest.to(items);
    try {
      StripeSessionId stripeSessionInformation = orderApplicationService.createOrder(detailCartItemRequests);
      RestStripeSession restStripeSession = RestStripeSession.from(stripeSessionInformation);
      return ResponseEntity.ok(restStripeSession);
    } catch (CartPaymentException cpe) {
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping("/webhook")
  public ResponseEntity<Void> webhookStripe(@RequestBody String paymentEvent,
                                            @RequestHeader("Stripe-Signature") String stripeSignature) {
    Event event;
    try {
      event = Webhook.constructEvent(paymentEvent, stripeSignature, webhookSecret);
    } catch (SignatureVerificationException e) {
      System.err.println("Invalid signature: " + e.getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    if ("checkout.session.completed".equals(event.getType())) {
      try {
        String json = event.getData().getObject().toJson();
        CustomSession session = new Gson().fromJson(json, CustomSession.class);

        handleCheckoutSessionCompleted(session);
      } catch (Exception e) {
        System.err.println("Failed to deserialize session: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
    } else {
      System.out.println("Unhandled event type: " + event.getType());
    }

    return ResponseEntity.ok().build();
  }

  private void handleCheckoutSessionCompleted(CustomSession session) {
    System.out.println("Session ID: " + session.getId());
    System.out.println("Payment Intent: " + session.getPaymentIntent());

    if (session.getMetadata() == null || !session.getMetadata().containsKey("user_public_id")) {
      System.err.println("Missing user_public_id in metadata.");
      return;
    }

    CustomSession.CustomerDetails customerDetails = session.getCustomerDetails();
    if (customerDetails != null && customerDetails.getAddress() != null) {
      CustomSession.Address address = customerDetails.getAddress();

      UserAddress userAddress = UserAddressBuilder.userAddress()
        .city(address.getCity())
        .country(address.getCountry())
        .zipCode(address.getPostalCode())
        .street(address.getLine1())
        .build();

      UserAddressToUpdate userAddressToUpdate = UserAddressToUpdateBuilder.userAddressToUpdate()
        .userAddress(userAddress)
        .userPublicId(new UserPublicId(UUID.fromString(session.getMetadata().get("user_public_id"))))
        .build();

      StripeSessionInformation sessionInformation = StripeSessionInformationBuilder.stripeSessionInformation()
        .userAddress(userAddressToUpdate)
        .stripeSessionId(new StripeSessionId(session.getId()))
        .build();

      try {
        orderApplicationService.updateOrder(sessionInformation);
        System.out.println("Order successfully updated for session ID: " + session.getId());
      } catch (Exception e) {
        System.err.println("Failed to update order: " + e.getMessage());
      }
    } else {
      System.err.println("Customer details or address are missing.");
    }
  }

  @GetMapping("/user")
  public ResponseEntity<Page<RestOrderRead>> getOrdersForConnectedUser(Pageable pageable) {
    Page<Order> orders = orderApplicationService.findOrdersForConnectedUser(pageable);
    PageImpl<RestOrderRead> restOrderReads = new PageImpl<>(
      orders.getContent().stream().map(RestOrderRead::from).toList(),
      pageable,
      orders.getTotalElements()
    );
    return ResponseEntity.ok(restOrderReads);
  }

  @GetMapping("/admin")
  @PreAuthorize("hasAnyRole('" + ROLE_ADMIN + "')")
  public ResponseEntity<Page<RestOrderReadAdmin>> getOrdersForAdmin(Pageable pageable) {
    Page<Order> orders = orderApplicationService.findOrdersForAdmin(pageable);
    PageImpl<RestOrderReadAdmin> restOrderReads = new PageImpl<>(
      orders.getContent().stream().map(RestOrderReadAdmin::from).toList(),
      pageable,
      orders.getTotalElements()
    );
    return ResponseEntity.ok(restOrderReads);
  }
}
