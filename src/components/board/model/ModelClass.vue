<template>
  <div class="class-wrapper">
    <div class="class-name">
      <span>{{ name }}</span>
    </div>
    <div class="class-format">
      <table class="model__table table table-hover">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in classFormat" :key="item">
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="show-instances">
      <div
        :class="{ 'show-instances__arrow--flipped': extraInfoShown }"
        class="show-instances__arrow"
        @click="toggleExtraInfo"
      >
        <div class="iconfont">&#xe671;</div>
      </div>
      <span class="show-instances__text"
        >show {{ instances.length }} instances</span
      >
    </div>
    <div v-if="extraInfoShown" class="class-instances-info">
      <div
        class="class-instances"
        v-for="(instance, index) in modifiedInstances"
        :key="index"
      >
        <div class="class-instances__info-bar">
          <span class="class-instances__info-bar__id"
            >id: {{ instance.id }}</span
          >
          <div class="class-instances__info-bar__id">
            <!-- <span class="iconfont class-instances__info-bar__icon">&#xe600;</span> -->
            <span
              class="iconfont class-instances__info-bar__icon"
              @click="handleDeleteInstance(instance.id)"
              >&#xe67e;</span
            >
          </div>
        </div>
        <table class="model__table table table-hover">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in instanceWithoutID(instance)" :key="key">
              <td>{{ key }}</td>
              <td>{{ getAttributeType(key) }}</td>
              <td>
                <input
                  v-if="isEdit"
                  v-model="instances[index][key]"
                  placeholder=""
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
      extraInfoShown: true,
      classFormat: [],
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
    instanceWithoutID(instance) {
      const { id, ...rest } = instance;

      return rest;
    },
    getAttributeType(attributeName) {
      const classes = this.ecoreInfo.eStructuralFeatures;
      const attribute = classes.filter((item) => item.name === attributeName);
      const typeRef = attribute[0].eType.$ref;
      const rawAttrType = typeRef.split("//").slice(-1);
      return rawAttrType[0].slice(1);
    },
    addNewInstance() {
      let format = {};

      for (var i = 0; i < this.classFormat.length; i++) {
        if (this.classFormat[i].type === "Int") {
          format[this.classFormat[i].name] = 1;
        } else {
          format[this.classFormat[i].name] = "/";
        }
      }

      const newId = this.getNewId();

      format.id = newId;

      this.instances.push(format);
      this.$emit("updateInstances", {
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
    handleDeleteInstance(instanceID) {
      const newInstances = this.instances.filter(
        (instance) => instance.id !== instanceID
      );
      this.instances = newInstances;

      this.$emit("updateInstances", {
        className: this.name,
        instances: this.instances,
      });
    },
    switchToEditMode() {
      this.isEdit = true;
    },
    handleSave() {
      this.isEdit = false;
      this.$emit("updateInstances", {
        className: this.name,
        instances: this.instances,
      });
    },
    toggleExtraInfo() {
      this.extraInfoShown = !this.extraInfoShown;
    },
  },
  mounted() {
    this.instances = this.content;

    const classes = this.ecoreInfo.eStructuralFeatures;

    for (var i = 0; i < classes.length; i++) {
      const attrName = classes[i].name;
      let attributeObj = {};
      attributeObj.name = attrName;
      attributeObj.type = this.getAttributeType(attrName);
      this.classFormat.push(attributeObj);
    }
  },
};
</script>

<style lang="scss">
@import "../../../assets/base.scss";
@import "../../../assets/iconfont.css";

.class-wrapper {
  width: 100%;
  margin: 2rem 0;
  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.3);
}

.class-name {
  @include flexSpaceBetween;
  width: 100%;
  height: 2.4rem;
  padding: 0 10px;
  background-color: #262626;

  span {
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
  }
}

.show-instances {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  height: 2.4rem;
  background-color: #262626;

  span {
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
  }

  &__arrow {
    @include flexCenter;
    width: 3rem;

    .iconfont {
      @include flexCenter;
      width: 1.5rem;
      height: 1.5rem;
      font-size: 1.5rem;
      color: white;
      transform: rotate(180deg);
      transition: all 0.2s ease;

      &:hover {
        cursor: pointer;
      }
    }

    &--flipped {
      .iconfont {
        transform: rotate(0deg);
      }
    }
  }
}

.class-instances {
  margin: 10px 10px;

  border: 1px solid #cccccc;

  &__info-bar {
    @include flexSpaceBetween;
    padding: 0 10px;
    width: 100%;
    height: 30px;
    background-color: #f0e3c2;

    &__id {
      font-size: 1rem;
      font-weight: bold;
    }

    &__icon {
      margin-left: 10px;
      font-size: 1.2rem;
      font-weight: bold;

      &:hover {
        cursor: pointer;
        color: #e97c7c;
      }
    }
  }
}

.class-actions {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  padding: 10px 10px;

  &__button {
    @include flexCenter;
    width: 70px;
    height: 35px;
    margin-left: 10px;
    color: white;
    background-color: #239d4e;
    font-size: 1.1rem;
    font-weight: bold;

    &:hover {
      cursor: pointer;
      background-color: darken(#239d4e, 10%);
    }
  }
}
</style>
