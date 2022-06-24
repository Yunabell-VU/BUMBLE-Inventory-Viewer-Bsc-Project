<template>
  <BoardLayout :titleName="'Models'">
    <template #button>
      <div class="models-create-new-button" @click="handleCreate">+ New</div>
    </template>
    <template #content>
      <div class="models-wrapper">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Language</th>
              <th>Location</th>
              <th>URI</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="model in modelInventory.model" :key="model">
              <td>{{ model.name }}</td>
              <td>
                {{ retrieveLanguage(model).name }}
              </td>
              <td>{{ model.location }}</td>
              <td>{{ model.uri }}</td>
              <td>{{ model.createdBy || "" }}</td>
              <td>
                <ul class="instance-editions">
                  <li
                    class="instance-editions__edit"
                    @click="handleEdit(model)"
                  >
                    <span class="iconfont"> &#xe600;</span>
                  </li>
                  <li
                    class="instance-editions__delete"
                    @click="handleDelete(model.uri)"
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
          <div v-if="isEdit" class="models-modal-header">Edit This Model</div>
          <div v-else class="models-modal-header">Add New Model</div>
        </template>
        <template #body>
          <div class="models-modal-body">
            <ul>
              <li class="models-modal-input">
                <span></span>
                <span> name:</span>
                <input v-model="newModel.name" type="text" />
              </li>
              <li class="models-modal-input">
                <span></span>
                <span> location:</span>
                <input v-model="newModel.location" type="text" />
              </li>
              <li class="models-modal-input">
                <span></span>
                <span> uri:</span>
                <input
                  v-if="isEdit"
                  disabled
                  v-model="newModel.uri"
                  type="text"
                />
                <input v-else v-model="newModel.uri" type="text" />
              </li>
              <li class="models-modal-input">
                <span> language:</span>
                <select
                  v-if="newModel.confirmsTo"
                  v-model="newModel.confirmsTo.$ref"
                  style="width: 185px"
                >
                  <option v-for="item in availableLanguages" :key="item">
                    {{ item }}
                  </option>
                </select>
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="models-modal-footer">
            <div class="models-modal-footer__buttons">
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
  getLanguage,
  deleteInstance,
  saveNewInstance,
  updateInstance,
  getNewInstanceTemplate,
} from "../../utils/tools";
import { mapGetters } from "vuex";

export default {
  name: "Models",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      isModalVisible: false,
      newModel: {},
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryTemplate", "currentUser"]),
    availableLanguages() {
      let languages = [];

      for (var i = 0; i < this.modelInventory.language.length; i++) {
        languages.push(this.modelInventory.language[i].name);
      }
      return languages;
    },
  },
  methods: {
    retrieveLanguage(model) {
      return getLanguage(this.modelInventory, model);
    },
    handleCreate() {
      this.newModel = getNewInstanceTemplate("model");
      this.showModal();
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isEdit = false;
      this.isModalVisible = false;
    },
    languageNameToRef(confirmsTo) {
      const language = this.modelInventory.language.filter(
        (language) => language.name === confirmsTo.$ref
      );
      const newConfirmsTo = {
        $ref: language[0]?.$id || "",
      };
      return newConfirmsTo;
    },
    handleEdit(model) {
      this.newModel = model;
      this.isEdit = true;
      this.showModal();
    },
    handleEditSave() {
      this.newModel.confirmsTo = this.languageNameToRef(
        this.newModel.confirmsTo
      );

      updateInstance(this.modelInventory, "model", this.newModel);
      this.closeModal();
    },
    handleDelete(modelURI) {
      deleteInstance(this.modelInventory, "model", "uri", modelURI);
    },
    handleSave() {
      if (this.newModel.uri === "" || this.newModel.name === "") {
        return;
      }

      this.newModel.confirmsTo = this.languageNameToRef(
        this.newModel.confirmsTo
      );

      this.newModel.createdBy = this.currentUser.name;

      saveNewInstance(this.modelInventory, "model", this.newModel, false);

      this.closeModal();
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "../../assets/base.scss";
@import "../../assets/iconfont.css";

.models-create-new-button {
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
  padding: 0px 5%;
  width: 100%;
}

.instance-editions {
  @include flexSpaceBetween;
  width: 60px;
  &:hover {
    cursor: pointer;
  }

  &__delete {
    .iconfont {
      color: red;
    }
  }
}

.models-add-modal {
  position: absolute;
}

.models-modal-input {
  @include flexSpaceBetween;
  margin-bottom: 15px;

  span {
    margin-right: 10px;
  }
  button {
    margin-left: 10px;
    width: 60px;
  }

  &__delete {
    color: red;

    &:hover {
      cursor: pointer;
      color: #262626;
    }
  }

  &__add {
    @include flexCenter;
  }
}

.models-modal-footer {
  display: flex;
  justify-content: flex-end;

  &__buttons {
    button {
      margin-left: 10px;
    }
  }
}
</style>
