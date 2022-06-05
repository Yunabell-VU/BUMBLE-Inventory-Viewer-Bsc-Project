<template>
  <div class="class-wrapper">
    <h2>Class: {{ name }}</h2>
    <div v-for="(instance, index) in instances" :key="instance">
      <h4>Instance {{ index + 1 }}</h4>
      <table class="model__table table table-hover">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in instance" :key="key">
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Class",
  props: {
    content: {
      type: Object,
      default() {
        return [];
      },
    },
    name: String,
  },
  data() {
    return {
      instances: [],
    };
  },
  methods: {},
  mounted() {
    this.instances = this.content;
  },
};
</script>

<style lang="scss">
@import "../assets/base.scss";

.class-wrapper {
  width: 100%;
}
</style>
