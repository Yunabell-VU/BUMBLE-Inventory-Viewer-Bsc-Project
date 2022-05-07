<template>
  <div class="board-wrapper">
    <h1>Model Inventory</h1>
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
          <tr v-for="item in modelInventory.users" :key="item">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.password }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2>Sessions</h2>
    <div
      class="sessions tables"
      v-for="session in modelInventory.sessions"
      :key="session"
    >
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
          <tr v-for="item in modelInventory.models" :key="item">
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
          <tr v-for="item in modelInventory.languages" :key="item">
            <td>{{ item.$id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.supportedEditors[0].name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Session from "../Session.vue";
import { mapGetters } from "vuex";

export default {
  name: "Inventory",
  components: { Session },
  computed: {
    ...mapGetters(["modelInventory"]),
  },
};
</script>

<style lang="scss">
@import "../../assets/base.scss";

.tables {
  margin-bottom: 0.2rem;
}
</style>
