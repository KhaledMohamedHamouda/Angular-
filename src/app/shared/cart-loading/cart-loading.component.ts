import { Component, OnInit } from '@angular/core';
import { CartLoaderService } from '../../core/services/cart-loader.service';

@Component({
  selector: 'app-cart-loading',
  imports: [],
  templateUrl: './cart-loading.component.html',
  styleUrl: './cart-loading.component.scss'
})
export class CartLoadingComponent implements OnInit{

  constructor(public loaderService: CartLoaderService) {}

  ngOnInit(): void {
    this.loaderService.isLoading()
  //  this.isLoading= this.loaderService.isLoadingStatus
  }
}
