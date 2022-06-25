<template>
  <BoardLayout :titleName="'Inventory Structure'">
    <template #button>
      <div class="structure-header-buttons">
        <div
          v-if="isClassesView"
          class="structure-header-buttons__button structure-header-buttons__button__view"
          @click="switchView"
        >
          Enums
        </div>
        <div
          v-else
          class="structure-header-buttons__button structure-header-buttons__button__view"
          @click="switchView"
        >
          Classes
        </div>
        <div
          class="structure-header-buttons__button structure-header-buttons__button__goback"
          @click="handleGoBack"
        >
          Back
        </div>
      </div>
    </template>
    <template #content>
      <div class="model-wrapper">
        <div class="model-contents">
          <StructureClass v-if="isClassesView" :classes="classes" />
          <StructureEnum v-else :enums="enums" />
        </div>
      </div>
    </template>
  </BoardLayout>
</template>

<script>
import BoardLayout from "../../layout/BoardLayout.vue";
import StructureClass from "../inventory/StructureClass.vue";
import StructureEnum from "../inventory/StructureEnum.vue";
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";

export default {
  name: "InventoryStructure",
  components: { BoardLayout, StructureClass, StructureEnum },
  data() {
    return {
      isClassesView: true,
      enums: [],
      classes: [],
      router: useRouter(),
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryStructure"]),
  },
  methods: {
    switchView() {
      this.isClassesView = !this.isClassesView;
    },

    handleGoBack() {
      this.router.push({ name: "Inventory" });
    },
    getModelEcoreInfo(modelName) {
      const name = modelName[0].toUpperCase() + modelName.slice(1);
      const ecoreClass = this.ecoreClasses.filter((item) => item.name === name);
      return ecoreClass[0];
    },
    getStrutureType(path) {
      const sType = path.split("//").pop();
      return sType;
    },
  },
  mounted() {
    this.enums = this.inventoryStructure.filter(
      (item) => this.getStrutureType(item.$type) === "EEnum"
    );

    this.classes = this.inventoryStructure.filter(
      (item) => this.getStrutureType(item.$type) === "EClass"
    );
  },
};
</script>

<style lang="scss">
@import "../../../assets/base.scss";

.structure-header-buttons {
  @include flexSpaceBetween;
  width: 200px;

  &__button {
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

    &__view {
      background-color: #239d4e;
      color: white;
    }
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
