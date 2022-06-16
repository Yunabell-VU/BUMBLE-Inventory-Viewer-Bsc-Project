<template>
  <BoardLayout :titleName="currentModel.name">
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
import BoardLayout from "../board/BoardLayout.vue";
import ModelClass from "./model/ModelClass.vue";
import { post, put, get } from "../../utils/request";
import { mapGetters } from "vuex";

export default {
  name: "Model",
  components: { BoardLayout, ModelClass },
  data() {
    return {
      model: [],
      modelClasses: [],
      ecoreClasses: [],
      ws: null,
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "currentModel"]),
  },
  methods: {
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
        `/models/?modeluri=${this.currentModel.name}.xmi`,
        JSON.stringify(data)
      );
    },
    getModelEcoreInfo(modelName) {
      const name = modelName[0].toUpperCase() + modelName.slice(1);
      const ecoreClass = this.ecoreClasses.filter((item) => item.name === name);
      return ecoreClass[0];
    },
    handleGoBack() {
      this.ws.close();
      this.$emit("goBack");
    },
  },
  async mounted() {
    const getModel = async (name) => {
      const result = await get(`/models/?modeluri=${name}.xmi`);

      this.parseModel(result.data);
    };
    getModel(this.currentModel.name);

    const ecoreName = this.currentModel.name.slice(5).toLowerCase();

    const ecoreResult = await get(`/models/?modeluri=${ecoreName}.ecore`);
    this.ecoreClasses = ecoreResult.data.eClassifiers;

    this.ws = new WebSocket(
      `ws://localhost:8081/api/v2/subscribe?modeluri=${this.currentModel.name}.xmi`
    );
    this.ws.onopen = () => {
      console.log("connection success");
    };
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("onmessage result: ", data);
      if (data.type === "fullUpdate") {
        getModel(this.currentModel.name);
      }
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/base.scss";

.go-back-button {
  @include flexCenter;
  width: 90px;
  height: 40px;
  background-color: #e9cb7c;
  color: #262626;
  font-size: 1.2rem;
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
