<template>
  <div class="layout-wrapper">
    <div class="layout-left">
      <Navigator :close-web-socket="closeWebSocket" />
    </div>
    <div class="layout-right">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "../components/layout/Header.vue";
import Navigator from "../components/layout/Navigator.vue";
import Models from "../components/board/Models.vue";

export default {
  name: "Home",
  components: { Header, Navigator, Models },
  data() {
    return {
      webSocket: null,
    };
  },
  methods: {
    closeWebSocket() {
      this.webSocket.close();
    },
  },
  mounted() {
    this.$store.dispatch("setCurrentUser");
    this.$store.dispatch("setInventoryStructure");

    this.webSocket = new WebSocket(
      `ws://localhost:8081/api/v2/subscribe?modeluri=ModelInventory.xmi`
    );
    this.webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "fullUpdate") {
        this.$store.dispatch("updateModelInventory");
      }
    };
  },
};
</script>

<style lang="scss">
@import "../assets/base.scss";

.layout-wrapper {
  display: flex;
}

.layout-left {
  width: 10vw;
  height: 100vh;
}

.layout-right {
  position: relative;
  width: 90vw;
  height: 100vh;
}
</style>
