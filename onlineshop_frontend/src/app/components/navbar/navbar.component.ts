import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {LocalStorageService} from "../../services/storage-service/local-storage.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FaIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {


  isUserLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Перевірка стану після ініціалізації
    this.isUserLoggedIn = LocalStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = LocalStorageService.isAdminLoggedIn();

    // Оновлення при зміні маршруту
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isUserLoggedIn = LocalStorageService.isUserLoggedIn();
        this.isAdminLoggedIn = LocalStorageService.isAdminLoggedIn();
      }
    });
  }

  logout() {
    LocalStorageService.signOut();
    this.router.navigateByUrl("/login");
  }
}