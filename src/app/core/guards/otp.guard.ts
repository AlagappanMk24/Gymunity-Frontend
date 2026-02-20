import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const otpGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);

  const purpose = route.queryParamMap.get('purpose');

  if (purpose === 'register') {
    const pendingRegistration = sessionStorage.getItem('pendingRegistration');
    if (pendingRegistration) {
      return true;
    }
  }

  if (purpose === 'login') {
    const pendingLogin = sessionStorage.getItem('pendingLogin');
    if (pendingLogin) {
      return true;
    }
  }

  console.warn('[OtpGuard] ❌ Invalid OTP access attempt');
  router.navigate(['/auth/login']);
  return false;
};