import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UserGuard} from "../guards/user-guard/user.guard";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent, canActivate: [UserGuard]},
  {path:"cart", component:CartComponent, canActivate: [UserGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }