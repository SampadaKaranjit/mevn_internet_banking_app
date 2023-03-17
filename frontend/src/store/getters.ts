import { GetterTree } from "vuex";
import { State, TransferItem } from "./state";

export type Getters = {
  totalCount(state: State): number;
  getTransferItemById(state: State): (id: string) => TransferItem | undefined;
  getUserInfo(state: State): string;
  checkIsUserAuthenticated(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  totalCount(state: State) {
    return state.items.length;
  },
  getTransferItemById: (state: State) => (id: string) => {
    return state.items.find((transferItem) => transferItem._id === id);
  },

  getUserInfo(state: State) {
    return state.user;
  },

  checkIsUserAuthenticated(state: State) {
    return state.isUserAuthenticated;
  },
};
