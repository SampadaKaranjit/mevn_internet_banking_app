<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Details</p>
        </header>
      </div>
      <section class="modal-card-body">
        <p class="subtitle is-6">
          <b> Receiver Name:</b> {{ transferItem?.receiverName }}
        </p>
        <p class="subtitle is-6">
          <b> Receiver IBAN:</b> {{ transferItem?.receiverIBAN }}
        </p>
        <p class="subtitle is-6"><b> Amount:</b> {{ formattedAmount }} EUR</p>
        <p class="subtitle is-6">
          <b> Created At:</b> {{ transferItem?.createdAt }}
        </p>
        <p class="subtitle is-6">
          <b> Updated At:</b> {{ transferItem?.updatedAt }}
        </p>
        <p class="subtitle is-6" v-if="transferItem?.transactionType">
          <b> Transation Type</b> {{ transferItem?.transactionType }}
        </p>
        <p class="subtitle is-6">
          <b> Transation Fee:</b> {{ transferItem?.transactionFee }}
        </p>
        <p class="subtitle is-6" v-if="transferItem?.note">
          <b> Note:</b> {{ transferItem?.note }}
        </p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="closeModal">Close</button>
      </footer>
    </div>
    <button
      class="modal-close is-large"
      @click="closeModal"
      aria-label="close"
    ></button>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { MutationType } from "../store/mutations";

export default {
  name: "TransferItem",
  props: {
    _id: { type: String, required: true },
  },
  setup(props: any) {
    const store = useStore();

    const transferItem = computed(() =>
      store.getters.getTransferItemById(props._id)
    );

    const formatter = new Intl.NumberFormat("eu-EU", {
      style: "currency",
      currency: "EUR",
    });

    const formattedAmount = formatter.format(transferItem.value?.amount);

    const closeModal = () => {
      store.commit(MutationType.SetTranferItemModal, {
        showModal: false,
        transferItemId: undefined,
      });
    };

    return { closeModal, transferItem, formattedAmount };
  },
};
</script>
