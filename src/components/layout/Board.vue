<template>
  <div class="board-wrapper">
    <div class="board-content">
      <Inventory v-if="currentView === 'inventory'" />
      <Models v-if="currentView === 'models'" />
    </div>
  </div>
</template>

<script>
import Inventory from "../board/Inventory.vue";
import Models from "../board/Models.vue";

export default {
  name: "Board",
  components: { Inventory, Models },
  props: {},
  data() {
    return {
      currentView: "models",
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/base.scss";

.board-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 4.5rem 1.5rem 0.6rem 1.5rem;
  background-color: #e6e6e6;
}

.board-content {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: white;
}

.tables {
  margin-bottom: 0.2rem;
}
</style>
