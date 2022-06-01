<template>
  <div class="header-wrapper">
    <div class="path-block"></div>
    <div class="user-block">
      <div class="user-block__avatar">{{ initial }}</div>
      <div class="user-block__name">{{ currentUser.name }}</div>
      <span class="iconfont">&#xe8ec;</span>
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
@import "../../assets/mixins.scss";

.header-wrapper {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  width: 90vw;
  height: 50px;
  padding: 0 1.5rem;
  background-color: white;
}

.path-block {
  width: 20%;
  height: 100%;

  background-color: aqua;
}

.user-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 10%;
  height: 100%;

  &__avatar {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgb(233, 110, 110);
    border: 1px solid black;
    font-size: 25px;
    font-weight: bold;
    color: white;
  }

  &__name {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
