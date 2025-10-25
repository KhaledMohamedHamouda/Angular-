import { authGuard } from './core/guard/auth-guard';
import { loggedInGuard } from './core/guard/logged-in-guard';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },

    {
        path: 'home', canActivate: [authGuard], loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'cart', canActivate: [authGuard], loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent)
    },
    {
        path: 'categories', canActivate: [authGuard], loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent)
    },
    {
        path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'brands', canActivate: [authGuard], loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent)
    },
    {
        path: 'register', loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'products', canActivate: [authGuard], loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent)
    },
    {
        path: 'product-details/:id/:title', loadComponent: () => import('./features/product-details/product-details.component').then(m => m.ProductDetailsComponent)
    },
    {
        path: 'reset-password', loadComponent: () => import('./features/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
    }
    ,
    {
        path: 'allorders', loadComponent: () => import('./features/allorders/allorders.component').then(m => m.AllordersComponent)
    },
    //!Not Found component
    {
        path: '*', loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
    }

];
