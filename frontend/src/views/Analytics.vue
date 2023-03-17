<template>
  <div class="container mx-auto mt-4">
    <h1 class="title">User behaviour Analytics</h1>

    <p class="subtitle mt-2" v-if="isAuthenticated">
      You can currently view the mouse movements and key pressed details in the
      browser console or in local storage!
    </p>

    <div class="buttons" v-if="isAuthenticated">
      <button class="button" @click="stopAnalytics">Stop Analytics</button>
    </div>
    <div v-else>
      <p class="text-center mt-2">Please Login to continue</p>
      <button class="button is-success mt-3" @click="openLogin">Login</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import userBehaviourAnalytics from "../utils/userBehaviourAnalytics.js";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const stopAnalytics = () => {
      userBehaviourAnalytics.stop();
    };

    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(
      () => store.getters.checkIsUserAuthenticated
    );

    const openLogin = () => {
      router.push("/login");
    };

    return {
      stopAnalytics,
      isAuthenticated,
      openLogin,
    };
  },
});
</script>
