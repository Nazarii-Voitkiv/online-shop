package com.example.online_shop.dto;

import com.example.online_shop.enums.OrderStatus;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderDTO {

    private String orderDescription;

    private List<CartItemDTO> cartItemDTOList;

    private Long id;

    private Date date;

    private Long amount;

    private String address;

    private OrderStatus orderStatus;

    private String paymentMethod;

    private String username;
}