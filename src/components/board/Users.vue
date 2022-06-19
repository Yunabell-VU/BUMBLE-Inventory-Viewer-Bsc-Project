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
              <th>Password</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.password }}</td>
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
              <li>
                <span>id:</span>
                <span>{{ getNewUserID() }}</span>
              </li>
              <li>
                <span> name:</span>
                <input v-model="newUser.name" type="text" />
              </li>
              <li>
                <span> password:</span>
                <input v-model="newUser.password" type="text" />
              </li>
              <li>
                <span> email address:</span>
                <input v-model="newUser.emailAddress" type="text" />
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="user-modal-footer">
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
  name: "Users",
  components: { BoardLayout, Modal },
  data() {
    return {
      isEdit: false,
      users: [],
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
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    getNewUserID() {
      return getNewId(this.users);
    },
    handleSave() {
      this.newUser.id = this.getNewUserID();
      this.users.push(this.newUser);

      const inventory = this.inventoryTemplate;
      inventory.users = this.users;
      const data = { data: inventory };

      put(`/models/?modeluri=ModelInventory.xmi`, JSON.stringify(data));

      this.closeModal();
    },
  },
  mounted() {
    this.ws = new WebSocket(
      `ws://localhost:8081/api/v2/subscribe?modeluri=ModelInventory.xmi`
    );
    this.ws.onopen = () => {
      console.log("model inventory connection success");
    };
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "fullUpdate") {
        this.$store.dispatch("updateModelInventory");
      }
    };

    this.users = this.modelInventory.users;
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
</style>
