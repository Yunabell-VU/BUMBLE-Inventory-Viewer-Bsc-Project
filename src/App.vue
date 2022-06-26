<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  async mounted() {
    await this.$store.dispatch("updateModelInventory");
    await this.$store.dispatch("setInventoryStructure");
  },
};
</script>
