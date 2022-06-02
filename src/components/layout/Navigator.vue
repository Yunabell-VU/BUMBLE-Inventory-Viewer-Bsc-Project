<template>
  <div class="navi-wrapper">
    <div class="navi-logo-wrapper">
      <img src="../../../BUMBLE_logo.png" alt="" />
      <span>BUMBLE</span>
    </div>
    <div class="navi-menus"></div>
    <div class="navi-logout" @click="handleLogout">
      <div class="navi-logout__icon iconfont">&#xe655;</div>
      <div class="navi-logout__text">Logout</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "Navigator",
  props: {},
  data() {
    return {
      router: useRouter(),
    };
  },
  methods: {
    handleLogout() {
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
  background-color: #262626;
}

.navi-logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: black;

  img {
    width: 35px;
    height: 35px;
  }
  span {
    // To visually make BUMBLE logo and text position in the middle
    padding-right: 15px;
    color: #f2f2f2;
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.navi-logout {
  @include flexCenter;
  position: absolute;
  left: 0;
  bottom: 100px;
  width: 100%;

  color: white;

  &:hover {
    color: #e9cb7c;
    cursor: pointer;
  }

  .iconfont {
    font-size: 1.5rem;
  }

  &__icon {
    @include flexCenter;
    height: 3rem;
    margin-right: 5px;
  }

  &__text {
    @include flexCenter;
    height: 3rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>
