<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>
    <v-text-field
      v-model="numberOfFeeds"
      type="number"
      :rules="noOfFeedsRules"
      label="Number of Feeds"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid || loading"
      class="ma-2 white--text"
      color="deep-purple accent-4"
      @click="getFeeds"
    >
      <v-icon left dark>mdi-instagram</v-icon>Get Feeds
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { FETCH_DATA } from "../store/types";
export default {
  name: "Search",
  data: () => ({
    valid: true,
    username: null,
    numberOfFeeds: null,
    usernameRules: [v => !!v || "Username is required"],
    noOfFeedsRules: [
      v => (!!v && Number(v) > 0) || "Number of feeds is required"
    ]
  }),
  computed: {
    ...mapGetters(["currentUser", "currentFeedsNumber", "loading"])
  },
  methods: {
    ...mapActions([FETCH_DATA]),
    getFeeds() {
      if (this.valid) {
        this.fetch_data({
          username: this.username,
          numberOfFeeds: this.numberOfFeeds
        });
      }
    }
  },
  watch: {
    currentUser: function(val) {
      this.username = val;
    },
    currentFeedsNumber: function(val) {
      this.numberOfFeeds = val;
    }
  }
};
</script>
