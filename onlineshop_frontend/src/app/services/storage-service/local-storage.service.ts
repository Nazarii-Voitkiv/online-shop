import { Injectable } from '@angular/core';

const TOKEN = "I_token";
const USERID = "I_user";
const USERROLE = "I_role"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveUserId(userId: any) {
    window.localStorage.removeItem(USERID);
    window.localStorage.setItem(USERID, userId);
  }

  saveUserRole(role: any) {
    window.localStorage.removeItem(USERROLE);
    window.localStorage.setItem(USERROLE, role);
  }

  saveToken(token: any) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken(): string {
    return <string>localStorage.getItem(TOKEN);
  }

  static hasToken(): boolean {
    if(this.getToken() === null) {
      return false;
    }
    return true;
  }

  private static getUserRole(): string {
    const role = localStorage.getItem(USERROLE);
    return role ? role : '';
  }

  static getUserId(): string {
    return <string>localStorage.getItem(USERID);
  }

  static isUserLoggedIn(): boolean {
    if (!this.hasToken()) {
      return false;
    }

    const role: string = this.getUserRole();
    return role === "USER";
  }

  static isAdminLoggedIn(): boolean {
    if (!this.hasToken()) {
      return false;
    }

    const role: string = this.getUserRole();
    return role === "ADMIN";
  }

  static signOut() {
    window.localStorage.removeItem(USERID);
    window.localStorage.removeItem(USERROLE);
    window.localStorage.removeItem(TOKEN);
  }
}