<template>
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

  <h1>Model Animal (id: {{ animals.$id }})</h1>

  <div
    class="animals tables"
    v-for="(animal, name) in animalClasses"
    :key="animal"
  >
    <Class :content="animal" :name="name" />
  </div>

  <h1>Model Shape(id: {{ shapes.$id }})</h1>

  <div class="shapes tables" v-for="(shape, name) in shapeClasses" :key="shape">
    <Class :content="shape" :name="name" />
  </div>
</template>

<script>
import Session from "../components/Session.vue";
import Class from "../components/Class.vue";
import { post, get } from "../utils/request";

export default {
  name: "Home",
  components: { Session, Class },
  data() {
    return {
      xmlDoc: null,
      users: [],
      sessions: [],
      models: [],
      languages: [],
      animals: [],
      animalClasses: [],
      shapes: [],
      shapeClasses: [],
    };
  },
  methods: {
    parseInventory(data) {
      this.users = data.users;
      this.sessions = data.collaborationSessions;
      this.models = data.model;
      this.languages = data.language;
    },
    parseAnimal(data) {
      this.animals = data;
      const { $type, $id, ...animalClasses } = this.animals;
      this.animalClasses = animalClasses;
    },
    parseShape(data) {
      this.shapes = data;
      const { $type, $id, ...shapeClasses } = this.shapes;
      this.shapeClasses = shapeClasses;
    },
  },
  async mounted() {
    const getInventory = async () => {
      const result = await get("/models/?modeluri=ModelInventory.xmi");

      this.parseInventory(result.data);
    };
    getInventory();

    const getAnimal = async () => {
      const result = await get("/models/?modeluri=ModelAnimal.xmi");

      this.parseAnimal(result.data);
    };
    getAnimal();

    const getShape = async () => {
      const result = await get("/models/?modeluri=ModelShape.xmi");

      this.parseShape(result.data);
    };
    getShape();
  },
};
</script>

<style lang="scss">
@import "../assets/base.scss";

.tables {
  margin-bottom: 0.2rem;
}
</style>
