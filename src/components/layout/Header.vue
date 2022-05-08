<template>
  <div class="header-wrapper"></div>
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
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  width: 92vw;
  height: 50px;
  background-color: white;
}
</style>
