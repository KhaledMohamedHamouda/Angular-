import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { register_data } from '../interface/register-data.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// todo  auth service    
export class Authentecation {
  // !! dependency injection  httpClient for http request  
  constructor(private httpClient:HttpClient) {}

  register( data:register_data) :Observable<any>{
  return this.httpClient.post(`https://erplocal.runasp.net/api/Auth/Register`,data)
  }
}
