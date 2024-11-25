import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../admin-service/admin.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent  implements OnInit {

  id!: number;

  constructor(private adminService: AdminService,
              private activated: ActivatedRoute) {}

  ngOnInit() {

    this.id = +this.activated.snapshot.params["id"];
    this.getProductById();

  }


  getProductById() {
    this.adminService.getProductById(this.id).subscribe((res: any[]) => {
      console.log(res);
    })
  }
}
