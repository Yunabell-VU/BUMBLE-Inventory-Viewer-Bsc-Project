<template>
  <div>
    Collaboration Session (id : {{ session.getAttribute("id") }})
    <table class="sessions__table table table-hover">
      <thead>
        <tr>
          <th>Participant</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="participant in participants" :key="participant">
          <td>
            {{ participant.getAttribute("user") }}
          </td>
          <td>
            {{ getRoleValue(participant) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Session",
  props: {
    session: Object,
  },
  data() {
    return {
      participants: [],
    };
  },
  methods: {
    getRoleValue: (participant) =>
      participant.getElementsByTagName("roles")[0].childNodes[0].nodeValue,
  },
  mounted() {
    this.participants = this.session.getElementsByTagName("participants");
  },
};
</script>

<style lang="scss">
@import "../assets/base.scss";
</style>
