import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
// todo   guard is an function that has two parameter  route contain information of route & state that has route  
export const authGuard: CanActivateFn = (route, state) => {
  
  // todo    if behavoirSubject !==null that mean it has data and cookie has token

  const cookies = inject(CookieService)
  const token =cookies.get('token')
  const router = inject(Router)
  if (token && token.trim() !== '') {
    return true;
  }
  // todo   doesnt have token  and go to login padge  
  else {

    // router.navigate(['/login'])
    // return false;
    return router.parseUrl('/login')
  }
};
