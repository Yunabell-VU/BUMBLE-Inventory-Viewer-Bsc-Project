<template>
  <BoardLayout :titleName="'Model Inventory'">
    <template #button>
      <!-- <div class="create-new-button">+ New</div> -->
    </template>
    <template #content>
      <div class="inventory-wrapper">
        <div class="inventory-titles">
          <div class="inventory-titles__model">model</div>
          <div class="inventory-titles__language">language</div>
          <div class="inventory-titles__location">Location</div>
          <div class="inventory-titles__owner">created by</div>
          <div class="inventory-titles__session">collaboration session</div>
          <div class="inventory-titles__arrow"></div>
          <div class="inventory-titles__actions">actions</div>
        </div>
        <div
          v-for="item in modelInventory.models"
          :key="item"
          class="inventory-rows"
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
import Session from "../Session.vue";
import BoardLayout from "../board/BoardLayout.vue";
import InventoryRow from "../board/inventory/InventoryRow.vue";
import { mapGetters } from "vuex";

export default {
  name: "Inventory",
  components: { Session, BoardLayout, InventoryRow },
  data() {
    return {
      ws: null,
      detailClosed: true,
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "currentUser"]),
  },
  methods: {
    viewModel(modelName) {
      this.ws.close();
      this.$emit("viewModel", modelName);
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
      console.log("onmessage result: ", data);
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
  width: 105px;
  height: 45px;
  background-color: #239d4e;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: darken(#239d4e, 10%);
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

.inventory-rows {
  width: 100%;
}
</style>
