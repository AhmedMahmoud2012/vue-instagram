<template>
  <div>
    <v-chip
      v-for="user in users"
      class="ma-2"
      :key="user"
      :text-color="user === currentUser?'white':'deep-purple accent-4'"
      :color="user === currentUser?'deep-purple accent-4':'white'"
      @click="fetch_data({username:user})"
    >
      <v-avatar left>
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
      {{user}}
    </v-chip>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { FETCH_DATA } from "../store/types";
import { USERS } from "../consts";
export default {
  name: "Users",
  data() {
    return {
      users: USERS
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    ...mapActions([FETCH_DATA])
  }
};
</script>
