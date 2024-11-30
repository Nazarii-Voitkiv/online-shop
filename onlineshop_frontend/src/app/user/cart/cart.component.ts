import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../service/customer.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  totalAmount!: number;
  cartProducts: any = [];

  constructor(private customerService: CustomerService) { }

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
}