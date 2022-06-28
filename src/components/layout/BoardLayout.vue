<template>
  <div class="board-wrapper">
    <div class="board-layout">
      <div class="board-layout__header">
        <h2>{{ titleName }}</h2>
        <slot name="button"></slot>
      </div>
      <div class="board-layout__content">
        <slot name="content"></slot>
      </div>
    </div>
    <slot name="modal"></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BoardLayout",
  components: {},
  props: {
    titleName: String,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["modelInventory", "currentUser"]),
  },
  methods: {},
};
</script>

<style lang="scss">
@import "../../assets/base.scss";
@import "../../assets/iconfont.css";

.board-wrapper {
  @include flexCenter;
  height: 100%;
  padding: 4.5rem 1.5rem 0.6rem 1.5rem;
  background-color: $board-background-color;
}

.board-layout {
  @include flexCenter;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 3.5rem 0rem;
  background-color: $borad-content-background-color;

  &__header {
    @include flexSpaceBetween;
    width: 90%;
    padding-bottom: 20px;
    border-bottom: 1px solid $horizontal-line-color;
  }

  &__content {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
