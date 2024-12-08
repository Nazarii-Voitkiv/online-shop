import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {LocalStorageService} from "../../services/storage-service/local-storage.service";
import {NotificationService} from "../../services/notification/notification.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private notificationService: NotificationService) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean {
    if(LocalStorageService.isUserLoggedIn()) {
      this.router.navigateByUrl("/user/dashboard")
      this.notificationService.showError("You dont have access of this page");
      return false
    } else if(!LocalStorageService.hasToken()) {
      LocalStorageService.signOut();
      this.router.navigateByUrl("/login");
      this.notificationService.showError("You are not logged in");
      return false;
    }
    return true;
  }
}