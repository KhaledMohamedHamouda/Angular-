import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CartLoaderService } from '../services/cart-loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService = inject(CartLoaderService);
  loaderService.showLoader()
  return next(req).pipe(
    finalize(()=>{
      loaderService.hideLoader()
    })
  )
};
