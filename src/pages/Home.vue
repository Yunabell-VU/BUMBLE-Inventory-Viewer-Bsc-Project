<template>
  <div class="layout-wrapper">
    <div class="layout-left"><Navigator /></div>
    <div class="layout-right">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "../components/layout/Header.vue";
import Navigator from "../components/layout/Navigator.vue";
import Models from "../components/board/Models.vue";

export default {
  name: "Home",
  components: { Header, Navigator, Models },
  mounted() {
    this.$store.dispatch("setCurrentUser");
  },
};
</script>

<style lang="scss">
@import "../assets/base.scss";

.layout-wrapper {
  display: flex;
}

.layout-left {
  width: 10vw;
  height: 100vh;
}

.layout-right {
  position: relative;
  width: 90vw;
  height: 100vh;
}
</style>
