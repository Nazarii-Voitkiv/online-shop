package com.example.onlineshop_backend.entities;

import com.example.onlineshop_backend.dto.OrderDTO;
import com.example.onlineshop_backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String address;

    private String paymentType;

    private Date date;

    private Long price;

    private OrderStatus orderStatus;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order", cascade = CascadeType.ALL)
    private List<CartItems> cartItems;

    public OrderDTO getOrderDTO() {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(id);
        orderDTO.setOrderStatus(orderStatus);
        orderDTO.setAmount(price);
        orderDTO.setAddress(address);
        orderDTO.setPaymentType(paymentType);
        orderDTO.setUsername(user.getName());
        orderDTO.setDate(date);
        orderDTO.setOrderDescription(description);
        return orderDTO;
    }
}