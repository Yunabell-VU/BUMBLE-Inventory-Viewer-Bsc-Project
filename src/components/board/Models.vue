<template>
  <div class="board-wrapper">
    <div class="classes" v-for="model in modelInventory.models" :key="model">
      <Model :model-name="model.name" />
    </div>
  </div>
</template>

<script>
import Model from "../Model.vue";
import { mapGetters } from "vuex";

export default {
  name: "Models",
  components: { Model },

  computed: {
    ...mapGetters(["modelInventory"]),
  },
};
</script>

<style lang="scss">
@import "../../assets/base.scss";

.tables {
  margin-bottom: 0.2rem;
}
</style>
