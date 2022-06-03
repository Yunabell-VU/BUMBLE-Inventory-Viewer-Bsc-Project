<template>
  <div class="inventory-row__basic">
    <div class="inventory-row__basic__model">{{ modelName }}</div>
    <div class="inventory-row__basic__language">{{ languageName }}</div>
    <div class="inventory-row__basic__owner">TODO</div>
    <div class="inventory-row__basic__participants">TODO</div>
    <div
      :class="{ 'inventory-row__basic__arrow--flipped': extraInfoShown }"
      class="inventory-row__basic__arrow"
      @click="toggleExtraInfo"
    >
      <div class="iconfont">&#xe671;</div>
    </div>
    <div class="inventory-row__basic__actions"></div>
  </div>
  <div v-show="extraInfoShown" class="inventory-row__extra">
    <h3>teset</h3>
    <h3>teset</h3>
    <h3>teset</h3>
    <h3>teset</h3>
    <h3>teset</h3>
  </div>
</template>

<script>
import Session from "../../Session.vue";
import { mapGetters } from "vuex";

export default {
  name: "InventoryRow",
  components: { Session },
  props: {
    modelId: String,
  },
  data() {
    return {
      extraInfoShown: false,
    };
  },
  computed: {
    ...mapGetters(["modelInventory"]),

    model() {
      const model = this.modelInventory.models.filter(
        (model) => model.$id === this.modelId
      )[0];

      return model;
    },
    modelName() {
      return this.model.name;
    },
    language() {
      const languageID = this.model.confirmsTo.$ref;
      const language = this.modelInventory.languages.filter(
        (language) => language.$id === languageID
      )[0];

      return language;
    },
    languageName() {
      return this.language.name;
    },
  },
  methods: {
    toggleExtraInfo() {
      this.extraInfoShown = !this.extraInfoShown;
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/base.scss";
@import "../../../assets/iconfont.css";

.inventory-row__basic {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #cccccc;

  &__model,
  &__language,
  &__owner {
    width: 15%;
  }

  &__participants {
    width: 25%;
  }

  &__arrow {
    width: 10%;

    .iconfont {
      @include flexCenter;
      width: 1.5rem;
      height: 1.5rem;
      font-size: 1.8rem;
      color: #808080;
      transform: rotate(180deg);
      transition: transform 0.3s;

      &:hover {
        color: #262626;
        cursor: pointer;
      }
    }

    &--flipped {
      .iconfont {
        transform: rotate(0deg);
      }
    }
  }

  &__actions {
    width: 20%;
  }
}

.inventory-row__extra {
  width: 100%;
  overflow: hidden;
  border-left: 5px solid #262626;
  background-color: #fafafa;
  box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.25);
}
</style>
