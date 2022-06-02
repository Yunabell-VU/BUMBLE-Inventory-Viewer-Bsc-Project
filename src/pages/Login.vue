<template>
  <div class="login-wrapper">
    <img class="login-wrapper__img" src="../../BUMBLE_logo.png" />
    <div class="login-wrapper__input">
      <input
        class="login-wrapper__input__content"
        placeholder="username"
        v-model="username"
      />
    </div>
    <div class="login-wrapper__input">
      <input
        class="login-wrapper__input__content"
        type="password"
        placeholder="password"
        v-model="password"
      />
    </div>
    <div class="login-wrapper__login-button" @click="handleLogin">Login</div>
    <div class="login-wrapper__login-link" @click="handleRegisterClick">
      Register
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      router: useRouter(),
    };
  },
  computed: {
    ...mapGetters(["users"]),
  },
  mounted() {},
  methods: {
    handleLogin() {
      try {
        const currentUser = this.users.filter(
          (user) => user.name === this.username
        );

        if (currentUser.length === 0) {
          alert("username does not exist");
        } else if (currentUser[0].password !== this.password) {
          alert("wrong password");
        } else {
          localStorage.isLogin = true;
          localStorage.userID = currentUser[0].id;
          this.router.push({ name: "Home" });
        }
      } catch (e) {
        console.log(e);
      }
    },
    handleRegisterClick() {
      this.router.push({ name: "Register" });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/base.scss";

.login-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 400px;

  @media only screen and (max-width: 769px) {
    width: 100%;
  }

  &__img {
    display: block;
    margin: 5rem auto 2.5rem auto;
    width: 4rem;
    height: 4rem;
  }
  &__input {
    height: 3rem;
    margin: 0 2.5rem 1rem 2.5rem;
    padding: 0 1rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    border-radius: 6px;
    &__content {
      line-height: 3rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: 1rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__login-button {
    margin: 2rem 2.5rem 1rem 2.5rem;
    line-height: 3rem;
    background: rgb(38, 38, 38);
    box-shadow: 0 0.25rem 0.5rem 0 rgba(38, 38, 38, 0.32);
    border-radius: 0.25rem;
    border-radius: 0.25rem;
    color: #fff;
    font-size: 1.25rem;
    text-align: center;
  }
  &__login-link {
    text-align: center;
    font-size: 1rem;
    color: $content-notice-fontcolor;
  }
}
</style>
