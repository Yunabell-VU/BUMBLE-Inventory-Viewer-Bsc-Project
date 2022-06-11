<template>
  <div class="class-wrapper">
    <div class="class-name">
      <span>{{ name }}</span>
      <span>{{ instances.length }} instances</span>
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
            <td>{{ getAttributeType(key) }}</td>
            <td>
              <input
                v-if="isEdit"
                v-model="instances[index][key]"
                placeholder="no"
              />
              <div v-else>{{ value }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="class-actions">
      <div
        v-if="!isEdit"
        class="class-actions__edit class-actions__button"
        @click="switchToEditMode"
      >
        edit
      </div>
      <div
        v-else
        class="class-actions__save class-actions__button"
        @click="handleSave"
      >
        save
      </div>
      <div
        class="class-actions__add-new class-actions__button"
        @click="addNewInstance"
      >
        add
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelClass",
  props: {
    content: {
      type: Object,
      default() {
        return [];
      },
    },
    name: String,
    ecoreInfo: Object,
  },
  data() {
    return {
      instances: [],
      isEdit: false,
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
  methods: {
    getAttributeType(attributeName) {
      const classes = this.ecoreInfo.eStructuralFeatures;
      const attribute = classes.filter((item) => item.name === attributeName);
      const typeRef = attribute[0].eType.$ref;
      const rawAttrType = typeRef.split("//").slice(-1);
      return rawAttrType[0].slice(1);
    },
    addNewInstance() {
      const firstElement = this.instances[0];
      const format = { ...firstElement };

      Object.keys(format).forEach((key) => {
        if (Number.isFinite(format[key])) {
          format[key] = 1;
        } else {
          format[key] = "/";
        }
      });

      const newId = this.getNewId();

      format.$id = newId.toString();
      format.id = newId;

      this.instances.push(format);
      this.$emit("updateInstance", {
        className: this.name,
        instances: this.instances,
      });
    },
    getNewId() {
      let ids = [];

      for (var i = 0; i < this.instances.length; i++) {
        ids.push(this.instances[i].id);
      }

      ids.sort();

      for (var i = 0; i < ids.length; i++) {
        if (ids[i] != i + 1) {
          return i + 1;
        }
      }
      return ids.length + 1;
    },
    switchToEditMode() {
      this.isEdit = true;
    },
    handleSave() {
      this.isEdit = false;
      this.$emit("updateInstance", {
        className: this.name,
        instances: this.instances,
      });
    },
  },
  mounted() {
    this.instances = this.content;
  },
};
</script>

<style lang="scss">
@import "../../../assets/base.scss";

.class-wrapper {
  width: 100%;
  margin: 2rem 0;
  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.3);
}

.class-name {
  @include flexSpaceBetween;
  width: 100%;
  height: 3rem;
  padding: 0 10px;
  background-color: #262626;

  span {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.class-instances {
  padding: 0 10px;
}

.class-actions {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  padding: 10px 10px;

  &__button {
    @include flexCenter;
    width: 80px;
    height: 40px;
    margin-left: 10px;
    color: white;
    background-color: #239d4e;
    font-size: 1.2rem;
    font-weight: bold;

    &:hover {
      cursor: pointer;
      background-color: darken(#239d4e, 10%);
    }
  }
}
</style>
