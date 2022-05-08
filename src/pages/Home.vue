<template>
  <div class="layout-wrapper">
    <div class="layout-left"><Navigator /></div>
    <div class="layout-right">
      <Header />
      <Board />
    </div>
  </div>
</template>

<script>
import Header from "../components/layout/Header.vue";
import Navigator from "../components/layout/Navigator.vue";
import Board from "../components/layout/Board.vue";

export default {
  name: "Home",
  components: { Header, Navigator, Board },

  async mounted() {
    await this.$store.dispatch("initModelInventory");
  },
};
</script>

<style lang="scss">
@import "../assets/base.scss";

.layout-wrapper {
  display: flex;
}

.layout-left {
  width: 8vw;
  height: 100vh;
}

.layout-right {
  width: 92vw;
  height: 100vh;
}
</style>
