<template>
  <div class="wrapper">
    <img class="wrapper__img" src="../../public/BUMBLE_logo.png" />
    <div class="wrapper__input">
      <input class="wrapper__input__content" placeholder="username" />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="confirm password"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">Register</div>
    <div class="wrapper__register-link" @click="handleLoginClick">Login</div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "Register",
  setup() {
    const router = useRouter();
    const handleLoginClick = () => {
      router.push({ name: "Login" });
    };
    return { handleLoginClick };
  },
};
</script>

<style lang="scss">
@import "../assets/base.scss";

.wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 40%;

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
  &__register-button {
    margin: 2rem 2.5rem 1rem 2.5rem;
    line-height: 3rem;
    background: #0091ff;
    box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.25rem;
    border-radius: 0.25rem;
    color: #fff;
    font-size: 1.25rem;
    text-align: center;
  }
  &__register-link {
    text-align: center;
    font-size: 1rem;
    color: $content-notice-fontcolor;
  }
}
</style>
