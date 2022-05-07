<template>
  <Inventory />
  <Models />
</template>

<script>
import Inventory from "../board/Inventory.vue";
import Models from "../board/Models.vue";

export default {
  name: "Board",
  components: { Inventory, Models },
};
</script>

<style lang="scss">
@import "../../assets/base.scss";

.tables {
  margin-bottom: 0.2rem;
}
</style>
