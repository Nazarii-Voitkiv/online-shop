import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from "./components/login/login.component";
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

export const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"admin",loadChildren:()=> import("./admin/admin.module").then(m => m.AdminModule)},
  {path:"user",loadChildren:()=> import("./user/user.module").then(m => m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminModule, UserModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}