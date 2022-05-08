<template>
  <div class="model-wrapper">
    <h1>{{ modelName }}</h1>
    <div class="tables" v-for="(content, name) in modelClasses" :key="content">
      <Class :content="content" :name="name" />
    </div>
  </div>
</template>

<script>
import Class from "./Class.vue";
import { post, get } from "../utils/request";

export default {
  name: "Model",
  components: { Class },
  props: {
    modelName: String,
  },
  data() {
    return {
      model: [],
      modelClasses: [],
    };
  },
  methods: {
    parseModel(data) {
      this.model = data;
      const { $type, $id, ...modelClasses } = this.model;
      this.modelClasses = modelClasses;
    },
  },
  async mounted() {
    const getModel = async (name) => {
      const result = await get(`/models/?modeluri=${name}.xmi`);

      this.parseModel(result.data);
    };
    getModel(this.modelName);
  },
};
</script>

<style lang="scss">
@import "../assets/base.scss";

.tables {
  margin-bottom: 0.2rem;
}
</style>
