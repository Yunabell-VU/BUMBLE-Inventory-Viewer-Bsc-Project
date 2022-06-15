<template>
  <div v-if="validModel" class="inventory-row-wrapper">
    <div
      :class="{ 'inventory-row__basic--no-border': extraInfoShown }"
      class="inventory-row__basic"
    >
      <div class="inventory-row__basic__model">{{ modelName }}</div>
      <div class="inventory-row__basic__language">{{ languageName }}</div>
      <div class="inventory-row__basic__location">{{ location }}</div>
      <div class="inventory-row__basic__owner">{{ createdBy }}</div>
      <div class="inventory-row__basic__session">
        <div
          :class="
            hasCollaborationSession
              ? 'inventory-row__basic__session__status-ring--on'
              : 'inventory-row__basic__session__status-ring--off'
          "
          class="inventory-row__basic__session__status-ring"
        ></div>
        <div
          :class="
            hasCollaborationSession
              ? 'inventory-row__basic__session__status--on'
              : 'inventory-row__basic__session__status--off'
          "
          class="inventory-row__basic__session__status"
        ></div>
      </div>
      <div
        :class="{ 'inventory-row__basic__arrow--flipped': extraInfoShown }"
        class="inventory-row__basic__arrow"
        @click="toggleExtraInfo"
      >
        <div class="iconfont">&#xe671;</div>
      </div>
      <div class="inventory-row__basic__actions">
        <ul>
          <li class="inventory-row__basic__actions__button">JOIN</li>
          <li
            class="inventory-row__basic__actions__button"
            @click="$emit('viewModel')"
          >
            VIEW
          </li>
          <li
            class="inventory-row__basic__actions__button inventory-row__basic__actions__button__delete"
            @click="handleModelDelete"
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
import { validate, deleteModel } from "../../../utils/request";
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
      validModel: false,
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
      const confirmsTo = this.model.confirmsTo;
      const languageID = confirmsTo[0].$ref;
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
    location() {
      return this.model.location;
    },
    createdBy() {
      return this.model.createdBy || "/";
    },
    hasCollaborationSession() {
      const sessions = this.modelInventory.sessions;
      const session = sessions.filter(
        (session) => session.has.$ref === this.model.$id
      );
      return !!session;
    },
  },
  methods: {
    toggleExtraInfo() {
      this.extraInfoShown = !this.extraInfoShown;
    },
    async handleModelDelete() {
      const result = await deleteModel(`models?modeluri=${this.modelName}.xmi`);
      if (result.type === "success") {
        this.$store.dispatch("updateModelInventory");
      }
    },
  },
  async mounted() {
    let result = await validate(`/validation/?modeluri=${this.modelName}.xmi`);
    this.validModel = result.data !== "Model not found!";
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
  &__location,
  &__owner {
    width: 15%;
  }

  &__session {
    display: flex;
    position: relative;
    width: 10%;
    height: 100%;

    &__status {
      position: absolute;
      top: 28px;
      left: 3px;
      width: 15px;
      height: 15px;
      border-radius: 50%;

      &--on {
        background-color: green;
      }

      &--off {
        background-color: red;
      }
    }

    &__status-ring {
      position: absolute;
      left: 0px;
      top: 25px;
      width: 21px;
      height: 21px;
      border-radius: 50%;

      &--on {
        border: 2px solid rgba(0, 128, 0, 0.5);
      }

      &--off {
        border: 2px solid rgba(255, 0, 0, 0.5);
      }
    }
  }

  &__arrow {
    @include flexCenter;
    width: 10%;

    .iconfont {
      @include flexCenter;
      width: 1.5rem;
      height: 1.5rem;
      font-size: 1.5rem;
      color: #808080;
      transform: rotate(180deg);
      transition: all 0.2s ease;

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
      width: 70px;
      height: 35px;
      background-color: #e9cb7c;
      font-size: 0.9rem;
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
  border-left: 10px solid #262626;
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
