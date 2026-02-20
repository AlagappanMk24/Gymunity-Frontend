import { Routes } from '@angular/router';
import { noAuthGuard } from './core/guards/auth.guard';
import { otpGuard } from './core/guards/otp.guard';

export const routes: Routes = [
    // Landing page - accessible to everyone (NO GUARDS)
  {
    path: 'landing',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  // Root redirect to landing
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [noAuthGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/components/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'verify-otp',
        canActivate: [otpGuard],
        loadComponent: () => import('./features/auth/components/otp-verification/otp-verification.component')
          .then(m => m.OtpVerificationComponent)
      },
       {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/components/forgot-password/forgot-password.component')
          .then(m => m.ForgotPasswordComponent)
      },
       {
        path: 'reset-password',
        loadComponent: () => import('./features/auth/components/reset-password/reset-password.component')
          .then(m => m.ResetPasswordComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
    // Catch all - redirect to landing
  {
    path: '**',
    redirectTo: '/landing'
  }
];