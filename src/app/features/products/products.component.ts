import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/productService.service';
import { Product } from '../../core/interfaces/api.interface';
import { PorductCardComponent } from '../../shared/components/porduct-card/porduct-card.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [PorductCardComponent]
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  loading: boolean = true;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoryId = params['category'];
      this.loading = true;

      if (categoryId) {
        this.getProductsByCategory(categoryId);
      }
      else {
        this.getAllProducts();
      }
    });
  }

  getAllProducts() {
    this.productService.getAllProducts({}).subscribe({
      next: (res) => {
        this.loading = false;
        this.products = Array.isArray(res?.data)
          ? ((res.data as any).flat ? (res.data as any).flat() : ([] as Product[]).concat(...res.data)) as Product[]
          : [];
      },
      error: () => this.loading = false
    });
  }

  getProductsByCategory(categoryId: string) {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (res) => {
        this.products = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
