import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NotificationService} from "../../../services/notification/notification.service";

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
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  postCategory() {
    this.adminService.postCategory(this.categoryForm.value).subscribe((res) =>{
      console.log(res);
      this.notificationService.showSuccess('Category has been added successfully!');
      if(res == null) {
        this.notificationService.showError('Category has not been added!');
      }
    }, error => {
      this.notificationService.showError('Category has not been added!');
    })
  }
}