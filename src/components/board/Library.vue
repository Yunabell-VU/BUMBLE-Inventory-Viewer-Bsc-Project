<template>
  <BoardLayout :titleName="'Library'">
    <template #content>
      <div class="library-wrapper">
        <div class="library-wrapper__title">
          <span>Drivers</span>
          <span class="iconfont" @click="showModal('drivers')">&#xe670;</span>
        </div>
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
                  @click="handleDelete('drivers', '$id', driver.$id)"
                >
                  <span class="iconfont"> &#xe67e;</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="library-wrapper__title">
          <span>Action Providers</span>
          <span class="iconfont" @click="showModal('actionproviders')"
            >&#xe670;</span
          >
        </div>
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
              <td>
                <div
                  class="delete-instance"
                  @click="handleDelete('actionproviders', '$id', provider.$id)"
                >
                  <span class="iconfont"> &#xe67e;</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="library-wrapper__title">
          <span>Edit Adapters</span>
          <span class="iconfont" @click="showModal('editAdapters')"
            >&#xe670;</span
          >
        </div>
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
              <td>
                <div
                  class="delete-instance"
                  @click="handleDelete('editAdapters', 'id', adapter.id)"
                >
                  <span class="iconfont"> &#xe67e;</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="library-wrapper__title">
          <span>Identity Resolvers</span>
          <span class="iconfont" @click="showModal('identityresolvers')"
            >&#xe670;</span
          >
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="resolver in modelInventory.identityresolvers"
              :key="resolver"
            >
              <td>{{ resolver.id }}</td>
              <td>{{ resolver.name }}</td>
              <td>
                <div
                  class="delete-instance"
                  @click="handleDelete('identityresolvers', 'id', resolver.id)"
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
          <div class="library-modal-header">Add New Driver</div>
        </template>
        <template #body>
          <div class="library-modal-body">
            <ul>
              <li class="library-modal-input">
                <span> name:</span>
                <input v-model="newInstance.name" type="text" />
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="library-modal-footer">
            <div class="library-modal-footer__buttons">
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
import {
  deleteInstance,
  getNewInstanceTemplate,
  saveInstance,
} from "../../utils/tools";
import { mapGetters } from "vuex";

export default {
  name: "Library",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      ws: null,
      isModalVisible: false,
      currentClass: "",
      newInstance: {},
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryTemplate", "currentUser"]),
  },
  methods: {
    showModal(className) {
      this.currentClass = className;
      this.newInstance = getNewInstanceTemplate(className);
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    handleDelete(name, reference, itemID) {
      deleteInstance(this.modelInventory, name, reference, itemID);
    },
    handleSave() {
      let isIdRequired = false;
      if (
        this.currentClass === "editAdapters" ||
        this.currentClass === "identityresolvers"
      ) {
        isIdRequired = true;
      }

      saveInstance(
        this.modelInventory,
        this.currentClass,
        this.newInstance,
        isIdRequired
      );
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

.library-create-new-button {
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

.library-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 0px 5%;
  width: 100%;

  &__title {
    @include flexSpaceBetween;
    margin-top: 20px;
    padding: 0px 10px;
    width: 100%;
    height: 40px;
    background-color: #262626;
    color: white;

    span {
      font-weight: bold;
    }

    .iconfont {
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.table {
  td {
    max-width: 30px;
    word-break: break-all;
  }
}

.library-add-modal {
  position: absolute;
}

.library-modal-input {
  @include flexSpaceBetween;
  margin-bottom: 15px;

  span {
    margin-right: 10px;
  }
}

.library-modal-footer {
  display: flex;
  justify-content: flex-end;

  &__buttons {
    button {
      margin-left: 10px;
    }
  }
}
</style>
