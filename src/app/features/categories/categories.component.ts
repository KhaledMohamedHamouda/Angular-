import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/services/catogery.service';
import { Category } from '../../core/interfaces/api.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  catogories: Category[] = [];

  constructor(
    private CategoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.CategoryService.getAllCategories().subscribe({
      next: (res) => {
        this.catogories = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  goToCategoryProducts(categoryId: string) {
    this.router.navigate(['/products'], { queryParams: { category: categoryId } });
  }
}
