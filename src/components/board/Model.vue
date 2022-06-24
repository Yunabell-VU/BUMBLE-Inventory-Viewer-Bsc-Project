<template>
  <BoardLayout :titleName="modelName">
    <template #button>
      <div class="go-back-button" @click="handleGoBack">Back</div>
    </template>
    <template #content>
      <div class="model-wrapper">
        <div class="model-contents">
          <div
            class="tables"
            v-for="(content, name) in modelClasses"
            :key="content"
          >
            <ModelClass
              v-if="getModelEcoreInfo(name) != undefind"
              :content="content"
              :name="name"
              :ecore-info="getModelEcoreInfo(name)"
              @updateInstances="updateInstances"
            />
          </div>
        </div>
      </div>
    </template>
  </BoardLayout>
</template>

<script>
import BoardLayout from "../layout/BoardLayout.vue";
import ModelClass from "./model/ModelClass.vue";
import { useRouter } from "vue-router";
import { post, put, get } from "../../utils/request";
import { mapGetters } from "vuex";

export default {
  name: "Model",
  components: { BoardLayout, ModelClass },
  data() {
    return {
      modelName: "",
      router: useRouter(),
      model: [],
      modelClasses: [],
      ecoreClasses: [],
    };
  },
  computed: {
    ...mapGetters(["modelInventory"]),
  },
  methods: {
    async getModel(name) {
      const result = await get(`/models/?modeluri=${name}.xmi`);

      this.parseModel(result.data);
    },
    parseModel(data) {
      this.model = data;
      const { $type, $id, ...modelClasses } = this.model;
      this.modelClasses = modelClasses;
    },
    async updateInstances(payload) {
      const { className, instances } = payload;
      this.model[className] = instances;
      const data = { data: this.model };

      await put(
        `/models/?modeluri=${this.modelName}.xmi`,
        JSON.stringify(data)
      );
    },
    getModelEcoreInfo(modelName) {
      const name = modelName[0].toUpperCase() + modelName.slice(1);
      const ecoreClass = this.ecoreClasses.filter((item) => item.name === name);
      return ecoreClass[0];
    },
    handleGoBack() {
      this.router.push({ name: "Inventory" });
    },
  },
  async mounted() {
    this.modelName = this.$route.fullPath.split("/").pop();
    this.getModel(this.modelName);

    const ecoreName = this.modelName.slice(5).toLowerCase();

    const ecoreResult = await get(`/models/?modeluri=${ecoreName}.ecore`);
    this.ecoreClasses = ecoreResult.data.eClassifiers;
  },
};
</script>

<style lang="scss">
@import "../../assets/base.scss";

.go-back-button {
  @include flexCenter;
  width: 70px;
  height: 35px;
  background-color: #e9cb7c;
  color: #262626;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: darken(#e9cb7c, 10%);
  }
}

.model-wrapper {
  @include flexCenter;
  width: 100%;
}

.model-contents {
  width: 90%;
}

.tables {
  margin-bottom: 0.2rem;
}
</style>
