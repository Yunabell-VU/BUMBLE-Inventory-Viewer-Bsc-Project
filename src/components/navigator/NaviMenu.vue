<template>
  <div
    :class="{
      'navi-menus__menu-block--active': isPathHasMenuName(),
    }"
    class="navi-menus__menu-block"
    @click="switchMainView"
  >
    <span class="iconfont navi-menus__menu-block__icon">{{ icon }}</span>
    <span class="navi-menus__menu-block__text">{{ menuName }}</span>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "NaviMenu",
  props: {
    icon: String,
    menuName: String,
  },
  data() {
    return {
      router: useRouter(),
    };
  },
  computed: {},
  methods: {
    isPathHasMenuName() {
      const path = this.$route.fullPath;
      const primaryPath = path.split("/")[1];
      return primaryPath === this.menuName.replace(/\s*/g, "").toLowerCase();
    },
    switchMainView() {
      this.router.push({ name: this.menuName.replace(/\s*/g, "") });
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/base.scss";
@import "../../assets/iconfont.css";

.navi-menus__menu-block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10%;
  width: 100%;
  height: 45px;
  color: $theme-font-color;

  &:hover {
    cursor: pointer;
    background-color: lighten($theme-color, 10%);
    color: $theme-font-color;
  }

  &--active {
    background-color: $secondary-theme-color;
    color: $theme-color;

    &:hover {
      cursor: pointer;
      background-color: $secondary-theme-color;
      color: $theme-color;
    }
  }

  .iconfont {
    font-size: 1rem;
  }

  &__icon {
    margin-right: 10px;
    font-weight: 600;
  }

  &__text {
    @include flexCenter;
    font-weight: 600;
  }
}
</style>
