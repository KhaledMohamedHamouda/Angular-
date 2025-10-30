import { Brand } from './../interfaces/api.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Response} from './../interfaces/api.interface';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http: HttpClient) { }


  getAllBrands() : Observable<Response<Brand>> {
    return this.http.get<Response<Brand>>(`${environment.baseUrl}/brands`);
  }
}
