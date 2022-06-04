<template>
  <div class="inventory-row-wrapper">
    <div
      :class="{ 'inventory-row__basic--no-border': extraInfoShown }"
      class="inventory-row__basic"
    >
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
      <div class="inventory-row__basic__actions">
        <ul>
          <li
            class="inventory-row__basic__actions__button"
            @click="$emit('viewModel')"
          >
            VIEW
          </li>
          <li class="inventory-row__basic__actions__button">EDIT</li>
          <li
            class="inventory-row__basic__actions__button inventory-row__basic__actions__button__delete"
          >
            DELETE
          </li>
        </ul>
      </div>
    </div>
    <div v-show="extraInfoShown" class="inventory-row__extra">
      <ul>
        <li>
          <div class="inventory-row__extra__key">id:</div>
          <div class="inventory-row__extra__value">{{ model.$id }}</div>
        </li>
        <li>
          <div class="inventory-row__extra__key">Supported Editors:</div>
          <div
            v-for="item in supportedEditors"
            :key="item"
            class="inventory-row__extra__value"
          >
            <span class="inventory-row__extra__value__editor-name">{{
              item.name
            }}</span>
          </div>
        </li>
        <li>
          <div class="inventory-row__extra__key"></div>
          <div class="inventory-row__extra__value"></div>
        </li>
      </ul>
    </div>
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
    supportedEditors() {
      return this.language.supportedEditors;
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

.inventory-row-wrapper {
  @include flexCenter;
  flex-direction: column;
  width: 100%;
}

.inventory-row__basic {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 70px;
  border-bottom: 1px solid #cccccc;

  &--no-border {
    border: none;
  }

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
      transition: all 0.3s ease;

      &:hover {
        color: #262626;
        cursor: pointer;
      }
    }

    &--flipped {
      .iconfont {
        transform: rotate(0deg);
        color: red;
      }
    }
  }

  &__actions {
    width: 20%;

    ul {
      @include flexSpaceBetween;
    }

    &__button {
      @include flexCenter;
      width: 80px;
      height: 35px;
      background-color: #e9cb7c;
      font-weight: bold;

      &:hover {
        cursor: pointer;
        background-color: darken(#e9cb7c, 10%);
      }

      &__delete {
        background-color: #e97c7c;

        &:hover {
          background-color: darken(#e97c7c, 10%);
        }
      }
    }
  }
}

.inventory-row__extra {
  @include flexCenter;
  width: 100%;
  overflow: hidden;
  border-left: 5px solid #262626;
  background-color: #fafafa;
  box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.25);

  ul {
    width: 90%;
  }

  li {
    display: flex;
    align-items: center;
    height: 2.5rem;
  }

  &__key {
    width: 15%;
  }
}
</style>
