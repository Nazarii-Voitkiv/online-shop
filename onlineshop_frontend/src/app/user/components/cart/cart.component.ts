import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {NgForOf, NgIf} from "@angular/common";
import {NotificationService} from "../../../services/notification/notification.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  totalAmount!: number;
  cartProducts: any = [];

  constructor(private customerService: CustomerService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.customerService.getCartByUserId().subscribe((res) => {
      console.log(res);
      this.cartProducts = res.cartItemDTOList;
      this.totalAmount = res.amount;
    });
  }

  minusProduct(productId: number) {
    this.customerService.decreaseQuantityOfProduct(productId).subscribe((res) => {
      console.log(res);
      this.notificationService.showSuccess("Successfully decrease");
      this.getCart();
    });
  }

  plusProduct(productId: number) {
    this.customerService.increaseQuantityOfProduct(productId).subscribe((res) => {
      console.log(res);
      this.notificationService.showSuccess("Successfully increase");
      this.getCart();
    });
  }
}