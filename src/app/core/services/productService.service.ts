import { Product, Response } from './../interfaces/api.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
environment
interface pagination_barameters {
  limit?: number;
  page?: number
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }
  //            todo        get all products
  getAllProducts({ limit = 40, page = 1 }: pagination_barameters): Observable<Response<Product[]>> {
    return this.http.get<Response<Product[]>>(`${environment.baseUrl}/products?limit=${limit}&page=${page}`);
  }

  //  todo         get product by id      
  getProductById(id: string): Observable<{ data: Product }> {
    return this.http.get<{ data: Product }>(`${environment.baseUrl}/products/${id}`);
  }
  
  // todo         get products by category
  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/products?category=${categoryId}`);
  }

}
