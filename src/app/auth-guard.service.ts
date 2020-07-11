import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from "./auth/auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  private authorized = false;

  constructor(
    public auth: AuthService,
    public router: Router
  ) {
    this.auth.$authorized.subscribe(authorized => this.authorized = authorized);
  }

  canActivate(): boolean {
    if (!this.authorized) {
      console.error('access denied');

      this.router.navigate(['auth']);
    }

    return this.authorized;
  }
}
