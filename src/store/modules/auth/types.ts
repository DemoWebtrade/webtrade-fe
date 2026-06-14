export type AuthState = {
  isLogin: boolean;

  user: User | null;
  token: string | null;
  registerData: Partial<RegisterPayload> | null;
  profile: Profile | null;

  loading: {
    login: boolean;
    register: boolean;
    profile: boolean;
  };

  error: {
    login: string | null;
    register: string | null;
    profile: string | null;
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

export type Profile = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  gender: string;
  balance: number;
  isVerified: false;
  createdAt: string;
  phone?: string;
  nationalId?: string;
  dateOfBirth?: Date;
  address?: string;
  tradingAccounts:
    | [
        {
          id: string;
          accountNumber: string;
          type: string;
          status: string;
          balance: number;
        },
      ]
    | [];
  beneficiaries:
    | [
        {
          id: string;
          bankName: string;
          bankBranch?: string;
          accountNumber: string;
          accountHolder: string;
          isDefault: boolean;
        },
      ]
    | [];
};
