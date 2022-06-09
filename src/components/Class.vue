<template>
  <div class="class-wrapper">
    <div class="class-name">
      <span>{{ name }}</span>
    </div>
    <div
      class="class-instances"
      v-for="(instance, index) in modifiedInstances"
      :key="index"
    >
      <table class="model__table table table-hover">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in instance" :key="key">
            <td>{{ key }}</td>
            <td>{{ typeof value }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
      <div class="class-instances__lines"></div>
    </div>
    <div class="class-new-instance">
      <div class="class-new-instance__add-new">add</div>
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
  computed: {
    modifiedInstances() {
      const newInstance = this.instances.map(({ $id, ...rest }) => {
        return rest;
      });

      return newInstance;
    },
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
  margin: 2rem 0;
  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

.class-name {
  @include flexSpaceBetween;
  width: 100%;
  height: 3rem;
  padding: 0 10px;
  background-color: #e9ca7c7e;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  span {
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.class-instances {
  padding: 0 10px;

  &__lines {
    width: 100%;
    height: 4px;
    background-color: #e9ca7c41;
  }
}

.class-new-instance {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  padding: 10px 10px;

  &__add-new {
    @include flexCenter;
    width: 80px;
    height: 40px;
    color: white;
    background-color: #239d4e;
    font-size: 1.3rem;
    font-weight: bold;

    &:hover {
      cursor: pointer;
      background-color: darken(#239d4e, 10%);
    }
  }
}
</style>
