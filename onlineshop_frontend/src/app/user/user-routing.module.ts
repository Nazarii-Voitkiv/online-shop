import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UserGuard} from "../guards/user-guard/user.guard";
import {CartComponent} from "./components/cart/cart.component";
import {PlaceOrderComponent} from "./components/place-order/place-order.component";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent, canActivate: [UserGuard]},
  {path:"cart", component:CartComponent, canActivate: [UserGuard]},
  {path:"place-order", component:PlaceOrderComponent, canActivate: [UserGuard]},
  {path:"my-orders", component:MyOrdersComponent, canActivate:[UserGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }