export type AuthState = {
  isLogin: boolean;

  user: User | null;
  token: string | null;
  registerData: Partial<RegisterPayload> | null;

  loading: {
    login: boolean;
    register: boolean;
  };

  error: {
    login: string | null;
    register: string | null;
  };
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  password: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  phone: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  balance: number;
  isVerified: boolean;
  createdAt: string;
};
