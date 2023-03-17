<template>
  <div>
    <table class="table is-striped is-hoverable is-full-width">
      <thead>
        <tr>
          <th>Receiver Name</th>
          <th>Receiver IBAN</th>
          <th>Amount (EUR)</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-if="items && items.length > 0">
        <tr v-for="item in items" :key="item._id">
          <TransferListItem v-bind="item" />
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          No transfers yet made!
        </tr>
      </tbody>
      <tfoot>
        <CreateTransfer v-show="showCreateModal"></CreateTransfer>
        <div class="field mt-5">
          <p class="control">
            <button class="button is-success" @click="setModal">
              New Transfer
            </button>
          </p>
        </div>
      </tfoot>
    </table>
    <TransferItem
      v-if="showTransferItemModal"
      :_id="showTransferItemId"
    ></TransferItem>
  </div>
</template>

<script lang="ts">
import CreateTransfer from "./CreateTransfer.vue";
import TransferListItem from "./TransferListItem.vue";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { MutationType } from "../store/mutations";
import TransferItem from "./TransferItem.vue";

export default defineComponent({
  components: {
    CreateTransfer,
    TransferListItem,
    TransferItem,
  },
  setup() {
    const store = useStore();
    const setModal = () => {
      store.dispatch(MutationType.SetCreateModal, true);
    };
    const showCreateModal = computed(() => store.state.showCreateModal);

    const showTransferItemModal = computed(
      () => store.state.showTransferItemModal
    );
    const showTransferItemId = computed(() => store.state.showTransferItemId);

    const items = computed(() => store.state.items);

    return {
      showCreateModal,
      setModal,
      items,
      showTransferItemModal,
      showTransferItemId,
    };
  },
});
</script>
