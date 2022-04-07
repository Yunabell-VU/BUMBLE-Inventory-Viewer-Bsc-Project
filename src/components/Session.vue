<template>
  <div>
    Collaboration Session (id : {{ session.id }})
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
            {{ participant.user.$ref }}
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
    getRoleValue: (participant) => participant.role,
  },
  mounted() {
    this.participants = this.session.participants;
  },
};
</script>

<style lang="scss">
@import "../assets/base.scss";
</style>
