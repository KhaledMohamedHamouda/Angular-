import { Component, Input } from '@angular/core';
import { Product } from '../../../core/interfaces/api.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../../../features/home/home.component';

@Component({
  selector: 'app-porduct-card',
  templateUrl: './porduct-card.component.html',
  styleUrls: ['./porduct-card.component.scss'],
  imports: [RouterLink,HomeComponent]
})
export class PorductCardComponent {
  constructor(private cartService: CartService, private toaster: ToastrService) { }


  @Input()
  product: Product = {} as Product;


  // todo   add product to cart
  addProductToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this.toaster.success(response.message)
      },
      error: (error) => {
        this.toaster.error(error.message)
      }
    })
  } 
}
