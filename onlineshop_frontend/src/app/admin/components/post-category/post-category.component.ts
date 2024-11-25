import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../admin-service/admin.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss'
})
export class PostCategoryComponent implements OnInit {

  categoryForm!: FormGroup

  constructor(private  adminService: AdminService,
              private fb: FormBuilder,
              ) {
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  postCategory() {
    this.adminService.postCategory(this.categoryForm.value).subscribe((res) =>{
      console.log(res);
      if(res == null) {

      }
    })
  }
}
