import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CartResponse } from '../interfaces/api.interface';
environment
@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }


  // todo   calling Api      

  // add product to cart
  addProductToCart(productId: string,): Observable<any> {
    return this.http.post(`${environment.baseUrl}/cart`, { productId } , 
      // { headers: { token: this.cookieService.get('token') || '' } }
    )
  }

  // update product at cart 
  updateProduct(productId: string, count: number): Observable<CartResponse> {
    return this.http.put<CartResponse>(`${environment.baseUrl}/cart/${productId}`, { count }, 
      // { headers: { token: this.cookieService.get('token') || '' } }
    );
  }

  // delete product from cart
  deleteProduct(productId: string): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${environment.baseUrl}/cart/${productId}`, 
      // { headers: { token: this.cookieService.get('token') || '' } }
    )
  }

  // clear all cart 
  clearCart(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/cart`, 
      // { headers: { token: this.cookieService.get('token') || '' } }
    )
  }

  // get user cart
  getUserCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${environment.baseUrl}/cart`, 
      // { headers: { token: this.cookieService.get('token') || '' } }
    )
  }


  // todo   check session payment

  checkOut_session(Cart_id: string, body: any): Observable<{ session: { url: string } }> {
    return this.http.post<{ session: { url: string } }>(`${environment.baseUrl}/orders/checkout-session/${Cart_id}?${environment.frontUrl}`, body ,
      { headers: { token: this.cookieService.get('token') || '' } }
    );
  }
}



