import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {AdminService} from "../../service/admin.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NotificationService} from "../../../services/notification/notification.service";

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

  constructor(private adminService: AdminService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe((res: any[]) => {
      res.forEach((element) => {
        element.processedImage = "data:image/jpeg;base64," + element.returnedImage;
        this.products.push(element);
      });
    });
  }

  deleteProduct(id: number) {
    this.adminService.deleteProduct(id).subscribe((res: any[]) => {
      this.notificationService.showSuccess('Product has been deleted successfully!');
      this.getAllProducts();
    }, error => {
      console.log(error.message);
      this.notificationService.showError('Product has not been deleted!');
    })
  }
}