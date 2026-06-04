export type AuthState = {
  user: User | null;
  token: string | null;

  loading: {
    login: boolean;
  };

  error: {
    login: string | null;
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
