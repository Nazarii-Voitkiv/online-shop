import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/storage-service/local-storage.service";

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<any> {
    return this.http.get<[]>(BASIC_URL + 'api/customer/products',{
      headers:this.createAuthorizationHeader()
    });
  }

  searchProductsByTitle(title: string): Observable<any> {
    return this.http.get<[]>(BASIC_URL + 'api/customer/product/search/'+title,{
      headers:this.createAuthorizationHeader()
    });
  }

  addProductToCart(productId: number): Observable<any> {
    let cartDTO = {
      productId: productId,
      userId:LocalStorageService.getUserId()
    }
    return this.http.post<[]>(BASIC_URL + 'api/customer/cart', cartDTO, {
      headers:this.createAuthorizationHeader()
    });
  }

  getCartByUserId(): Observable<any> {
    return this.http.get(BASIC_URL + "api/customer/cart/" + LocalStorageService.getUserId(), {
      headers: this.createAuthorizationHeader(),
    });
  }

  decreaseQuantityOfProduct(productId: number): Observable<any> {
    return this.http.get(BASIC_URL + "api/customer/" + LocalStorageService.getUserId() + "/deduct/" + productId,{
      headers: this.createAuthorizationHeader(),
    });
  }

  increaseQuantityOfProduct(productId: number): Observable<any> {
    return this.http.get(BASIC_URL + "api/customer/" + LocalStorageService.getUserId() + "/add/" + productId, {
      headers: this.createAuthorizationHeader(),
    });
  }

  placeOrder(placeOrderDTO: any): Observable<any> {
    placeOrderDTO.userId = LocalStorageService.getUserId();
    return this.http.post(BASIC_URL + "api/customer/placeOrder", placeOrderDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrdersByUserId(): Observable<any> {
    return this.http.get(BASIC_URL + "api/customer/orders/" + LocalStorageService.getUserId(), {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
        "Authorization",
        "Bearer " + LocalStorageService.getToken()
    );
  }
}