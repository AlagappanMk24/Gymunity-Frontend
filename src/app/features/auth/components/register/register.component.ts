import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule, NgIf} from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { GoogleAuthService } from '../../../../core/services/google-auth.service';
import {
  UserRole,
  GoogleAuthRequest,
} from '../../../../core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrls: ['../../auth.shared.scss'],
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('googleSignInButton') googleSignInButton!: ElementRef;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private googleAuthService = inject(GoogleAuthService);

  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._]+$'), // Only letters, numbers, dots, underscores
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      profilePhoto: [null as File | null],
    },
    { validators: this.passwordMatchValidator },
  );

  isLoading = this.authService.isLoading;
  error = signal<string | null>(null);
  googleError = signal<string | null>(null);

  constructor() {
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
          this.authService.navigateByRole(user);
        }
      },
      error: (err) => {
        const errorMessage =
          err.error?.message ||
          err.error?.errors?.[0] ||
          'Google sign-up failed. Please try again.';
        this.googleError.set(errorMessage);
      },
    });
  }

  /**
   * Handle Google sign-in error
   */
  private handleGoogleError(error: any): void {
    console.error('Google Sign-In error:', error);
    this.googleError.set('Failed to sign up with Google. Please try again.');
  }

  // Validator to check if passwords match
  private passwordMatchValidator(
    group: AbstractControl,
  ): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  // register.component.ts - Update onSubmit method
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.error.set(null);
    const formData = new FormData();
    const formValue = this.registerForm.value;

    // Append required fields - EXACT property names as backend expects
    formData.append('FullName', formValue.fullName || '');
    formData.append('UserName', formValue.userName || '');
    formData.append('Email', formValue.email || '');
    formData.append('Password', formValue.password || '');
    formData.append('ConfirmPassword', formValue.confirmPassword || '');
    formData.append('Role', UserRole.Client.toString());

    // Profile photo is REQUIRED (based on backend validation)
    const profilePhoto = this.registerForm.get('profilePhoto')?.value;
    if (profilePhoto instanceof File) {
      formData.append('ProfilePhoto', profilePhoto);
    } else {
      this.error.set('Profile photo is required');
      return;
    }

    // Step 1 : initiateRegistration 
    this.authService.initiateRegistration(formData).subscribe({
      next: (response) => {
        console.log('Registration initiation response:', response);
        // Navigation happens automatically in AuthService
        // User will be redirected to OTP verification page
      },
      error: (err: any) => {
         console.error('Registration initiation error:', err);

        // Extract error message
        let errorMessage = 'Registration failed. Please try again.';

        if (err.error?.message) {
          errorMessage = err.error.message;
        } else if (err.error?.errors) {
          // Handle validation errors
          const errors = err.error.errors;
          errorMessage = Object.values(errors).flat().join(', ');
        } else if (err.status === 0) {
          errorMessage =
            'Cannot connect to server. Please check if backend is running.';
        }

        this.error.set(errorMessage);
      },
    });
  }
   selectedFileName = '';
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.registerForm.get('profilePhoto')?.setValue(file);
    }
  }
}