import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      let errorMsg = 'Something went wrong!';

      if (error.error?.message) {
        errorMsg = error.error.message;
      } else if (typeof error.error === 'string') {
        errorMsg = error.error;
      } else if (error.message) {
        errorMsg = error.message;
      }

      toaster.error(errorMsg, 'Error', { timeOut: 3000 });

      return throwError(() => error);
    })
  );
};
