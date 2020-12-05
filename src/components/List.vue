<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <v-progress-linear
          v-if="loading"
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>

      <slot v-if="!feeds.length && !loading">
        <v-col cols="12">
          <NoData></NoData>
        </v-col>
      </slot>
      <slot v-else>
        <v-col v-if="feeds.length" cols="12" class="d-flex justify-end mb-12">
          <Filters></Filters>
        </v-col>
        <v-col v-for="feed in feeds" :key="feed.src" cols="12" xl="2" lg="3" md="4" sm="6" xs="12">
          <v-card class="pa-2" flat tile>
            <ListItem :item="feed"></ListItem>
          </v-card>
        </v-col>
      </slot>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ListItem from "./ListItem";
import NoData from "./NoData";
import Filters from "./Filters";

export default {
  name: "List",
  computed: {
    ...mapGetters(["feeds", "loading"])
  },
  components: {
    ListItem,
    NoData,
    Filters
  }
};
</script>
