<template>
  <h2>Users</h2>
  <div class="users tables">
    <table class="users__table table table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.password }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <h2>Sessions</h2>
  <div class="sessions tables" v-for="session in sessions" :key="session">
    <Session :session="session" />
  </div>
  <h2>Models</h2>
  <div class="models tables">
    <table class="models__table table table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>conformsTo</th>
          <th>Location</th>
          <th>uri</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in models" :key="item">
          <td>{{ item.$id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.confirmsTo.$ref }}</td>
          <td>{{ item.location }}</td>
          <td>{{ item.uri }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <h2>Languages</h2>
  <div class="languages tables">
    <table class="languages__table table table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>SupportedEditors</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in languages" :key="item">
          <td>{{ item.$id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.supportedEditors[0].name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Session from "../components/Session.vue";
import { post, get } from "../utils/request";

export default {
  name: "Home",
  components: { Session },
  data() {
    return {
      xmlDoc: null,
      users: [],
      sessions: [],
      models: [],
      languages: [],
    };
  },
  methods: {
    parseInventory(data) {
      this.users = data.users;
      this.sessions = data.collaborationSessions;
      this.models = data.model;
      this.languages = data.language;
    },
  },
  async mounted() {
    const getInventory = async () => {
      const result = await get("/models/?modeluri=ModelInventory.xmi");

      this.parseInventory(result.data);
      console.log(result.data);
    };
    getInventory();
  },
};
</script>

<style lang="scss">
@import "../assets/base.scss";

.tables {
  margin-bottom: 0.2rem;
}
</style>
