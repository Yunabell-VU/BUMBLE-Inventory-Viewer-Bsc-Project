<template>
  <BoardLayout :titleName="'Languages'">
    <template #button>
      <div class="languages-create-new-button" @click="showModal">+ New</div>
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
            <tr v-for="language in modelInventory.languages" :key="language">
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
                <div
                  class="delete-instance"
                  @click="handleLanguageDelete(language.id)"
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
          <div class="languages-modal-header">Add new language</div>
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
  name: "Languages",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      ws: null,
      isModalVisible: false,
      newLanguage: {
        id: null,
        name: "",
        supportedEditors: [
          {
            name: "",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryTemplate", "currentUser"]),
  },
  methods: {
    showModal() {
      this.newLanguage = {
        id: null,
        name: "",
        supportedEditors: [
          {
            name: "",
          },
        ],
      };
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    getNewUserID() {
      return getNewId(this.modelInventory.languages);
    },
    handleLanguageDelete(languageID) {
      const newLanguages = this.modelInventory.languages.filter(
        (language) => language.id !== languageID
      );

      const inventory = this.inventoryTemplate;
      inventory.language = newLanguages;

      const data = { data: inventory };

      put(`/models/?modeluri=ModelInventory.xmi`, JSON.stringify(data));
    },
    handleEditorDelete(index) {
      this.newLanguage.supportedEditors.splice(index, 1);
    },
    handleEditorAdd() {
      const editor = { name: "" };
      this.newLanguage.supportedEditors.push(editor);
    },
    handleSave() {
      this.newLanguage.id = this.getNewUserID(this.modelInventory.languages);
      let languages = this.modelInventory.languages;
      languages.push(this.newLanguage);

      const inventory = this.inventoryTemplate;
      inventory.language = languages;
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
    // margin-left: 10px;
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
