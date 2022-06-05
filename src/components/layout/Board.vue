<template>
  <div class="board-wrapper">
    <Inventory v-if="currentView === 'inventory'" @view-model="openModelView" />
    <Model v-if="currentView === 'models'" @go-back="backToInventoryView" />
  </div>
</template>

<script>
import Inventory from "../board/Inventory.vue";
import Model from "../board/Model.vue";

export default {
  name: "Board",
  components: { Inventory, Model },
  props: {},
  data() {
    return {
      currentView: "inventory",
    };
  },
  computed: {},
  methods: {
    openModelView(modelName) {
      this.$store.dispatch("setCurrentModel", modelName);
      this.currentView = "models";
    },
    backToInventoryView() {
      this.$store.dispatch("setCurrentModel", "");
      this.currentView = "inventory";
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/base.scss";

.board-wrapper {
  @include flexCenter;
  height: 100%;
  padding: 4.5rem 1.5rem 0.6rem 1.5rem;
  background-color: #e6e6e6;
}
</style>
