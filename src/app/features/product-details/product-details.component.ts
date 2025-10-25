import { Component } from '@angular/core';
import { ProductService } from '../../core/services/productService.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/interfaces/api.interface';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private cartService: CartService ,private toaster:ToastrService) { }


  _productDetais: Product = {} as Product;
  ISLODADING: boolean = false;
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getProductDetails(id);
      }
    }
    )
  }

  // todo   get product by id
  getProductDetails(id: string) {
    this.ISLODADING = true;
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.ISLODADING = false;
        console.log(response);
        this._productDetais = response.data;
      },
      error: (error) => {
        this.ISLODADING = false;
        console.log(error);
      }
    });
  }



  //! adding curousel by ngx-owl-carousel-o
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1000,

    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  // todo  add product to cart  
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
