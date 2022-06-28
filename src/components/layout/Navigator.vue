<template>
  <div class="navi-wrapper">
    <div class="navi-logo-wrapper">
      <img src="../../../BUMBLE_logo.png" alt="" />
      <span>BUMBLE</span>
    </div>
    <div class="navi-menus">
      <ul>
        <li>
          <NavigatorMenu :icon="`&#xe709;`" :menuName="`Inventory`" />
        </li>
        <li>
          <NavigatorMenu :icon="`&#xe6fd;`" :menuName="`Sessions`" />
        </li>
        <li>
          <NavigatorMenu :icon="`&#xe609;`" :menuName="`Models`" />
        </li>
        <li>
          <NavigatorMenu :icon="`&#xe62e;`" :menuName="`Languages`" />
        </li>
        <li>
          <NavigatorMenu :icon="`&#xe682;`" :menuName="`Users`" />
        </li>
        <li>
          <NavigatorMenu :icon="`&#xe63f;`" :menuName="`Plugins`" />
        </li>
      </ul>
    </div>
    <div class="navi-logout" @click="handleLogout">
      <div class="navi-logout__icon iconfont">&#xe655;</div>
      <div class="navi-logout__text">Logout</div>
    </div>
  </div>
</template>

<script>
import NavigatorMenu from "../navigator/NaviMenu.vue";
import { useRouter } from "vue-router";

export default {
  name: "Navigator",
  components: { NavigatorMenu },
  props: {},
  data() {
    return {
      router: useRouter(),
    };
  },
  computed: {},
  methods: {
    handleLogout() {
      this.$emit("closeWebSocket");
      this.$store.dispatch("clearCurrentUser");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("userID");
      this.router.push({ name: "Login" });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "../../assets/base.scss";
@import "../../assets/iconfont.css";

.navi-wrapper {
  width: 100%;
  height: 100%;
  background-color: $theme-color;
}

.navi-logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: darken($theme-color, 20%);

  img {
    width: 35px;
    height: 35px;
  }
  span {
    // To visually make BUMBLE logo and text position in the middle
    padding-right: 15px;
    color: $theme-font-color;
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.navi-menus {
  margin-top: 18px;
}

.navi-logout {
  @include flexCenter;
  position: absolute;
  left: 0;
  bottom: 50px;
  width: 100%;

  color: $theme-font-color;

  &:hover {
    color: $secondary-theme-color;
    cursor: pointer;
  }

  .iconfont {
    font-size: 1.25rem;
  }

  &__icon {
    @include flexCenter;
    height: 2.5rem;
    margin-right: 5px;
  }

  &__text {
    @include flexCenter;
    height: 2.5rem;
    font-size: 1.25rem;
    font-weight: bold;
  }
}
</style>
