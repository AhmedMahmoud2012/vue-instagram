<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4" dense dark>
      <v-toolbar-title color="purple">Vue Instgram</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <Main />
    </v-main>
  </v-app>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "App",

  components: {
    Main
  },

  data: () => ({
    //
  })
};
</script>
