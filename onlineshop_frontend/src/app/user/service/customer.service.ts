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

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
        "Authorization",
        "Bearer " + LocalStorageService.getToken()
    );
  }
}
