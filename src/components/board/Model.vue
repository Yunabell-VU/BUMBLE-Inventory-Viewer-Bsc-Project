<template>
  <BoardLayout :titleName="currentModel.name">
    <template #button>
      <div class="go-back-button" @click="$emit('goBack')">Back</div>
    </template>
    <template #content>
      <div class="model-wrapper">
        <div class="model-contents">
          <div
            class="tables"
            v-for="(content, name) in modelClasses"
            :key="content"
          >
            <Class :content="content" :name="name" />
          </div>
        </div>
      </div>
    </template>
  </BoardLayout>
</template>

<script>
import BoardLayout from "../board/BoardLayout.vue";
import Class from "../Class.vue";
import { post, get } from "../../utils/request";
import { mapGetters } from "vuex";

export default {
  name: "Model",
  components: { BoardLayout, Class },
  data() {
    return {
      model: [],
      modelClasses: [],
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
  },
  async mounted() {
    const getModel = async (name) => {
      const result = await get(`/models/?modeluri=${name}.xmi`);

      this.parseModel(result.data);
    };
    getModel(this.currentModel.name);
  },
};
</script>

<style lang="scss">
@import "../../assets/base.scss";

.go-back-button {
  @include flexCenter;
  width: 105px;
  height: 45px;
  background-color: #e9cb7c;
  color: #262626;
  font-size: 1.3rem;
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
