import {
  Component,
  inject,
  signal,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import {
  IconName,
} from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './otp-verification.component.html',
  styleUrls: ['../../auth.shared.scss'],
})
export class OtpVerificationComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = signal<string>('');
  purpose = signal<'register' | 'login'>('register');
  timer = signal<number>(300); // 5 minutes in seconds
  resendTimer = signal<number>(60); // 1 minute
  message = signal<string>('');
  messageType = signal<'success' | 'error'>('success');
  isLoading = signal(false);
  resendDisabled = signal(true);
  otpDigits = ['', '', '', '', '', ''];

  private timerInterval: any;
  private resendInterval: any;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email.set(params['email'] || '');
      this.purpose.set(params['purpose'] || 'register');

      if (!this.email()) {
        this.router.navigate([
          this.purpose() === 'register' ? '/auth/register' : '/auth/login',
        ]);
        return;
      }

      this.startTimer();
      this.startResendTimer();
    });
  }

  ngAfterViewInit() {
    // Focus first input on init
    setTimeout(() => {
      if (this.otpInputs?.first) {
        this.otpInputs.first.nativeElement.focus();
      }
    }, 100);
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Ensure only one digit
    const digit = value.replace(/\D/g, '').slice(-1);
    this.otpDigits[index] = digit;
    input.value = digit; // Update input value

    if ((event as any).inputType === 'deleteContentBackward ') {
      // Handle backspace from input event
      if (!digit && index > 0) {
        setTimeout(() => {
          this.focusInput(index - 1);
        }, 10);
      }
      return;
    }

    // Auto-move to next input if digit entered
    if (digit && index < 5) {
      setTimeout(() => {
        this.focusInput(index + 1);
      }, 10);
    }

    // Auto-submit if last digit entered
    if (digit && index === 5) {
      setTimeout(() => {
        this.submitIfComplete();
      }, 100);
    }
  }

  onOtpKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    // Allow only numbers and control keys
    if (
      !/^\d$/.test(event.key) &&
      ![
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Tab',
        'Enter',
      ].includes(event.key) &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      event.preventDefault();
      return;
    }

    // Handle arrow keys for navigation
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
    } else if (event.key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      this.focusInput(index + 1);
    }

    // Handle backspace on empty input
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      event.preventDefault();
      this.otpDigits[index - 1] = '';
      this.focusInput(index - 1);
    }

    // Handle enter to submit
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submitIfComplete();
    }
  }

  onOtpFocus(event: FocusEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    input.select(); // Select text when focused
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text') || '';
    const pastedDigits = clipboardData.replace(/\D/g, '').slice(0, 6).split('');

    if (pastedDigits.length === 0) return;

    // Fill OTP digits
    pastedDigits.forEach((digit, i) => {
      if (i < 6) {
        this.otpDigits[i] = digit;
      }
    });

    // Update all input values
    this.updateAllInputValues();

    // Focus appropriate input
    const lastFilledIndex = Math.min(pastedDigits.length - 1, 5);
    setTimeout(() => {
      if (pastedDigits.length === 6) {
        this.submitIfComplete();
      } else {
        this.focusInput(lastFilledIndex + 1);
      }
    }, 10);
  }

  private updateAllInputValues(): void {
    this.otpInputs.forEach((inputRef, index) => {
      if (inputRef && inputRef.nativeElement) {
        inputRef.nativeElement.value = this.otpDigits[index] || '';
      }
    });
  }

  private focusInput(index: number): void {
    setTimeout(() => {
      const input = this.otpInputs?.get(index)?.nativeElement;
      if (input) {
        input.focus();
        input.select(); // Select text for easy replacement
      }
    }, 10);
  }

  private submitIfComplete(): void {
    const otp = this.otpDigits.join('');
    if (otp.length === 6) {
      this.onSubmit();
    }
  }

  purposeDisplayText(): string {
    return this.purpose() === 'register'
      ? 'Complete your registration'
      : 'Complete your login';
  }

  getSubmitButtonText(): string {
    return this.purpose() === 'register'
      ? 'Verify & Complete Registration'
      : 'Verify & Login';
  }

  getResendButtonText(): string {
    return 'Resend Code';
  }

  getCancelButtonText(): string {
    return this.purpose() === 'register'
      ? 'Back to Registration'
      : 'Back to Login';
  }

  getMessageClasses(): string {
    return this.messageType() === 'error'
      ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border-l-4 border-red-400'
      : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-l-4 border-emerald-400';
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timer() > 0) {
        this.timer.update((t) => t - 1);
      } else {
        clearInterval(this.timerInterval);
        this.message.set('OTP has expired. Please request a new one.');
        this.messageType.set('error');
      }
    }, 1000);
  }

  startResendTimer() {
    this.resendDisabled.set(true);
    this.resendTimer.set(60);

    this.resendInterval = setInterval(() => {
      if (this.resendTimer() > 0) {
        this.resendTimer.update((t) => t - 1);
      } else {
        clearInterval(this.resendInterval);
        this.resendDisabled.set(false);
      }
    }, 1000);
  }

  clearTimers() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.resendInterval) {
      clearInterval(this.resendInterval);
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  onSubmit() {
    const otpCode = this.otpDigits.join('');

    if (otpCode.length !== 6) {
      this.message.set('Please enter all 6 digits of the verification code.');
      this.messageType.set('error');
      return;
    }

    this.isLoading.set(true);
    this.message.set('');

    if (this.purpose() === 'register') {
      this.handleRegistrationOtp(otpCode);
    } else {
      this.handleLoginOtp(otpCode);
    }
  }

   /**
   * Handle registration OTP completion
   */
  private handleRegistrationOtp(otpCode: string) {
    const email = this.email();
    
    // Create CompleteRegistrationRequest
    const request = {
      email: email,
      otpCode: otpCode
    };

    this.authService.completeRegistration(request).subscribe({
      next: (authResponse) => {
        if (authResponse?.token) {
          this.message.set('Registration successful! Redirecting to your dashboard...');
          this.messageType.set('success');

          // Auto-redirect handled by AuthService
        } else {
          this.handleError('Registration failed after OTP verification');
        }
      },
      error: (error) => {
        console.error('Registration error:', error);
        const errorMessage =
          error.error?.message ||
          error.error?.errors?.[0] ||
          'Registration failed. Please try again.';
        this.handleError(errorMessage);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  private handleLoginOtp(otpCode: string) {
    const loginDataStr = sessionStorage.getItem('pendingLogin');
    if (!loginDataStr) {
      this.handleError('Login session expired. Please start login again.');
      return;
    }

    const loginData = JSON.parse(loginDataStr);

    if (!loginData.emailOrUserName || !loginData.password) {
      this.handleError('Login data not found. Please start login again.');
      return;
    }

    const credentials = {
      emailOrUserName: loginData.emailOrUserName,
      password: loginData.password,
      otpCode,
    };

    this.authService
      .completeLogin(credentials)
      .subscribe({
        next: (authResponse) => {
          if (authResponse?.token) {
            this.message.set('Login successful! Redirecting...');
            this.messageType.set('success');

            sessionStorage.removeItem('pendingLogin');

            setTimeout(() => {
              const user = this.authService.getCurrentUser();
              if (user) {
                const returnUrl =
                  this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
                this.router.navigateByUrl(returnUrl);
              }
            }, 1500);
          } else {
            this.handleError('Login failed after OTP verification');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          const errorMessage =
            error.error?.message ||
            error.error?.errors?.[0] ||
            'Login failed. Please check your credentials.';
          this.handleError(errorMessage);
        },
      })
      .add(() => {
        this.isLoading.set(false);
      });
  }

  private handleError(errorMessage: string) {
    this.message.set(errorMessage);
    this.messageType.set('error');
    this.isLoading.set(false);

    // Shake OTP inputs on error
    this.shakeOtpInputs();
  }

  private shakeOtpInputs(): void {
    const inputs = this.otpInputs?.toArray() || [];
    inputs.forEach((input) => {
      input.nativeElement.classList.add('shake');
      setTimeout(() => {
        input.nativeElement.classList.remove('shake');
      }, 600);
    });
  }

  resendOtp() {
    if (this.resendDisabled() || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.message.set('');

    let otpObservable;

    if (this.purpose() === 'register') {
      otpObservable = this.authService.resendRegistrationOtp(this.email());
    } else {
      otpObservable = this.authService.sendLoginOtp(this.email());
    }

    otpObservable
      .subscribe({
        next: (result) => {
          if (result?.success) {
            this.message.set(
              'A new verification code has been sent to your email!',
            );
            this.messageType.set('success');

            // Reset timers
            this.timer.set(300);
            this.startTimer();
            this.startResendTimer();

            // Clear OTP fields
            this.otpDigits = ['', '', '', '', '', ''];
            this.updateAllInputValues();

            // Focus first input
            setTimeout(() => {
              this.focusInput(0);
            }, 100);
          } else {
            this.handleError(
              result?.message || 'Failed to resend verification code',
            );
          }
        },
        error: (error) => {
          console.error('Resend OTP error:', error);
          const errorMessage =
            error.error?.message ||
            'Failed to resend verification code. Please try again.';
          this.handleError(errorMessage);
        },
      })
      .add(() => {
        this.isLoading.set(false);
      });
  }

  cancel() {
    if (this.purpose() === 'register') {
      sessionStorage.removeItem('pendingRegistration');
      this.router.navigate(['/auth/register']);
    } else {
      sessionStorage.removeItem('pendingLogin');
      this.router.navigate(['/auth/login']);
    }
  }

  isOtpComplete(): boolean {
    return this.otpDigits.every((digit) => digit !== '');
  }

  // Generate particle positions
  getParticleStyle(index: number): any {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 3 + Math.random() * 3;
    return {
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    };
  }

  // In otp-verification.component.ts, add this method:
  getIconName(name: string): IconName {
    // Define all valid icon names
    const validIcons: IconName[] = [
      'email',
      'lock',
      'user',
      'check',
      'alert',
      'eye',
      'eye-off',
      'arrow-left',
      'zap',
      'users',
      'target',
      'award',
      'plus',
      'upload',
      'x',
      'home',
      'shield',
      'chevron-right',
      'check-circle',
      'at-sign',
    ];

    // Return the name if it's valid, otherwise fallback to 'home'
    return validIcons.includes(name as IconName) ? (name as IconName) : 'home';
  }
}
