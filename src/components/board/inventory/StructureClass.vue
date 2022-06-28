<template>
  <div class="structure-wrapper">
    <div v-for="eclass in classes" :key="eclass" class="class-board">
      <div class="class-board__title">{{ eclass.name }}</div>
      <div class="class-board__content">
        <div class="class-board__content-attributes">
          <span class="class-board__content__feature-name">Attributes</span>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="eattribute in getAttributes(eclass.eStructuralFeatures)"
                :key="eattribute"
              >
                <td>{{ eattribute.name }}</td>
                <td>{{ getAttributeType(eattribute.eType) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-if="getReferences(eclass.eStructuralFeatures).length > 0"
          class="class-board__content-references"
        >
          <span class="class-board__content__feature-name">References</span>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="ereference in getReferences(eclass.eStructuralFeatures)"
                :key="ereference"
              >
                <td>{{ ereference.name }}</td>
                <td>{{ ereference.eType.$ref.slice(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BoardLayout from "../../layout/BoardLayout.vue";
import { mapGetters } from "vuex";

export default {
  name: "StructureClass",
  components: { BoardLayout },
  props: {
    classes: Object,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["modelInventory"]),
  },
  methods: {
    getAttributes(features) {
      const attributes = features.filter(
        (feature) => feature.$type.split("//").pop() === "EAttribute"
      );
      return attributes;
    },
    getAttributeType(eType) {
      if (eType.$type.split("//").pop() === "EDataType") {
        return eType.$ref.split("//").pop().slice(1);
      } else {
        return eType.$ref.split("//").pop();
      }
    },
    getReferences(features) {
      const references = features.filter(
        (feature) => feature.$type.split("//").pop() === "EReference"
      );
      return references;
    },
  },
  mounted() {},
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
    background-color: $secondary-theme-color;
    color: $theme-color;
    font-size: 1rem;
    font-weight: bold;

    &:hover {
      cursor: pointer;
      background-color: darken($secondary-theme-color, 10%);
    }

    &__view {
      background-color: $create-button-color;
      color: $theme-font-color;
    }
  }
}

.class-board {
  flex: 1;
  margin: 0 100px 50px 0;
  width: calc((100% - 200px) / 2);
  min-width: calc((100% - 200px) / 2);
  max-width: calc((100% - 200px) / 2);
  border: 2px solid $theme-color;

  &:nth-child(2n) {
    margin-right: 0;
  }

  &__title {
    @include flexCenter;
    width: 100%;
    height: 40px;
    background-color: $theme-color;
    color: $theme-font-color;
    font-size: 1.1rem;
    font-weight: bold;
  }

  &__content {
    padding: 0 10px 10px 10px;

    &__feature-name {
      display: block;
      margin-top: 10px;
      border-bottom: 1px solid $theme-color;
      background-color: $board-background-color;
      font-weight: bold;
    }
  }
}

.table {
  th {
    font-size: 0.9rem;
  }
}
</style>
