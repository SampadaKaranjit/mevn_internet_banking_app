<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarInternetBanking"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarInternetBanking" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link
            to="/transfers"
            v-if="isAuthenticated"
            class="navbar-item"
            >Transfers</router-link
          >
          <router-link
            to="/analytics"
            v-if="isAuthenticated"
            class="navbar-item"
            >Analytics</router-link
          >
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
@import "~bulma/css/bulma.css";
</style>

<script>
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import userBehaviourAnalytics from "./utils/userBehaviourAnalytics.js";

export default defineComponent({
  setup() {
    const store = useStore();
    const isAuthenticated = computed(
      () => store.getters.checkIsUserAuthenticated
    );

    onMounted(() => {
      userBehaviourAnalytics.start();
    });

    return { isAuthenticated };
  },
});
</script>
