import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { GoogleAuthService } from '../../../../core/services/google-auth.service';
import {
  LoginRequest,
  GoogleAuthRequest,
  UserRole,
} from '../../../../core/models/auth.model';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleSignInButton') googleSignInButton!: ElementRef;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private googleAuthService = inject(GoogleAuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isLoading = this.authService.isLoading;
  error = signal<string | null>(null);
  googleError = signal<string | null>(null);
  private returnUrl: string = '/dashboard';

  constructor() {
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.initializeGoogleAuth();
  }

  /**
   * Initialize Google Authentication
   * Load Google Sign-In library on component creation
   */
  private initializeGoogleAuth(): void {
    this.googleAuthService.initialize().catch((err) => {
      console.error('Failed to initialize Google Auth:', err);
    });
  }

  /**
   * After view initialization, render Google Sign-In button
   * This runs after component template is rendered
   */
  ngAfterViewInit(): void {
    if (this.googleSignInButton?.nativeElement) {
      this.googleAuthService.initializeButton(
        this.googleSignInButton.nativeElement.id || 'google-signin-button',
        (response) => this.handleGoogleSuccess(response),
        (error) => this.handleGoogleError(error),
      );
    }
  }

  /**
   * Handle successful Google sign-in
   * Send ID token to backend for authentication
   */
  private handleGoogleSuccess(response: any): void {
    this.googleError.set(null);
    const idToken = response.credential;

    // Create Google Auth Request with default role as Client
    const googleAuthRequest: GoogleAuthRequest = {
      idToken,
      role: UserRole.Client, // Default to Client (1)
    };

    // Send to backend
    this.authService.googleAuth(googleAuthRequest).subscribe({
      next: (authResponse) => {
        // Navigate based on user role
        const user = this.authService.getCurrentUser();
        if (user) {
          this.authService.navigateByRole(user, this.returnUrl);
        }
      },
      error: (err) => {
        const errorMessage =
          err.error?.message ||
          err.error?.errors?.[0] ||
          'Google sign-in failed. Please try again.';
        this.googleError.set(errorMessage);
      },
    });
  }

  /**
   * Handle Google sign-in error
   */
  private handleGoogleError(error: any): void {
    console.error('Google Sign-In error:', error);
    this.googleError.set('Failed to sign in with Google. Please try again.');
  }

  // onSubmit() {
  //   if (this.loginForm.invalid) {
  //     this.loginForm.markAllAsTouched();
  //     return;
  //   }

  //   this.error.set(null);
  //   const formValue = this.loginForm.value as { email: string; password: string };
  //   const credentials: LoginRequest = {
  //     emailOrUserName: formValue.email,
  //     password: formValue.password
  //   };

  //   this.authService.login(credentials).subscribe({
  //     next: () => {
  //       // Navigate based on user role
  //       const user = this.authService.getCurrentUser();
  //       if (user) {
  //         console.log('User logged in:', { id: user.id, role: user.role, userName: user.userName });
  //         this.authService.navigateByRole(user, this.returnUrl);
  //       } else {
  //         console.error('User not found after login');
  //       }
  //     },
  //     error: (err: any) => {
  //       const errorMessage = err.error?.message || err.error?.errors?.[0] || 'Login failed. Please try again.';
  //       this.error.set(errorMessage);
  //     }
  //   });
  // }

  // login.component.ts - Update onSubmit method
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.error.set(null);
    const formValue = this.loginForm.value as {
      email: string;
      password: string;
    };

    const credentials: LoginRequest = {
      emailOrUserName: formValue.email,
      password: formValue.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.requiresOtp) {
          // OTP required - user will be redirected to OTP verification
          console.log('OTP sent for login verification');
        } else if (response.token) {
          // Login successful without OTP (shouldn't happen with mandatory OTP)
          console.log('Login successful');
          const user = this.authService.getCurrentUser();
          if (user) {
            this.authService.navigateByRole(user, this.returnUrl);
          }
        }
      },
      error: (err: any) => {
        const errorMessage =
          err.error?.message ||
          err.error?.errors?.[0] ||
          'Login failed. Please try again.';
        this.error.set(errorMessage);
      },
    });
  }
}