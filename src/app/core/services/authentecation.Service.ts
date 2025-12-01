import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iregister } from '../interface/register-data.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// todo  auth service    
export class Authentecation {
  // !! dependency injection  httpClient for http request  
  constructor(private httpClient:HttpClient) {}

  register_user( data : Iregister) :Observable<any>{ 
  return this.httpClient.post(`https://erplocal.runasp.net/api/Auth/Register`,data)
  }
}
