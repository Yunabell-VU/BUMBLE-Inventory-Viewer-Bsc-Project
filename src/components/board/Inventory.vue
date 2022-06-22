<template>
  <BoardLayout :titleName="'Inventory'">
    <template #button>
      <div class="create-new-button">Structure</div>
    </template>
    <template #content>
      <div class="inventory-wrapper">
        <div class="inventory-titles">
          <div class="inventory-titles__model">model</div>
          <div class="inventory-titles__language">Language</div>
          <div class="inventory-titles__location">Location</div>
          <div class="inventory-titles__owner">created by</div>
          <div class="inventory-titles__session">collaboration session</div>
          <div class="inventory-titles__arrow"></div>
          <div class="inventory-titles__actions">actions</div>
        </div>
        <div
          v-for="item in modelInventory.models"
          :key="item"
          class="models-rows"
        >
          <InventoryRow
            :model-id="item.$id"
            @view-model="viewModel(item.name)"
          />
        </div>
      </div>
    </template>
  </BoardLayout>
</template>

<script>
import BoardLayout from "../layout/BoardLayout.vue";
import InventoryRow from "./inventory/InventoryRow.vue";
import { useRouter } from "vue-router";
import { put } from "../../utils/request";
import { mapGetters } from "vuex";

export default {
  name: "Inventory",
  components: { BoardLayout, InventoryRow },
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
  width: 100px;
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

.inventory-wrapper {
  @include flexCenter;
  flex-direction: column;
  width: 100%;
}

.inventory-titles {
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
