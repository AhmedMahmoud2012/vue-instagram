<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center mb-12">
          <v-img
            contain
            lazy-src="@/assets/no_data.png"
            max-height="500"
            max-width="500"
            src="@/assets/no_data.png"
          ></v-img>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NoData"
};
</script>
