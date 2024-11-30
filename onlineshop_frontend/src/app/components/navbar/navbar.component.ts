import {
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LocalStorageService } from '../../services/storage-service/local-storage.service';
import {NotificationService} from "../../services/notification/notification.service";

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
  openMenu: string | null = null;

  constructor(private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = LocalStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = LocalStorageService.isAdminLoggedIn();

    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isUserLoggedIn = LocalStorageService.isUserLoggedIn();
        this.isAdminLoggedIn = LocalStorageService.isAdminLoggedIn();
        this.openMenu = null;
      }
    });
  }

  logout() {
    LocalStorageService.signOut();
    this.router.navigateByUrl('/login');
    this.notificationService.showSuccess('You successfully logged out!');
  }

  toggleMenu(menuName: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.openMenu === menuName) {
      this.openMenu = null;
    } else {
      this.openMenu = menuName;
    }
  }
}