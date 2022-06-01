<template>
  <div class="header-wrapper">
    <div class="path-block"></div>
    <div class="users-block"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
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

.users-block {
  width: 20%;
  height: 100%;

  background-color: aqua;
}
</style>
