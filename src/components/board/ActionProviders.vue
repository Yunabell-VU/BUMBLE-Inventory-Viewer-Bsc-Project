<template>
  <BoardLayout :titleName="'Action Providers'">
    <template #button>
      <div class="providers-create-new-button" @click="showModal">+ New</div>
    </template>
    <template #content>
      <div class="providers-wrapper">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="provider in modelInventory.actionproviders"
              :key="provider"
            >
              <td>{{ provider.$id }}</td>
              <td>{{ provider.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #modal>
      <Modal v-show="isModalVisible" @close="closeModal">
        <template #header>
          <div class="providers-modal-header">Add new Action Provider</div>
        </template>
        <template #body>
          <div class="providers-modal-body">
            <ul>
              <li class="providers-modal-input">
                <span> name:</span>
                <input v-model="newProvider.name" type="text" />
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="providers-modal-footer">
            <div class="providers-modal-footer__buttons">
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
  name: "ActionProviders",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      ws: null,
      isModalVisible: false,
      newProvider: {
        name: "",
      },
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryTemplate", "currentUser"]),
  },
  methods: {
    showModal() {
      (this.newProvider = {
        name: "",
      }),
        (this.isModalVisible = true);
    },
    closeModal() {
      this.isModalVisible = false;
    },
    handleSave() {
      let providers = this.modelInventory.actionproviders;
      providers.push(this.newProvider);

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

.providers-create-new-button {
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

.providers-wrapper {
  @include flexCenter;
  padding: 0px 5%;
  width: 100%;
}

.providers-add-modal {
  position: absolute;
}

.providers-modal-input {
  @include flexSpaceBetween;
  margin-bottom: 15px;

  span {
    margin-right: 10px;
  }
}

.providers-modal-footer {
  display: flex;
  justify-content: flex-end;

  &__buttons {
    button {
      margin-left: 10px;
    }
  }
}
</style>
