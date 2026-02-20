import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,IconComponent],
   templateUrl: './forgot-password.component.html', 
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  email = signal<string>('');
  isLoading = signal(false);
  error = signal<string | null>(null);
  emailSent = signal(false);
  
  // Resend timer
  resendTimer = signal<number>(60);
  resendDisabled = signal(false);
  private resendInterval: any;

  ngOnDestroy() {
    if (this.resendInterval) {
      clearInterval(this.resendInterval);
    }
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    
    const email = this.forgotPasswordForm.value.email || '';
    this.email.set(email);

    this.authService.sendResetPasswordLink({ email }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.emailSent.set(true);
        this.startResendTimer();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err.error?.message || 'Failed to send reset link. Please try again.');
      }
    });
  }

  resendEmail() {
    if (this.resendDisabled() || !this.email()) return;

    this.isLoading.set(true);
    
    this.authService.sendResetPasswordLink({ email: this.email() }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.startResendTimer();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err.error?.message || 'Failed to resend reset link.');
      }
    });
  }

  startResendTimer() {
    this.resendDisabled.set(true);
    this.resendTimer.set(60);

    this.resendInterval = setInterval(() => {
      if (this.resendTimer() > 0) {
        this.resendTimer.update(t => t - 1);
      } else {
        clearInterval(this.resendInterval);
        this.resendDisabled.set(false);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}