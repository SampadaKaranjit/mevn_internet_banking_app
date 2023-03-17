import { MutationTree } from "vuex";
import { State, TransferItem } from "./state";

export enum MutationType {
  CreateTransferItemSuccess = "CREATE_TRANSFER_ITEM_SUCCESS",
  CreateTransferItemFailure = "CREATE_TRANSFER_ITEM_FAILURE",
  SetTransferItems = "SET_TRANSFER_ITEMS",
  SetLoading = "SET_LOADING",
  SetCreateModal = "SET_CREATE_MODAL",
  SetTranferItemModal = "SET_TRANSFER_ITEM_MODAL",
  UserLoginSuccess = "USER_LOGIN_SUCCESS",
  UserLoginFailure = "USER_LOGIN_FAILURE",
  LogOutUser = "LOG_OUT_USER",
}

export type Mutations<S = State> = {
  [MutationType.CreateTransferItemSuccess](state: S, item: TransferItem): void;
  [MutationType.CreateTransferItemFailure](state: S, value: string): void;
  [MutationType.SetTransferItems](state: S, items: TransferItem[]): void;

  [MutationType.SetLoading](state: S, value: boolean): void;
  [MutationType.SetCreateModal](state: S, value: boolean): void;
  [MutationType.LogOutUser](state: S, value: boolean): void;

  [MutationType.SetTranferItemModal](
    state: S,
    value: { showModal: boolean; transferItemId: string | undefined }
  ): void;
  [MutationType.UserLoginSuccess](state: S, value: string): void;
  [MutationType.UserLoginFailure](state: S, value: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.CreateTransferItemSuccess](state: State, item: TransferItem) {
    state.items.unshift(item);
  },
  [MutationType.CreateTransferItemFailure](state: State, value: string) {
    console.log("CREATE TRANSFER ERROR: " + value);
  },
  [MutationType.SetTransferItems](state: State, items: []) {
    state.items = items;
  },
  [MutationType.SetLoading](state: State, value: boolean) {
    state.loading = value;
  },
  [MutationType.SetCreateModal](state: State, value: boolean) {
    state.showCreateModal = value;
  },
  [MutationType.LogOutUser](state: State, value: boolean) {
    state.isUserAuthenticated = value;
    state.user = "";
  },

  [MutationType.SetTranferItemModal](
    state: State,
    { showModal, transferItemId }
  ) {
    state.showTransferItemModal = showModal;
    state.showTransferItemId = transferItemId;
  },

  [MutationType.UserLoginSuccess](state: State, value: string) {
    state.user = value;
    state.isUserAuthenticated = true;
    state.loginErrorMessage = "";
  },
  [MutationType.UserLoginFailure](state: State, value: string) {
    console.log("LOGIN ERROR: " + value);
    state.user = "";
    state.isUserAuthenticated = false;
    state.loginErrorMessage = value;
  },
};
