<template>
  <BoardLayout :titleName="'Languages'">
    <template #button>
      <div class="languages-create-new-button" @click="handleCreate">+ New</div>
    </template>
    <template #content>
      <div class="languages-wrapper">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Supported Editors</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="language in modelInventory.language" :key="language">
              <td>{{ language.id }}</td>
              <td>{{ language.name }}</td>
              <td>
                <div v-for="editor in language.supportedEditors" :key="editor">
                  <span class="languages-wrapper__editor">{{
                    editor.name
                  }}</span>
                </div>
              </td>
              <td>
                <ul class="instance-editions">
                  <li
                    class="instance-editions__edit"
                    @click="handleEdit(language)"
                  >
                    <span class="iconfont"> &#xe600;</span>
                  </li>
                  <li
                    class="instance-editions__delete"
                    @click="handleDelete(language.id)"
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
          <div v-if="isEdit" class="languages-modal-header">
            Edit This Language
          </div>
          <div v-else class="languages-modal-header">Add New Language</div>
        </template>
        <template #body>
          <div class="languages-modal-body">
            <ul>
              <li class="languages-modal-input">
                <span></span>
                <span> name:</span>
                <input v-model="newLanguage.name" type="text" />
              </li>
              <li
                v-for="(editor, index) in newLanguage.supportedEditors"
                :key="editor"
                class="languages-modal-input"
              >
                <span
                  @click="handleEditorDelete(index)"
                  class="iconfont languages-modal-input__delete"
                >
                  &#xe67e;
                </span>
                <span> supported editor:</span>
                <input v-model="editor.name" type="text" />
              </li>
              <li class="languages-modal-input__add">
                <button @click="handleEditorAdd" class="modal-button">
                  add editor
                </button>
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="languages-modal-footer">
            <div class="languages-modal-footer__buttons">
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
  saveNewInstance,
  getNewInstanceTemplate,
  updateInstance,
} from "../../utils/tools";
import { mapGetters } from "vuex";

export default {
  name: "Languages",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      isModalVisible: false,
      newLanguage: {},
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryTemplate", "currentUser"]),
  },
  methods: {
    handleCreate() {
      this.newLanguage = getNewInstanceTemplate("language");
      this.showModal();
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isEdit = false;
      this.isModalVisible = false;
    },
    handleEdit(language) {
      this.newLanguage = { ...getNewInstanceTemplate("language"), ...language };
      this.isEdit = true;
      this.showModal();
    },
    handleEditSave() {
      updateInstance(this.modelInventory, "language", this.newLanguage);
      this.closeModal();
    },
    handleDelete(languageID) {
      deleteInstance(this.modelInventory, "language", "id", languageID);
    },
    handleEditorDelete(index) {
      this.newLanguage.supportedEditors.splice(index, 1);
    },
    handleEditorAdd() {
      const editor = { name: "" };
      this.newLanguage.supportedEditors.push(editor);
    },
    handleSave() {
      saveNewInstance(this.modelInventory, "language", this.newLanguage, true);
      this.closeModal();
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "../../assets/base.scss";
@import "../../assets/iconfont.css";

.languages-create-new-button {
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

.languages-wrapper {
  @include flexCenter;
  padding: 0px 5%;
  width: 100%;
}

.languages-add-modal {
  position: absolute;
}

.languages-modal-input {
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

.languages-modal-footer {
  display: flex;
  justify-content: flex-end;

  &__buttons {
    button {
      margin-left: 10px;
    }
  }
}
</style>
