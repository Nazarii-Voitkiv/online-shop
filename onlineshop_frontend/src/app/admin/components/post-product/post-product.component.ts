import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../admin-service/admin.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent implements OnInit {

  categories!: any[];
  postProductForm!: FormGroup;
  selectedFile!: File | null;

  constructor(private adminService: AdminService,
              private fb: FormBuilder,
              private router: Router,) {
  }

  ngOnInit() {
    this.postProductForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: [null, Validators.required]
    })
    this.getAllCategories();
  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe((res) =>{
      this.categories = res;
      console.log(res);
    })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
  }

  postProduct() {
    if (!this.selectedFile) {
      console.error("No file selected.");
      return;
    }

    const productDTO: FormData = new FormData();
    productDTO.append("image", this.selectedFile);
    productDTO.append("name", this.postProductForm.get("name")!.value);
    productDTO.append("price", this.postProductForm.get("price")!.value);
    productDTO.append("description", this.postProductForm.get("description")!.value);

    this.adminService.postProduct(this.postProductForm.get("categoryId")!.value, productDTO)
        .subscribe((res) => {
          console.log(res);
          if (res != null) {
            this.router.navigateByUrl("/admin/dashboard");
          } else {

          }
        });
  }

  allowNumbersOnly(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
