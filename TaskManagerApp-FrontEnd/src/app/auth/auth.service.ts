import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient,
    private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAutheticated(): boolean {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email, password) {
    const authData = { email: email, password: password };

    console.log(authData)
    this.http.post<{ user, token: string }>("http://localhost:4000/users/login", authData)
      .subscribe((response) => {
        console.log(response.user)
        console.log(response.token)
        const token = response.token;
        if (token) {
          this.token = response.token;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(token);
          this.router.navigate(["/"]);
        }

      })
  }

  logout() {

    this.http.post<{ user }>("http://localhost:4000/users/logout", {})
      .subscribe((response) => {
        console.log(response)

        if (response) {
          this.token = null;
          this.isAuthenticated = false;
          this.authStatusListener.next(false);
          this.clearAuthData();
          this.router.navigate(['/']);
        }
      })

  }



  signUp(data) {
    this.http.post<{ user, token: string }>("http://localhost:4000/users", data)
      .subscribe((response) => {
        console.log(response)
        const user = response.user;
        const token = response.token;

        if (token) {
          this.token = response.token;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      })
  }


  autoAuthUser() {
    if (!this.getAuthData()) {
      return;
    }
    const authInformation = this.getAuthData();
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);

  }
  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    return {
      token: token
    }
  }
}
