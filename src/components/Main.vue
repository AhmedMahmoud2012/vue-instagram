<template>
  <v-container id="main" fluid>
    <v-row>
      <v-col cols="6">
        <div class="d-flex justify-start mb-12">
          <Users></Users>
        </div>
      </v-col>
      <v-col cols="12">
        <Search></Search>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <List></List>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { DEFAULT_USER } from "../consts";
import { FETCH_DATA } from "../store/types";

import Users from "./Users";
import Search from "./Search";
import List from "./List";

export default {
  name: "Main",
  mounted() {
    this.fetch_data({ username: DEFAULT_USER });
  },
  components: {
    Users,
    Search,
    List
  },
  methods: {
    ...mapActions([FETCH_DATA])
  }
};
</script>
