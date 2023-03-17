<template>
  <td>{{ receiverName }}</td>
  <td>{{ receiverIBAN }}</td>
  <td class="has-text-right">{{ formattedAmount }}</td>
  <td>{{ createdAt }}</td>
  <td>
    <button class="button" title="View Details" @click="viewTransferDetails()">
      <span class="icon is-small">
        <i class="fas fa-eye"></i>
      </span>
    </button>
  </td>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { MutationType } from "../store/mutations";

export default defineComponent({
  props: {
    _id: { type: String, required: true },
    receiverName: { type: String, required: true },
    receiverIBAN: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionFee: { type: Number, required: false },
    transactionType: { type: String, required: false },
    note: { type: String, required: false },
    createdAt: { type: String, required: false },
    updatedAt: { type: String, required: false },
  },

  setup(props) {
    const store = useStore();

    const viewTransferDetails = () => {
      store.commit(MutationType.SetTranferItemModal, {
        showModal: true,
        transferItemId: props._id,
      });
    };

    const formatter = new Intl.NumberFormat("eu-EU", {
      style: "currency",
      currency: "EUR",
    });

    const formattedAmount = formatter.format(props.amount);

    return { viewTransferDetails, formattedAmount };
  },
});
</script>
