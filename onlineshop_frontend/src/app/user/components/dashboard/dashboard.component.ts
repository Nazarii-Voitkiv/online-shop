import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  products: any[] = [];
  searchForm!: FormGroup;

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      title: ["", Validators.required],
    })
    this.getAllProducts();
  }

  searchProduct() {
    this.products = [];
    this.customerService.searchProductsByTitle(this.searchForm.get(["title"])?.value).subscribe((res: any[]) => {
      console.log(res);
      res.forEach((element) => {
        element.processedImage = "data:image/jpeg;base64," + element.returnedImage;
        this.products.push(element);
      });
    })
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
