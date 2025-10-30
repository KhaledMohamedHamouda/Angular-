import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/interfaces/api.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  brands: Brand[] = [];
  isloading: boolean = true;
  constructor(private brandService: BrandsService) { }

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe({
      next: (response) => {
        console.log(response.data);
        this.brands = response.data;
        this.isloading = false;
      },
      error: (err) => {
        console.log(err);
        this.isloading = false;
      }
    })
  }
}