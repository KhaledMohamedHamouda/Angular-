import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment.development';
environment
// todo       register data   

export interface UserData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

// todo   login Data       
export interface LoginData {
  email: string,
  password: string,
}


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  // behavior subject
  behaviorSubject = new BehaviorSubject<{ id: string, name: string, role: string } | null>(null);


  // todo   dependency injection     (Http Clinet), (platform id show if the project on server or client ) , router
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any, private router: Router, private cookieServices: CookieService) {

    if (isPlatformBrowser(this.platformId)) {
      const token = cookieServices.get('token')
      if (token) {
        this.decodedToken(token)
      }
    }
  }


  // todo     register data                                                                                
  register(data: UserData): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/signup`, data)
  }
  // todo                                 Login data                                            
  login(_login: LoginData) {
    return this.http.post(`${environment.baseUrl}/auth/signin`, _login)
  }

  // decoded token
  // todo  decoded funvtion      after installing jwt library    
  decodedToken(token: string) {
    const decoded = jwtDecode(token);
    console.log(decoded);
  }

  // todo    logout fnuction   
  Logout() {
    // clear token at localstorage
    if (isPlatformBrowser(this.platformId)) {
      // localStorage.removeItem('token');
      // todo   remove token at cookies
      this.cookieServices.delete('token')
      // make the return of behavior =null
      this.behaviorSubject.next(null);
      // going to login padge
      this.router.navigate(['/login'])
    }
  }

  // todo   forget password
  forgetPassword(data: { email: string }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/forgotPasswords`, data)
  }
  // todo   verfy code
  verfyCode(data: { resetCode: string }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/verifyResetCode`, data)
  }
  // todo   reset password
  resetPassword(data: { email: string, newPassword: string }): Observable<any> {
    return this.http.put(`${environment.baseUrl}/auth/resetPassword`, data)
  }

}
