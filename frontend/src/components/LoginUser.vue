<template>
  <div class="container mx-auto mt-4">
    <h1 class="title">Enter your login credentials</h1>
    <form @submit.prevent="login">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            v-model="email"
            type="email"
            placeholder="Email"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            v-model="password"
            type="password"
            placeholder="Password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button type="submit" class="button is-success">Login</button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ActionTypes } from "../store/action";

export default defineComponent({
  setup() {
    const state = reactive({
      email: "",
      password: "",
    });

    const store = useStore();
    const router = useRouter();

    const login = async () => {
      if (state.email === "" || state.password === "") return;
      const loginData = {
        email: state.email,
        password: state.password,
      };

      try {
        await store.dispatch(ActionTypes.UserLoginRequest, loginData);
        router.replace({ path: "/" });
      } catch (err) {
        console.log("LOGIN FAILED: " + err.message);
      }
    };

    return { ...toRefs(state), login };
  },
});
</script>
