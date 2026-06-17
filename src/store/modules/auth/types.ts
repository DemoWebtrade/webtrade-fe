export type AuthState = {
  isLogin: boolean;

  user: User | null;
  token: string | null;
  registerData: Partial<RegisterPayload> | null;
  profile: Profile | null;

  typeUpdateProfile: string | null;

  beneficiaries: Beneficiari[] | null;

  isOpenAddAccountBen: boolean;

  loading: {
    login: boolean;
    register: boolean;
    profile: boolean;
    updateProfile: boolean;
    beneficiaries: boolean;
  };

  error: {
    login: string | null;
    register: string | null;
    profile: string | null;
    updateProfile: string | null;
    beneficiaries: string | null;
  };
};

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type RegisterPayload = {
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
  dateOfBirth?: string;
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
  beneficiaries: Beneficiari[] | [];
};

export type UpdateProfilePayload = {
  email?: string;
  phone?: string;
  address?: string;
};

export type Beneficiari = {
  id: string;
  bankName: string;
  bankBranch?: string;
  accountNumber: string;
  accountHolder: string;
  isDefault: boolean;
};
