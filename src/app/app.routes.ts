import { NotFoundComponent } from './modules/NotFound/not-found/not-found.component';
import { LoginComponent } from './modules/login/login/login.component';
import { CeoComponent } from './modules/layouts/ceo/ceo/ceo.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./modules/login/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'hr',
        loadComponent: () => import('./modules/layouts/hr/hr/hr').then(m => m.Hr)
    },
    {
        path:'ceo',
        loadComponent: () => import('./modules/layouts/ceo/ceo/ceo.component').then(m => m.CeoComponent)
    },
    {
        path:'cfo',
        loadComponent: () => import('./modules/layouts/cfo/cfo/cfo.component').then(m => m.CfoComponent)
    },
    {
        path:'admin',
        loadComponent: () => import('./modules/layouts/admin/admin/admin.component').then(m => m.AdminComponent)
    },
    {
        path:'login',
        loadComponent: () => import('./modules/login/login/login.component').then(m => m.LoginComponent)
    },
    {
        path:'register',
        loadComponent: () => import('./modules/register/register/register').then(m => m.Register)
    },
    {
        path:'employee',
        loadComponent: () => import('./modules/layouts/employee/employee/employee.component').then(m => m.EmployeeComponent)
    },
    {
        path: '**',
        loadComponent:() => import('./modules/NotFound/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
