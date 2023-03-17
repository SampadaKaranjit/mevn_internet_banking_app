<template>
  <div class="container mx-auto mt-4">
    <h1 class="title">Welcome to your Internet Banking</h1>
    <div v-if="isAuthenticated">
      <p class="subtitle">You are Logged In</p>
      <button class="button" @click="logout">Logout</button>
    </div>
    <div v-else>
      <p class="help is-danger" v-if="loginError">{{ loginError }}</p>
      <button class="button is-success mt-3" @click="openLogin">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ActionTypes } from "../store/action";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(
      () => store.getters.checkIsUserAuthenticated
    );

    const openLogin = () => {
      router.push("/login");
    };

    const logout = async () => {
      await store.dispatch(ActionTypes.LogOutUser, false);
      router.push("/login");
    };

    const loginError = computed(() =>
      store.state.loginErrorMessage != undefined
        ? store.state.loginErrorMessage +
          " Please login with valid credentials!"
        : undefined
    );

    return { isAuthenticated, openLogin, logout, loginError };
  },
});
</script>
