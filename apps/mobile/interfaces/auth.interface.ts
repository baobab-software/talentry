interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface VerifyOTPRequest {
  email: string;
  otp: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

interface ForgotPasswordResponse {
  status: string;
  statusCode: number;
  data: {
    message: string;
  };
  timestamp: Date;
}

interface VerifyOTPResponse {
  status: string;
  statusCode: number;
  data: {
    token?: string;
    message: string;
  };
  timestamp: Date;
}

interface RegisterResponse {
  status: string;
  statusCode: number;
  data: {
    message: string;
  };
  timestamp: Date;
}

interface LoginResponse {
  status: string;
  statusCode: number;
  data: {
    message?: string;
    token?: string;
    user?: {
      id: string;
      email: string;
      name: string;
    };
  };
  timestamp: Date;
}

interface ResetPasswordResponse {
  status: string;
  statusCode: number;
  data: {
    message: string;
  };
  timestamp: Date;
}

interface MessageResponse {
  message: string;
}

export {
  RegisterRequest,
  AuthResponse,
  LoginRequest,
  ForgotPasswordRequest,
  VerifyOTPRequest,
  ResetPasswordRequest,
  ForgotPasswordResponse,
  VerifyOTPResponse,
  RegisterResponse,
  LoginResponse,
  ResetPasswordResponse,
  MessageResponse,
};
