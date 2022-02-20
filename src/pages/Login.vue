<template>
  <div class="wrapper"></div>
  <div class="toHome" @click="handleNavigation('Home')"></div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const handleNavigation = (text) => {
      router.push({ name: text });
    };
    return { handleNavigation };
  },
};
</script>

<style lang="scss">
.wrapper {
  width: 200px;
  height: 100px;
  background-color: aqua;
}
.toHome {
  width: 200px;
  height: 100px;
  background-color: rgb(0, 255, 55);
}
</style>
