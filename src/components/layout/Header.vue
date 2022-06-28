<template>
  <div class="header-wrapper">
    <div class="path-block"></div>
    <div class="user-block">
      <div class="user-block__avatar">{{ initial }}</div>
      <div class="user-block__name">{{ currentUser.name }}</div>
      <span class="iconfont"></span>
      <!-- <span class="iconfont">&#xe8ec;</span> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  props: {},
  data() {
    return {
      initial: "",
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {},
  mounted() {
    if (this.currentUser.id === null) {
      this.$store.dispatch("setCurrentUser");
    }

    const username = this.currentUser.name;
    this.initial = username[0].toUpperCase();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/base.scss";
@import "../../assets/iconfont.css";

.header-wrapper {
  @include flexSpaceBetween;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  padding: 0 1.5rem;
  background-color: $header-background-color;
}

.path-block {
  width: 20%;
  height: 100%;
}

.user-block {
  @include flexSpaceBetween;
  width: 8%;
  height: 100%;

  &__avatar {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: $avatar-background-color;
    border: 1px solid $theme-color;
    font-size: 1.5rem;
    font-weight: bold;
    color: $theme-font-color;
  }

  &__name {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>
