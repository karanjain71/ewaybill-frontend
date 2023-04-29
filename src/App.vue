<template>
  <v-app v-if="this.$route.meta.layout=='AuthLayout'" class="main-styling">
    <app-header></app-header>
    <v-main
      style="background-color: #F8F8FB;"
      class="mt-16 pt-2 ml-4"
    >
      <router-view/>
      <v-snackbar auto-height color="white" multi-line="true"
        v-for="(snackbar, index) in snackbars.filter(s=>s.showing)"
        :key="snackbar.text + Math.random()"
        timeout="3500"
        v-model="snackbar.text"
        right
        :style="`bottom: ${(index * 80) + 8}px`"
      >
        <v-layout class="pr-4" :style="{borderLeft: `5px solid ${snackbar.color}`}">
          <v-icon :style="{ color: snackbar.color}" class="pl-2 pr-3" dark>{{snackbar.icon}}</v-icon>
          <v-layout column>
            <div>
              <strong style="color:black">{{snackbar.heading}}</strong>
            </div>
            <div style="color:black">{{snackbar.text}}</div>
          </v-layout>
        </v-layout>
        <template v-slot:action="{  }">
          <v-btn icon @click="snackbar.showing = false">
            <v-icon :style="{ color: 'black'}">mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
      
  </v-app>
  <v-app v-else>
    <v-main
          style="background-color: #F8F8FB;"
      >
        <router-view />
        <v-snackbar auto-height color="white" multi-line="true"
        v-for="(snackbar, index) in snackbars.filter(s=>s.showing)"
        :key="snackbar.text + Math.random()"
        timeout="3500"
        v-model="snackbar.text"
        right
        :style="`bottom: ${(index * 80) + 8}px`"
      >
        <v-layout class="pr-4" :style="{borderLeft: `5px solid ${snackbar.color}`}">
          <v-icon :style="{ color: snackbar.color}" class="pl-2 pr-3" dark>{{snackbar.icon}}</v-icon>
          <v-layout column>
            <div>
              <strong style="color:black">{{snackbar.heading}}</strong>
            </div>
            <div style="color:black">{{snackbar.text}}</div>
          </v-layout>
        </v-layout>
        <template v-slot:action="{  }">
          <v-btn icon @click="snackbar.showing = false">
            <v-icon :style="{ color: 'black'}">mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex';
import AppHeader from "./components/AppHeader"

export default {
  name: 'App',
  components: {
    AppHeader
},
computed: {
  ...mapGetters({
    loadingUser: "chalet/getUserLoading",
    loadingRegion: "metadata/getRegionLoading",
    loadingMetadata: "metadata/getMetadataLoading",
    snackbars: "notifications/getNotificationsList"
  })
},
};
</script>

<style scoped>

  .main-styling{
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    padding: 0;
    margin: 0
  }
</style>