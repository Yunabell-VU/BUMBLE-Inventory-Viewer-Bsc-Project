<template>
  <BoardLayout :titleName="'Users'">
    <template #button>
      <div class="users-create-new-button" @click="showModal">+ New</div>
    </template>
    <template #content>
      <div class="users-wrapper">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in modelInventory.users" :key="user">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.emailAddress }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #modal>
      <Modal v-show="isModalVisible" @close="closeModal">
        <template #header>
          <div class="user-modal-header">Add new user</div>
        </template>
        <template #body>
          <div class="user-modal-body">
            <ul>
              <li class="user-modal-input">
                <span> name:</span>
                <input v-model="newUser.name" type="text" />
              </li>
              <li class="user-modal-input">
                <span> password:</span>
                <input v-model="newUser.password" type="text" />
              </li>
              <li class="user-modal-input">
                <span> email address:</span>
                <input v-model="newUser.emailAddress" type="text" />
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="user-modal-footer">
            <div class="user-modal-footer__buttons">
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
import { saveNewInstance } from "../../utils/tools";
import { mapGetters } from "vuex";

export default {
  name: "Users",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      ws: null,
      isModalVisible: false,
      newUser: {
        id: null,
        name: "",
        password: "",
        emailAddress: "",
      },
    };
  },
  computed: {
    ...mapGetters(["modelInventory", "inventoryTemplate", "currentUser"]),
  },
  methods: {
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
    handleSave() {
      saveNewInstance(this.modelInventory, "users", this.newUser, true);

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

.users-create-new-button {
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

.users-wrapper {
  @include flexCenter;
  padding: 0px 5%;
  width: 100%;
}

.users-add-modal {
  position: absolute;
}

.user-modal-input {
  @include flexSpaceBetween;
  margin-bottom: 15px;

  span {
    margin-right: 10px;
  }
}

.user-modal-footer {
  display: flex;
  justify-content: flex-end;

  &__buttons {
    button {
      margin-left: 10px;
    }
  }
}
</style>
