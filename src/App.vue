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
  </header>

  <main></main>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    readXml(xmlFile) {
      var xmlDoc;
      var xmlhttp;

      if (typeof window.DOMParser != "undefined") {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", xmlFile, false);
        if (xmlhttp.overrideMimeType) {
          xmlhttp.overrideMimeType("text/xml");
        }
        xmlhttp.send();
        xmlDoc = xmlhttp.responseXML;
      } else {
        console.log("in else");
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.load(xmlFile);
      }
      return xmlDoc;
    },
    parseXml() {
      const xmlDoc = this.readXml("../static/ModelInventory.xml");

      const modelInventory = xmlDoc.getElementsByTagName(
        "collaborationSessionMetamodel:ModelInventory"
      );

      this.users = modelInventory[0].getElementsByTagName("users");
      const sessions = modelInventory[0].getElementsByTagName(
        "collaborationSessions"
      );
      const models = modelInventory[0].getElementsByTagName("models");
      const languages = modelInventory[0].getElementsByTagName("language");
      console.log(this.users);
      // console.log(sessions);
      // console.log(models);
      console.log(languages[1].getAttribute("name"));
    },
  },
  mounted() {
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
