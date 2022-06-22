<template>
  <BoardLayout :titleName="'Sessions'">
    <template #content>
      <div class="sessions-wrapper">
        <div v-for="session in modelInventory.sessions" :key="session">
          <div>
            <div class="sessions-title-info">
              <span>Model : {{ getModelName(session.has.$ref) }}</span>
              <span>Collaboration Session (id : {{ session.id }})</span>
            </div>
            <table class="sessions__table table table-hover">
              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="participant in session.participants"
                  :key="participant"
                >
                  <td>
                    {{ getUserName(participant.user.$ref) }}
                  </td>
                  <td>
                    {{ getRoleValue(participant) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
    <template #modal>
      <Modal v-show="isModalVisible" @close="closeModal">
        <template #header>
          <div class="sessions-modal-header">Add new language</div>
        </template>
        <template #body>
          <div class="sessions-modal-body">
            <ul>
              <li class="sessions-modal-input">
                <span> name:</span>
                <input v-model="newLanguage.name" type="text" />
                <span class="sessions-modal-input__whitespace"></span>
              </li>
              <li
                v-for="(editor, index) in newLanguage.supportedEditors"
                :key="editor"
                class="sessions-modal-input"
              >
                <span> supported editor:</span>
                <input v-model="editor.name" type="text" />
                <button @click="handleEditorDelete(index)">delete</button>
              </li>
              <li class="sessions-modal-input__add">
                <button @click="handleEditorAdd">add editor</button>
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="sessions-modal-footer">
            <button @click="handleSave">save</button>
            <button @click="closeModal">cancel</button>
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
  name: "Sessions",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      ws: null,
      isModalVisible: false,
      participants: [],
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
    getRoleValue: (participant) => participant.role || "COLLABORATOR",
    getUserName(userID) {
      const users = this.modelInventory.users;
      const user = users.filter((user) => user.$id === userID);
      return user[0].name;
    },
    getModelName(modelID) {
      const models = this.modelInventory.models;
      if (models) {
        const model = models.filter((model) => model.$id === modelID);

        if (model.length > 0) {
          return model[0].name;
        }
      }

      return "Model Deleted or Not Exist";
    },
    showModal() {
      this.newUser = {
        id: null,
        name: "",
        password: "",
        emailAddress: "",
      };
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    getNewUserID() {
      return getNewId(this.modelInventory.languages);
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
      inventory.languages = languages;
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

.sessions-create-new-button {
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

.sessions-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0px 5%;
  width: 100%;
}

.sessions-title-info {
  @include flexSpaceBetween;
  margin-top: 2rem;
  padding: 0px 10px;
  width: 100%;
  height: 40px;
  background-color: #262626;
  color: white;

  span {
    font-weight: bold;
  }
}

.sessions-add-modal {
  position: absolute;
}

.sessions-modal-input {
  @include flexSpaceBetween;
  margin-bottom: 15px;

  span {
    margin-right: 10px;
  }
  input {
    margin-right: 10px;
  }
  button {
    width: 60px;
  }

  &__whitespace {
    width: 60px;
  }
}
</style>
