<template>
  <BoardLayout :titleName="'Models'">
    <template #button>
      <div class="create-new-button">+ New</div>
    </template>
    <template #content>
      <div class="models-wrapper">
        <div class="models-titles">
          <div class="models-titles__model">model</div>
          <div class="models-titles__language">language</div>
          <div class="models-titles__location">Location</div>
          <div class="models-titles__owner">created by</div>
          <div class="models-titles__session">collaboration session</div>
          <div class="models-titles__arrow"></div>
          <div class="models-titles__actions">actions</div>
        </div>
        <div
          v-for="item in modelInventory.models"
          :key="item"
          class="models-rows"
        >
          <ModelsRow :model-id="item.$id" @view-model="viewModel(item.name)" />
        </div>
      </div>
    </template>
  </BoardLayout>
</template>

<script>
import Session from "../Session.vue";
import BoardLayout from "../layout/BoardLayout.vue";
import ModelsRow from "./models/ModelsRow.vue";
import { useRouter } from "vue-router";
import { put } from "../../utils/request";
import { mapGetters } from "vuex";

export default {
  name: "Models",
  components: { Session, BoardLayout, ModelsRow },
  data() {
    return {
      ws: null,
      detailClosed: true,
      router: useRouter(),
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryTemplate", "currentUser"]),
  },
  methods: {
    viewModel(modelName) {
      this.ws.close();
      this.$store.dispatch("setCurrentModel", modelName);
      this.router.push({ name: "Model", params: { modelName: modelName } });
    },
    async updateCollaborationSessions(sessions) {
      const inventory = this.inventoryTemplate;
      inventory.collaborationSessions = sessions;
      const data = { data: inventory };

      await put(`/models/?modeluri=ModelInventory.xmi`, JSON.stringify(data));
    },
  },
  mounted() {
    this.ws = new WebSocket(
      `ws://localhost:8081/api/v2/subscribe?modeluri=ModelInventory.xmi`
    );
    this.ws.onopen = () => {
      console.log("model inventory connection success");
    };
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "fullUpdate") {
        this.$store.dispatch("updateModelInventory");
      }
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/base.scss";
@import "../../assets/iconfont.css";

.create-new-button {
  @include flexCenter;
  width: 70px;
  height: 35px;
  background-color: #239d4e;
  color: white;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: darken(#239d4e, 10%);
  }
}

.models-wrapper {
  @include flexCenter;
  flex-direction: column;
  width: 100%;
}

.models-titles {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 3rem;
  border-bottom: 2px solid black;
  font-size: 1rem;
  color: black;

  &__model,
  &__language,
  &__location,
  &__owner {
    width: 15%;
    font-weight: bold;
  }

  &__session {
    width: 10%;
    font-weight: bold;
  }

  &__arrow {
    width: 10%;
  }

  &__actions {
    width: 20%;
    font-weight: bold;
  }
}

.models-rows {
  width: 100%;
}
</style>
