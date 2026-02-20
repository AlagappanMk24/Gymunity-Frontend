/**
 * User authentication and profile models
 * Aligns with Gymunity Backend API specification
 */

export interface User {
  id: string;
  name: string;
  userName: string;
  email: string;
  role: UserRole;
  profilePhotoUrl?: string;
  createdAt?: Date;
}

export interface LoginRequest {
  emailOrUserName: string;
  password: string;
  otpCode?: string;
}

export interface RegisterRequest {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole; // assign to client by default 1 = Client
  profilePhoto?: File;
}
export interface InitiateRegistrationResponse {
  success: boolean;
  message: string;
  otpExpiresAt?: string;
  email: string;
}
export interface CompleteRegistrationRequest {
  email: string;
  otpCode: string;
}
export interface GoogleAuthRequest {
  idToken: string;
  role: UserRole; // 1 = Client, 2 = Trainer
}

export interface AuthResponse {
  id: string;
  name: string;
  userName: string;
  email: string;
  role: UserRole;
  profilePhotoUrl?: string;
  token: string;

  // OTP properties
  requiresOtp: boolean;
  message?: string;
  otpExpiresAt?: string;
  isAccountActive: boolean;
}

export interface OtpRequest {
  email: string;
  otpCode: string;
  purpose: 'register' | 'login' | 'reset-password' | 'change-email';
}

export interface SendOtpRequest {
  email: string;
  purpose: 'register' | 'login' | 'reset-password' | 'change-email';
}

export interface VerifyOtpRequest {
  email: string;
  otpCode: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
  expiresAt?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  userName?: string;
  email?: string;
  profilePhoto?: File;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SendResetPasswordLinkRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export enum UserRole {
  Client = 1,  // Must be 1 (byte value for Client)
  Trainer = 2  // Must be 2 (byte value for Trainer)
}
