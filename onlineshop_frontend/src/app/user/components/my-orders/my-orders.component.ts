import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit{

  myOrders: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders() {
    this.customerService.getOrdersByUserId().subscribe((res) => {
      console.log(res);
      this.myOrders = res;
    })
  }
}
