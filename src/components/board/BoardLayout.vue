<template>
  <div class="board-layout">
    <div class="board-layout__header">
      <h1>{{ titleName }}</h1>
      <slot name="button"></slot>
    </div>
    <div class="board-layout__content">
      <slot name="content"></slot>
    </div>
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
    border-bottom: 1px solid #cccccc;
  }

  &__content {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
