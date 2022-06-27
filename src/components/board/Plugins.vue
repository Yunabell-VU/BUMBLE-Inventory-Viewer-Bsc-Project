<template>
  <BoardLayout :titleName="'Plugins'">
    <template #content>
      <div class="library-wrapper">
        <div class="library-wrapper__title">
          <span>Drivers</span>
          <span class="iconfont" @click="handleCreate('drivers')"
            >&#xe670;</span
          >
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Icon</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="driver in modelInventory.drivers" :key="driver">
              <td>{{ driver.name }}</td>
              <td>{{ driver.icon }}</td>
              <td>
                <ul class="instance-editions">
                  <li
                    class="instance-editions__edit"
                    @click="handleEdit('drivers', driver)"
                  >
                    <span class="iconfont"> &#xe600;</span>
                  </li>
                  <li
                    class="instance-editions__delete"
                    @click="handleDelete('drivers', '$id', driver.$id)"
                  >
                    <span class="iconfont"> &#xe67e;</span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="library-wrapper__title">
          <span>Action Providers</span>
          <span class="iconfont" @click="handleCreate('actionproviders')"
            >&#xe670;</span
          >
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Icon</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="provider in modelInventory.actionproviders"
              :key="provider"
            >
              <td>{{ provider.name }}</td>
              <td>{{ provider.icon }}</td>
              <td>
                <ul class="instance-editions">
                  <li
                    class="instance-editions__edit"
                    @click="handleEdit('actionproviders', provider)"
                  >
                    <span class="iconfont"> &#xe600;</span>
                  </li>
                  <li
                    class="instance-editions__delete"
                    @click="
                      handleDelete('actionproviders', '$id', provider.$id)
                    "
                  >
                    <span class="iconfont"> &#xe67e;</span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="library-wrapper__title">
          <span>Edit Adapters</span>
          <span class="iconfont" @click="handleCreate('editAdapters')"
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
                <ul class="instance-editions">
                  <li
                    class="instance-editions__edit"
                    @click="handleEdit('editAdapters', adapter)"
                  >
                    <span class="iconfont"> &#xe600;</span>
                  </li>
                  <li
                    class="instance-editions__delete"
                    @click="handleDelete('editAdapters', 'id', adapter.id)"
                  >
                    <span class="iconfont"> &#xe67e;</span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="library-wrapper__title">
          <span>Identity Resolvers</span>
          <span class="iconfont" @click="handleCreate('identityresolvers')"
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
                <ul class="instance-editions">
                  <li
                    class="instance-editions__edit"
                    @click="handleEdit('identityresolvers', resolver)"
                  >
                    <span class="iconfont"> &#xe600;</span>
                  </li>
                  <li
                    class="instance-editions__delete"
                    @click="
                      handleDelete('identityresolvers', 'id', resolver.id)
                    "
                  >
                    <span class="iconfont"> &#xe67e;</span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #modal>
      <Modal v-show="isModalVisible" @close="closeModal">
        <template #header>
          <div v-if="isEdit" class="library-modal-header">
            Edit This {{ currentClass }}
          </div>
          <div v-else class="library-modal-header">
            Add New {{ currentClass }}
          </div>
        </template>
        <template #body>
          <div class="library-modal-body">
            <ul>
              <li
                v-for="(value, key) in newInstance"
                :key="key"
                class="library-modal-input"
              >
                <span> {{ key }}:</span>
                <input
                  :disabled="key == '$id' || key == 'id'"
                  v-model="newInstance[key]"
                  type="text"
                />
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="library-modal-footer">
            <div class="library-modal-footer__buttons">
              <button @click="closeModal" class="modal-button">cancel</button>
              <button
                v-if="isEdit"
                @click="handleEditSave"
                class="modal-button"
              >
                save
              </button>
              <button v-else @click="handleSave" class="modal-button">
                save
              </button>
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
import {
  deleteInstance,
  getNewInstanceTemplate,
  saveNewInstance,
  updateInstance,
} from "../../utils/tools";
import { mapGetters } from "vuex";

export default {
  name: "Library",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      isModalVisible: false,
      currentClass: "",
      newInstance: {},
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryTemplate", "currentUser"]),
  },
  methods: {
    handleCreate(className) {
      this.currentClass = className;
      this.newInstance = getNewInstanceTemplate(className);
      this.showModal();
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isEdit = false;
      this.isModalVisible = false;
    },
    handleEdit(className, instance) {
      this.currentClass = className;
      this.newInstance = { ...getNewInstanceTemplate(className), ...instance };
      this.isEdit = true;
      this.showModal();
    },
    handleEditSave() {
      updateInstance(this.modelInventory, this.currentClass, this.newInstance);
      this.closeModal();
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

      saveNewInstance(
        this.modelInventory,
        this.currentClass,
        this.newInstance,
        isIdRequired
      );
      this.closeModal();
    },
  },
  mounted() {},
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
