import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent  implements OnInit {

  id!: number;
  updateProductForm!: FormGroup;
  categories: any;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;
  selectedFile: any;
  imgChanged = false;


  constructor(private adminService: AdminService,
              private activated: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.updateProductForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: [null, Validators.required]
    });
    this.id = +this.activated.snapshot.params["id"];
    this.getProductById();
    this.getAllCategories()
  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe((res) =>{
      this.categories = res;
      console.log(res);
    })
  }

  getProductById() {
    this.adminService.getProductById(this.id).subscribe((res) => {
      console.log(res);
      this.existingImage = "data:image/jpeg;base64," + res.returnedImage;
      this.updateProductForm.patchValue(res);
      // @ts-ignore
      this.updateProductForm.get("categoryId").setValue(res.categoryId.toString());
    })
  }

  updateProduct() {
    const productDTO: FormData = new FormData();
    if(this.imgChanged) {
      productDTO.append('image', this.selectedFile);
    }
    productDTO.append('price', this.updateProductForm.get('price')!.value);
    productDTO.append('name', this.updateProductForm.get('name')!.value);
    productDTO.append('description', this.updateProductForm.get('description')!.value);
    this.adminService.updateProduct(this.updateProductForm.get('categoryId')?.value, this.id, productDTO).subscribe((res) => {
      console.log(res);
      if (res != null) {
        this.router.navigateByUrl("/admin/dashboard");
        this.notificationService.showSuccess('Product has been updated successfully!');
      } else {
        this.notificationService.showSuccess('Product has not been updated!');
      }
    }, error => {
      console.log(error.message);
      this.notificationService.showSuccess('Product has not been updated!');
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  allowNumbersOnly(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}