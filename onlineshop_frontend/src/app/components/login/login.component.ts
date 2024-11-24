import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {LocalStorageService} from "../../services/storage-service/local-storage.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  validateForm !: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  login(){
    // console.log(this.validateForm.value);
    this.authService.login(this.validateForm.get(['username'])!.value,this.validateForm.get(['password'])!.value).subscribe((res) => {
      // console.log(res);
      if(LocalStorageService.isAdminLoggedIn()) {
        this.router.navigateByUrl('/admin/dashboard');
      } else if(LocalStorageService.isUserLoggedIn()) {
        this.router.navigateByUrl('/user/dashboard');
      }
    }, error => {
      console.log(error)
      if(error.status === 406) {
        console.log("Account is not active")
        console.log(error.message)
      } else {
        console.log("Bad crendetials")
        console.log(error.message)
      }

        }
    )
  }
}