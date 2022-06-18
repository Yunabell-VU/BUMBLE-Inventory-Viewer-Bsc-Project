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
import { mapGetters } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "NavigatorMenu",
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
      return primaryPath === this.menuName.toLowerCase();
    },
    switchMainView() {
      this.router.push({ name: this.menuName });
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
  padding-left: 15%;
  width: 100%;
  height: 45px;
  color: #f2f2f2;

  &:hover {
    cursor: pointer;
    background-color: lighten(#262626, 10%);
    color: #f2f2f2;
  }

  &--active {
    background-color: #e9cb7c;
    color: #262626;

    &:hover {
      cursor: pointer;
      background-color: #e9cb7c;
      color: #262626;
    }
  }

  .iconfont {
    font-size: 1.2rem;
  }

  &__icon {
    margin-right: 10px;
    font-weight: bold;
  }

  &__text {
    @include flexCenter;
    font-weight: bold;
  }
}
</style>
