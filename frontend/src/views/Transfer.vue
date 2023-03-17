<template>
  <div class="container mx-auto mt-4">
    <div v-if="isAuthenticated">
      <h1 class="title">Transfers</h1>
      <div v-if="loading">
        <h3 class="text-center mt-4">Loading...</h3>
      </div>
      <div v-else class="mt-3">
        <TransferList />
      </div>
    </div>
    <div v-else>
      <p class="text-center mt-2 subtitle">
        Please Login to view your transfers
      </p>
      <LoginUser />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { ActionTypes } from "../store/action";
import TransferList from "../components/TransferList.vue";
import LoginUser from "../components/LoginUser.vue";

export default defineComponent({
  components: { TransferList, LoginUser },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);
    const user = computed(() => store.getters.getUserInfo);
    const isAuthenticated = computed(
      () => store.getters.checkIsUserAuthenticated
    );
    onMounted(() => {
      if (isAuthenticated.value && user.value !== "") {
        store.dispatch(ActionTypes.GetTransferItems, user.value);
      }
    });
    const totalCount = computed(() => store.getters.totalCount);
    return { loading, totalCount, isAuthenticated };
  },
});
</script>
