import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Response } from '../interfaces/api.interface';
import { environment } from '../../../environments/environment.development';
environment
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // Get all categories
  getAllCategories(page: number = 1): Observable<Response<Category>> {
    return this.http.get<Response<Category>>(`${environment.baseUrl}/categories?page=${page}`);
  }

  
  // Get product by id
  getProductById(id: string): Observable<{ data: Category }> {
    return this.http.get<{ data: Category }>(`${environment.baseUrl}/categories/${id}`);
  }
}
