<template>
  <div class="navi-wrapper">
    <div class="logo-wrapper">
      <img src="../../../BUMBLE_logo.png" alt="" />
      <span>BUMBLE</span>
    </div>
    <div class="menus"></div>
  </div>
</template>

<script>
export default {
  name: "Navigator",
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss">
@import "../../assets/base.scss";

.navi-wrapper {
  width: 100%;
  height: 100%;
  background-color: #262626;
}

.logo-wrapper {
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
    color: #f2f2f2;
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>
