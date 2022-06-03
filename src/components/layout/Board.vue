<template>
  <div class="board-wrapper">
    <div class="board-layout">
      <div class="board-layout__header">
        <h1>{{ headerTitle }}</h1>
        <div class="board-layout__header__create-button">+ New</div>
      </div>
      <div class="board-layout__content">
        <Inventory v-if="currentView === 'inventory'" />
        <Models v-if="currentView === 'models'" />
      </div>
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
      currentView: "inventory",
    };
  },
  computed: {
    headerTitle() {
      if (this.currentView === "inventory") {
        return "Model Inventory";
      }
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

.board-layout {
  @include flexCenter;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 3.5rem 0rem;
  background-color: white;

  &__header {
    @include flexSpaceBetween;
    width: 90%;
    padding-bottom: 20px;

    &__create-button {
      @include flexCenter;
      width: 105px;
      height: 45px;
      background-color: #239d4e;
      color: white;
      font-size: 1.3rem;
      font-weight: bold;

      &:hover {
        background-color: darken(#239d4e, 10%);
      }
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}

.tables {
  margin-bottom: 0.2rem;
}
</style>
