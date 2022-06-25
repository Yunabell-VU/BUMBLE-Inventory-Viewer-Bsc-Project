<template>
  <div class="structure-class-wrapper"></div>
</template>

<script>
import BoardLayout from "../../layout/BoardLayout.vue";
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";

export default {
  name: "StructureClass",
  components: { BoardLayout },
  data() {
    return {
      isClassesView: true,
      router: useRouter(),
    };
  },
  computed: {
    ...mapGetters(["modelInventory"]),
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
  },
  async mounted() {},
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

.structure-class-wrapper {
  @include flexCenter;
  width: 100%;
  height: 500px;
  background: #9d2323;
}

.tables {
  margin-bottom: 0.2rem;
}
</style>
