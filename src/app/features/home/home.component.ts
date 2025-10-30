import { Component, OnInit } from '@angular/core';
import { PorductCardComponent } from "../../shared/components/porduct-card/porduct-card.component";
import { ProductService } from '../../core/services/productService.service';
import { Category, Product } from '../../core/interfaces/api.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../core/services/catogery.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PorductCardComponent, CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  catogries: Category[] = [];

  isloading: boolean = false;
  
  // todo    inject Product_service bg constructor  && inject Category_service
  constructor(private productService: ProductService, private catogeries: CategoryService, private cartService: CartService, private toaster: ToastrService) { }


  ngOnInit(): void {
    this.getAllProducts({});
    this.getCatogeries();
  }
  // todo     get all products function
  getAllProducts({ }) {
    this.isloading = true;
    this.productService.getAllProducts({}).subscribe({
      next: (response) => {
        console.log(response);
        // If API returns nested arrays (Product[][]), flatten to Product[]
        this.products = Array.isArray(response?.data)
          ? ((response.data as any).flat ? (response.data as any).flat() : ([] as Product[]).concat(...response.data)) as Product[]
          : [];
        this.isloading = false;
      },
      error: (error) => {
        console.log(error);
        this.isloading = false;
      }
    });
  }

  // todo                   get Catogery function
  getCatogeries() {
    this.catogeries.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.catogries = res.data;
      }
    })
  }

  // ----------
  // todo   curousel    

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    smartSpeed: 900,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 800,
    navSpeed: 800,
    navText: [
      '<i class="fa-solid fa-angle-left text-xl text-gray-500 dark:text-gray-300 hover:text-green-500 transition-all"></i>',
      '<i class="fa-solid fa-angle-right text-xl text-gray-500 dark:text-gray-300 hover:text-green-500 transition-all"></i>'
    ],
    responsive: {
      0: {
        items: 1,
        margin: 8
      },
      400: {
        items: 2,
        margin: 10
      },
      640: {
        items: 3,
        margin: 12
      },
      940: {
        items: 5,
        margin: 14
      },
      1280: {
        items: 7,
        margin: 16
      }
    },
    nav: true,
    margin: 12,
    stagePadding: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn'
  };
}
