<template>
  <BoardLayout :titleName="'Drivers'">
    <template #button>
      <div class="drivers-create-new-button" @click="showModal">+ New</div>
    </template>
    <template #content>
      <div class="drivers-wrapper">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="driver in modelInventory.drivers" :key="driver">
              <td>{{ driver.$id }}</td>
              <td>{{ driver.name }}</td>
              <td>
                <div
                  class="delete-instance"
                  @click="handleDriverDelete(driver.$id)"
                >
                  <span class="iconfont"> &#xe67e;</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #modal>
      <Modal v-show="isModalVisible" @close="closeModal">
        <template #header>
          <div class="drivers-modal-header">Add New Driver</div>
        </template>
        <template #body>
          <div class="drivers-modal-body">
            <ul>
              <li class="drivers-modal-input">
                <span> name:</span>
                <input v-model="newDriver.name" type="text" />
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="drivers-modal-footer">
            <div class="drivers-modal-footer__buttons">
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
import { deleteInstance } from "../../utils/tools";
import { mapGetters } from "vuex";

export default {
  name: "Drivers",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      ws: null,
      isModalVisible: false,
      newDriver: {
        name: "",
      },
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryTemplate", "currentUser"]),
  },
  methods: {
    showModal() {
      this.newDriver = {
        name: "",
      };
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    handleDriverDelete(driverID) {
      deleteInstance(this.modelInventory, "drivers", "$id", driverID);
    },
    handleSave() {
      let drivers = this.modelInventory.drivers;
      drivers.push(this.newDriver);

      const data = { data: this.modelInventory };

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

.drivers-create-new-button {
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

.drivers-wrapper {
  @include flexCenter;
  padding: 0px 5%;
  width: 100%;
}

.drivers-add-modal {
  position: absolute;
}

.drivers-modal-input {
  @include flexSpaceBetween;
  margin-bottom: 15px;

  span {
    margin-right: 10px;
  }
}

.drivers-modal-footer {
  display: flex;
  justify-content: flex-end;

  &__buttons {
    button {
      margin-left: 10px;
    }
  }
}
</style>
