<template>
  <header>
    <div class="wrapper">Hello Yuna!</div>
  </header>

  <main></main>
</template>

<script>
export default {
  name: "App",
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
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.load(xmlFile);
      }
      var tagObj = xmlDoc.getElementsByTagName(
        "collaborationSessionMetamodel:ModelInventory"
      );
      var userValue =
        tagObj[0].getElementsByTagName("users")[0];
      return userValue;
    },
  },
  mounted() {
    console.log(this.readXml("../static/ModelInventory.xml"));
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

.wrapper {
  width: 100px;
  height: 100px;
  background-color: brown;
  &:hover {
    background-color: aquamarine;
  }
}
</style>
