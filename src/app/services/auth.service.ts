import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
  authorized = false;
  login = "";
  password = "";
  constructor() {
    this.authorized = false;
  }

  tryToAuth(login: string, password: string): Promise<any> {
    this.login = login;
    this.password = password;
    if (this.login === "dima" && this.password === "123") {
      this.authorized = true;
      return Promise.resolve({token: this.login + this.password});
    }
    else {
      this.authorized = false;
      return Promise.reject("Invalid credentials");
    }
  }

  tryToAuthSlowly(login: string, password: string): Promise<any> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.tryToAuth(login, password)), 2000);
    });
  }

  isAuthorized(): boolean {
    return this.authorized;
  }

  canActivate() {
    console.log('AuthGuard#canActivate called');
    return this.isAuthorized();
  }
}
