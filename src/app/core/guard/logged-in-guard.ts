import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
// todo   guard is an function that has two parameter  route contain information of route & state that has route  
export const loggedInGuard: CanActivateFn = (route, state) => {

  // todo    if behavoirSubject !==null that mean it has data and cookie has token

  const auth = inject(AuthService);
  const router = inject(Router)
  if (auth.behaviorSubject.getValue() !== null) {
    return router.parseUrl('/home')
  }
  // todo   doesnt have token  and go to login padge  
  else {

    // router.navigate(['/login'])
    // return false;
    return true;
  }
};
