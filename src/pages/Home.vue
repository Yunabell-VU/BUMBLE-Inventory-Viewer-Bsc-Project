<template>
  <div class="layout-top"><Header /></div>
  <div class="layout-bottom">
    <Navigator />
    <Board />
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
</style>
