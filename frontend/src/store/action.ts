import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State, TransferItem, UserInfo } from "./state";
import axios, { AxiosError } from "axios";

export enum ActionTypes {
  GetTransferItems = "GET_TRANSFER_ITEMS",
  CreateTransferItem = "CREATE_TRANSFER_ITEM",
  SetCreateModal = "SET_CREATE_MODAL",
  UserLoginRequest = "USER_LOGIN_REQUEST",
  LogOutUser = "LOG_OUT_USER",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    Key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.GetTransferItems](
    context: ActionAugments,
    payload: string
  ): void;
  [ActionTypes.SetCreateModal](context: ActionAugments, payload: boolean): void;
  [ActionTypes.CreateTransferItem](
    context: ActionAugments,
    payload: TransferItem
  ): void;
  [ActionTypes.UserLoginRequest](
    context: ActionAugments,
    payload: UserInfo
  ): void;
  [ActionTypes.LogOutUser](context: ActionAugments, payload: boolean): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTransferItems]({ commit }, payload) {
    commit(MutationType.SetLoading, true);

    const userToken = JSON.parse(payload).token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get("/api/transfers", config);
      commit(MutationType.SetLoading, false);
      commit(MutationType.SetTransferItems, data.transfers);
    } catch (err) {
      const error = err as Error | AxiosError;
      commit(MutationType.SetLoading, false);
      console.log("GET TRANSFER ERROR: " + error.message);
    }
  },
  async [ActionTypes.SetCreateModal]({ commit }, payload: boolean) {
    commit(MutationType.SetCreateModal, payload);
  },
  async [ActionTypes.LogOutUser]({ commit }, payload: boolean) {
    commit(MutationType.LogOutUser, payload);
  },
  async [ActionTypes.CreateTransferItem]({ commit }, payload: TransferItem) {
    const userToken = JSON.parse(payload.user).token;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post("/api/transfers", payload, config);
      commit(MutationType.CreateTransferItemSuccess, data);
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        commit(MutationType.CreateTransferItemFailure, error.message);
      } else {
        commit(MutationType.CreateTransferItemFailure, "Native Error");
      }
    }
  },

  async [ActionTypes.UserLoginRequest]({ commit }, payload: UserInfo) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/users/login", payload, config);
      const responseData = JSON.stringify(data);
      commit(MutationType.UserLoginSuccess, responseData);
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        commit(MutationType.UserLoginFailure, error.message);
      } else {
        commit(MutationType.UserLoginFailure, "Native error");
      }
    }
  },
};
