import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {AdminService} from "../../admin-service/admin.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  products: any[] = [];

  constructor(private adminService: AdminService,) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe((res: any[]) => {
      console.log(res);
      res.forEach((element) => {
        element.processedImage = "data:image/jpeg;base64," + element.returnedImage;
        this.products.push(element);
      });
    });
  }

  deleteProduct(id: number) {
    console.log(id);
    this.adminService.deleteProduct(id).subscribe((res: any[]) => {
      console.log(res);
      this.getAllProducts();
    })
  }
}
