<template>
  <div class="models-wrapper">
    <Model :model-name="currentModel.name" />
  </div>
</template>

<script>
import Model from "../Model.vue";
import { mapGetters } from "vuex";

export default {
  name: "Models",
  components: { Model },
  computed: {
    ...mapGetters(["modelInventory", "currentModel"]),
  },
};
</script>

<style lang="scss">
@import "../../assets/base.scss";

.tables {
  margin-bottom: 0.2rem;
}
</style>
