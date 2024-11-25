import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../admin-service/admin.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

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
              private fb: FormBuilder,) {}

  ngOnInit() {
    this.updateProductForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: [null, Validators.required]
    })
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Отримуємо вибраний файл
    this.previewImage(); // Викликаємо метод для перегляду зображення
    this.imgChanged = true; // Позначаємо, що зображення було змінено
    this.existingImage = null; // Очищаємо існуюче зображення
  }

  previewImage() {
    const reader = new FileReader(); // Створюємо новий об'єкт FileReader
    reader.onload = () => {
      this.imagePreview = reader.result; // Зберігаємо URL для попереднього перегляду
    };
    reader.readAsDataURL(this.selectedFile); // Зчитуємо файл як Data URL
  }

  allowNumbersOnly(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
