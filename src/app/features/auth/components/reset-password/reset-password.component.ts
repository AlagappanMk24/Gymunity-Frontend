import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../auth.shared.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  resetPasswordForm = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator },
  );

  email = signal<string>('');
  token = signal<string>('');
  isLoading = signal(false);
  error = signal<string | null>(null);
  tokenInvalid = signal(false);
  passwordReset = signal(false);
  showPassword = signal(false);

  // Password strength signals
  hasMinLength = signal(false);
  hasUpperCase = signal(false);
  hasLowerCase = signal(false);
  hasNumber = signal(false);
  hasSpecialChar = signal(false);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const email = params['email'];

      if (!token || !email) {
        this.tokenInvalid.set(true);
        return;
      }

      this.token.set(token);
      this.email.set(email);

      // Optional: Validate token with backend
      this.validateToken();
    });

    // Watch password changes for strength meter
    this.resetPasswordForm
      .get('newPassword')
      ?.valueChanges.subscribe((password) => {
        this.updatePasswordStrength(password || '');
      });
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  validateToken() {
    // Optional: Call backend to validate token before showing form
    // this.authService.validateResetToken(this.token(), this.email()).subscribe({
    //   error: () => this.tokenInvalid.set(true)
    // });
  }

  updatePasswordStrength(password: string) {
    this.hasMinLength.set(password.length >= 8);
    this.hasUpperCase.set(/[A-Z]/.test(password));
    this.hasLowerCase.set(/[a-z]/.test(password));
    this.hasNumber.set(/[0-9]/.test(password));
    this.hasSpecialChar.set(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    );
  }

  getPasswordStrength(): number {
    let strength = 0;
    if (this.hasMinLength()) strength++;
    if (this.hasUpperCase()) strength++;
    if (this.hasLowerCase()) strength++;
    if (this.hasNumber()) strength++;
    if (this.hasSpecialChar()) strength++;
    return strength;
  }

  getPasswordStrengthColor(barNumber: number): string {
    const strength = this.getPasswordStrength();

    if (barNumber <= strength) {
      if (strength <= 2) return 'bg-red-500';
      if (strength <= 3) return 'bg-orange-500';
      if (strength <= 4) return 'bg-yellow-500';
      return 'bg-green-500';
    }
    return 'bg-gray-200';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();

    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  }

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    const request = {
      email: this.email(),
      token: this.token(),
      newPassword: this.resetPasswordForm.value.newPassword || '',
      confirmNewPassword: this.resetPasswordForm.value.confirmPassword || '',
    };
    console.log('Reset Password Request:', request);
    this.authService.resetPassword(request).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.passwordReset.set(true);

        // Auto redirect to login after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      },
      error: (err) => {
        this.isLoading.set(false);

        if (
          err.status === 400 &&
          err.error?.message?.includes('invalid or expired')
        ) {
          this.tokenInvalid.set(true);
        } else {
          this.error.set(
            err.error?.message || 'Failed to reset password. Please try again.',
          );
        }
      },
    });
  }
}
