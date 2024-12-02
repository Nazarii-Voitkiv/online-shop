import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-view-orders',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.scss'
})
export class ViewOrdersComponent implements OnInit{

  myOrders: any;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.adminService.getAllOrders().subscribe((res) => {
      console.log(res);
      this.myOrders = res;
    });
  }
}