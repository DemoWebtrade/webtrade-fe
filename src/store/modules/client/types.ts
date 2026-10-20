export type ClientState = {
  profile: Profile | null;

  typeUpdateProfile: string | null;

  beneficiaries: Beneficiari[] | null;

  isOpenAddAccountBen: boolean;

  isOpenProfile: boolean;

  loading: {
    profile: boolean;
    updateProfile: boolean;
    beneficiaries: boolean;
    addAccountBen: boolean;
    defaultBen: boolean;
    deleteBen: boolean;
  };

  error: {
    profile: string | null;
    updateProfile: string | null;
    beneficiaries: string | null;
    addAccountBen: string | null;
    defaultBen: string | null;
    deleteBen: string | null;
  };
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
  otp: string;
};

export type Beneficiari = {
  accountHolder: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
  createdAt: string;
  fullName: string;
  isDefault: false;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
};

export type AddBenAccountPayload = {
  bankName: string | null;
  bankCode: string;
  fullName: string;
  accountNumber: string;
  accountHolder: string | null;
};
