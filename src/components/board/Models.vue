<template>
  <BoardLayout :titleName="'Models'">
    <template #button>
      <div class="models-create-new-button" @click="showModal">+ New</div>
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
            <tr v-for="model in modelInventory.models" :key="model">
              <td>{{ model.name }}</td>
              <td>
                {{ getLanguage(model).name }}
              </td>
              <td>{{ model.location }}</td>
              <td>{{ model.uri }}</td>
              <td>{{ model.createdBy || "" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #modal>
      <Modal v-show="isModalVisible" @close="closeModal">
        <template #header>
          <div class="models-modal-header">Add New Model</div>
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
                <input v-model="newModel.uri" type="text" />
              </li>
              <li class="models-modal-input">
                <span> language:</span>
                <select v-model="newModel.confirmsTo.$ref" style="width: 185px">
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
import { mapGetters } from "vuex";

export default {
  name: "Models",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      ws: null,
      isModalVisible: false,
      newModel: {
        name: "",
        location: "",
        uri: "",
        confirmsTo: [
          {
            $ref: "",
          },
        ],
        createdBy: "",
      },
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryTemplate", "currentUser"]),
    availableLanguages() {
      let languages = [];

      for (var i = 0; i < this.modelInventory.languages.length; i++) {
        languages.push(this.modelInventory.languages[i].name);
      }
      return languages;
    },
  },
  methods: {
    getLanguage(model) {
      const confirmsTo = model.confirmsTo;
      const languageID = confirmsTo.$ref;

      const language = this.modelInventory.languages.filter(
        (item) => item.$id === languageID
      );

      return language[0];
    },
    showModal() {
      this.newModel = {
        name: "",
        location: "",
        uri: "",
        confirmsTo: {
          $ref: "",
        },
      };
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    languageNameToRef(confirmsTo) {
      const language = this.modelInventory.languages.filter(
        (language) => language.name === confirmsTo.$ref
      );
      const newConfirmsTo = {
        $ref: language[0]?.$id || "",
      };
      return newConfirmsTo;
    },
    handleSave() {
      if (this.newModel.uri === "" || this.newModel.name === "") {
        return;
      }

      this.newModel.confirmsTo = this.languageNameToRef(
        this.newModel.confirmsTo
      );

      this.newModel.createdBy = this.currentUser.name;

      let models = this.modelInventory.models;
      models.push(this.newModel);

      const inventory = this.inventoryTemplate;
      inventory.model = models;
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
