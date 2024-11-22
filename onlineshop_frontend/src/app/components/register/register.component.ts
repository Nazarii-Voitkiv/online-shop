import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink, // Для маршрутизації
    ReactiveFormsModule,
    NgIf,
    // Для роботи з реактивними формами
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Виправлено: styleUrl → styleUrls
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup; // Форма для валідації

  // Кастомний валідатор для підтвердження пароля
  confirmationValidator = (control: FormControl): { [s: string]: boolean } | null => {
    if (!control.value) {
      return { required: true }; // Поле є обов'язковим
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true }; // Паролі не співпадають
    }
    return null; // Валідно
  };

  constructor(private fb: FormBuilder,
              private authService: AuthService,) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]], // Поле "name" обов'язкове
      email: [null, [Validators.required, Validators.email]], // Email повинен бути валідним
      password: [null, [Validators.required]], // Поле "password" обов'язкове
      confirmPassword: [
        null,
        [Validators.required, this.confirmationValidator] // Поле "confirmPassword" перевіряється кастомним валідатором
      ]
    });

    // Оновлення валідатора при зміні значення пароля
    this.validateForm.controls['password'].valueChanges.subscribe(() => {
      this.validateForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  // Метод для реєстрації
  register() {
    console.log(this.validateForm.value);
    this.authService.register(this.validateForm.value).subscribe((res) => {
      console.log(res);
    })
  }
}
