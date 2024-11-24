import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../admin-service/admin.service";

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent implements OnInit {

  constructor(private adminService: AdminService,) {
  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe((res) =>{
      console.log(res);
    })
  }

}
