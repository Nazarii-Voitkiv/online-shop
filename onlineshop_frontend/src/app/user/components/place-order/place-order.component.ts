import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent implements OnInit{

  placeOrderForm!: FormGroup;
  Payment = ["Cash on delivery", "Online"]

  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit() {
    this.placeOrderForm = this.fb.group({
      address:[null, Validators.required],
      payment:[null, Validators.required],
      orderDescription:[null, Validators.required]
    })
  }

  placeOrder() {
    this.customerService.placeOrder(this.placeOrderForm.value).subscribe((res) => {
      console.log(res);
      this.notificationService.showSuccess("Order placed successfully");
      this.router.navigateByUrl("/user/dashboard")
    })
  }
}