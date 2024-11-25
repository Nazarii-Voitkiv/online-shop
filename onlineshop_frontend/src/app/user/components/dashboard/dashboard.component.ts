import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  products: any[] = [];

  constructor(private customerService: CustomerService,) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = [];
    this.customerService.getAllProducts().subscribe((res: any[]) => {
      console.log(res);
      res.forEach((element) => {
        element.processedImage = "data:image/jpeg;base64," + element.returnedImage;
        this.products.push(element);
      });
    });
  }
}
