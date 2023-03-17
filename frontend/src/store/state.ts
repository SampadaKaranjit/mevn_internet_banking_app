export type TransferItem = {
  _id: string;
  user: string;
  receiverName: string;
  receiverIBAN: string;
  amount: number;
  transactionFee: number;
  transactionType: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

export type UserInfo = {
  email: string;
  password: string;
};

export type ValidationError = {
  message: string;
  errors: Record<string, string[]>;
};

export type State = {
  loading: boolean;
  items: TransferItem[];
  showCreateModal: boolean;
  showTransferItemModal: boolean;
  showTransferItemId: string | undefined;
  user: string;
  isUserAuthenticated: boolean;
  loginErrorMessage: string | undefined;
};

export type SortItems = {
  sort_by: string;
  sort_ascending: boolean;
  items: TransferItem[];
};

export const state: State = {
  user: "",
  loading: false,
  items: [],
  showCreateModal: false,
  showTransferItemModal: false,
  showTransferItemId: undefined,
  isUserAuthenticated: false,
  loginErrorMessage: undefined,
};
