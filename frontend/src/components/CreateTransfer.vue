<template>
  <div class="container">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <form @submit.prevent="createTransfer">
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">New Transfer</p>
            </header>
          </div>
          <section class="modal-card-body">
            <div class="field">
              <label class="label">Receiver Name</label>
              <div class="control">
                <input
                  v-model="receiverName"
                  class="input"
                  type="text"
                  placeholder="Enter Receiver Name"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Receiver IBAN</label>
              <div class="control">
                <input
                  v-model="receiverIBAN"
                  class="input"
                  type="text"
                  placeholder="Enter Receivers IBAN"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Amount</label>
              <div class="field has-addons">
                <p class="control">
                  <input
                    class="input"
                    v-model="amount"
                    type="number"
                    placeholder="Enter Amount"
                  />
                </p>
                <p class="control">
                  <a class="button is-static"> EUR </a>
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label">Transaction Fee</label>
              <div class="field has-addons">
                <p class="control">
                  <input
                    class="input"
                    v-model="transactionFee"
                    type="number"
                    placeholder="Enter Transaction Fee"
                  />
                </p>
                <p class="control">
                  <a class="button is-static"> EUR </a>
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label">Transaction Type</label>
              <div class="control">
                <input
                  v-model="transactionType"
                  class="input"
                  type="text"
                  placeholder="Enter transaction type"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Note</label>
              <div class="control">
                <input
                  v-model="note"
                  class="input"
                  type="text"
                  placeholder="Add a note"
                />
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button type="submit" class="button is-success">Transfer</button>
            <button class="button" @click="closeModal">Cancel</button>
          </footer>
        </form>
      </div>
      <button
        class="modal-close is-large"
        @click="closeModal"
        aria-label="close"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { TransferItem } from "../store/state";
import { MutationType } from "../store/mutations";
import { ActionTypes } from "../store/action";

export default {
  name: "CreateTransfer",
  setup() {
    const state = reactive({
      receiverName: "",
      receiverIBAN: "",
      amount: 0,
      transactionFee: 0,
      transactionType: "",
      note: "",
    });

    const store = useStore();
    const createTransfer = () => {
      if (
        state.receiverName === "" ||
        state.receiverIBAN === "" ||
        state.amount === 0
      )
        return;

      const user = computed(() => store.getters.getUserInfo);
      const checkUserAuthentication = computed(
        () => store.getters.checkIsUserAuthenticated
      );

      const transfer: TransferItem = {
        user: user.value,
        receiverName: state.receiverName,
        receiverIBAN: state.receiverIBAN,
        amount: state.amount,
        transactionFee: state.transactionFee,
        transactionType: state.transactionType,
        note: state.note,
        _id: "",
        createdAt: "",
        updatedAt: "",
      };

      if (checkUserAuthentication.value) {
        store.dispatch(ActionTypes.CreateTransferItem, transfer);
      } else {
        store.dispatch(
          MutationType.CreateTransferItemFailure,
          "User is not authenticated or not logged in"
        );
      }

      store.dispatch(MutationType.SetCreateModal, false);

      state.receiverName = "";
      state.receiverIBAN = "";
      state.amount = 0;
      state.transactionFee = 0;
      state.transactionType = "";
      state.note = "";
    };
    const closeModal = () => {
      store.dispatch(MutationType.SetCreateModal, false);
    };

    return {
      closeModal,
      ...toRefs(state),
      createTransfer,
    };
  },
};
</script>
