<template>
  <BoardLayout :titleName="'Edit Adapters'">
    <template #button>
      <div class="adapters-create-new-button" @click="showModal">+ New</div>
    </template>
    <template #content>
      <div class="adapters-wrapper">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="adapter in modelInventory.editAdapters" :key="adapter">
              <td>{{ adapter.id }}</td>
              <td>{{ adapter.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #modal>
      <Modal v-show="isModalVisible" @close="closeModal">
        <template #header>
          <div class="adapters-modal-header">Add new Edit Adapter</div>
        </template>
        <template #body>
          <div class="adapters-modal-body">
            <ul>
              <li class="adapters-modal-input">
                <span> name:</span>
                <input v-model="newAdapter.name" type="text" />
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="adapters-modal-footer">
            <div class="adapters-modal-footer__buttons">
              <button @click="closeModal" class="modal-button">cancel</button>
              <button @click="handleSave" class="modal-button">save</button>
            </div>
          </div>
        </template>
      </Modal>
    </template>
  </BoardLayout>
</template>

<script>
import BoardLayout from "../layout/BoardLayout.vue";
import Modal from "../layout/Modal.vue";
import { put } from "../../utils/request";
import { getNewId } from "../../utils/tools";
import { mapGetters } from "vuex";

export default {
  name: "EditAdapters",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      ws: null,
      isModalVisible: false,
      newAdapter: {
        id: null,
        name: "",
      },
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryTemplate", "currentUser"]),
  },
  methods: {
    showModal() {
      this.newAdapter = {
        id: null,
        name: "",
      };
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    getNewUserID() {
      return getNewId(this.modelInventory.editAdapters);
    },
    handleSave() {
      this.newAdapter.id = this.getNewUserID();
      let adapters = this.modelInventory.editAdapters;
      adapters.push(this.newAdapter);

      const inventory = this.inventoryTemplate;
      inventory.editAdapters = adapters;
      const data = { data: inventory };

      put(`/models/?modeluri=ModelInventory.xmi`, JSON.stringify(data));

      this.closeModal();
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

.adapters-create-new-button {
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

.adapters-wrapper {
  @include flexCenter;
  padding: 0px 5%;
  width: 100%;
}

.adapters-add-modal {
  position: absolute;
}

.adapters-modal-input {
  @include flexSpaceBetween;
  margin-bottom: 15px;

  span {
    margin-right: 10px;
  }
}

.adapters-modal-footer {
  display: flex;
  justify-content: flex-end;

  &__buttons {
    button {
      margin-left: 10px;
    }
  }
}
</style>
