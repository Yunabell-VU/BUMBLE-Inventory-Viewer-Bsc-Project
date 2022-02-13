<template>
  <header>
    <div class="users">
      <table class="user__table">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users" :key="item">
            <td>{{ item.getAttribute("id") }}</td>
            <td>{{ item.getAttribute("name") }}</td>
            <td>{{ item.getAttribute("email") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="models">
      <table class="model__table">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>conformsTo</th>
            <th>location</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in models" :key="item">
            <td>{{ item.getAttribute("id") }}</td>
            <td>{{ item.getAttribute("name") }}</td>
            <td>{{ item.getAttribute("conformsTo") }}</td>
            <td>{{ item.getAttribute("location") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="languages">
      <table class="language__table">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in languages" :key="item">
            <td>{{ item.getAttribute("name") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </header>

  <main></main>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      xmlDoc: null,
      users: [],
      models: [],
      languages: [],
    };
  },
  methods: {
    parseXml() {
      const modelInventory = this.xmlDoc.getElementsByTagName(
        "collaborationSessionMetamodel:ModelInventory"
      );

      this.users = modelInventory[0].getElementsByTagName("users");
      const sessions = modelInventory[0].getElementsByTagName(
        "collaborationSessions"
      );
      this.models = modelInventory[0].getElementsByTagName("models");
      this.languages = modelInventory[0].getElementsByTagName("language");
    },
  },
  async mounted() {
    await axios
      .get("../static/ModelInventory.xml")
      .then((response) => {
        const parser = new DOMParser();
        this.xmlDoc = parser.parseFromString(response.data, "text/xml");
      })
      .catch((e) => {
        console.log(e);
      });
    this.parseXml();
  },
};
</script>

<style lang="scss">
@import "./assets/base.scss";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
</style>
