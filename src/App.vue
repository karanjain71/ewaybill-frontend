<template>
  <v-app v-if="this.$route.meta.layout == 'AuthLayout'" class="main-styling">
    <app-header></app-header>
    <v-main style="background-color: #f5f8fc" class="mt-16 pt-2 ml-4">
      <router-view />
      <v-snackbar
        auto-height
        color="white"
        multi-line="true"
        max-width="400px"
        v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
        :key="snackbar.text + Math.random()"
        timeout="3500"
        v-model="snackbar.text"
        right
        top
        :style="`top: ${index * 80 + 8}px;`"
      >
        <v-layout
          class="pr-4"
          :style="{ borderLeft: `5px solid ${snackbar.color}` }"
        >
          <v-icon :style="{ color: snackbar.color }" class="pl-2 pr-3" dark>{{
            snackbar.icon
          }}</v-icon>
          <v-layout column>
            <div>
              <strong style="color: black">{{ snackbar.heading }}</strong>
            </div>
            <div style="color: black">{{ snackbar.text }}</div>
          </v-layout>
        </v-layout>
        <template v-slot:action="{}">
          <v-btn icon @click="snackbar.showing = false">
            <v-icon :style="{ color: 'black' }">mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <v-divider inset />
    <v-footer class="ml-4 pt-3 pb-3" color="#F5F8FC">
      <v-row justify="center" no-gutters>
        <v-col class="text-center mt-4" cols="12">
          Copyright
          <v-icon color="black">mdi-copyright</v-icon>
          {{ new Date().getFullYear() }} — <strong>E-Tracker Team</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
  <v-app v-else>
    <v-main style="background-color: #f8f8fb">
      <router-view />
      <v-snackbar
        auto-height
        color="white"
        multi-line="true"
        max-width="400px"
        v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
        :key="snackbar.text + Math.random()"
        timeout="3500"
        v-model="snackbar.text"
        right
        top
        :style="`top: ${index * 80 + 8}px;`"
      >
        <v-layout
          class="pr-4"
          :style="{ borderLeft: `5px solid ${snackbar.color}` }"
        >
          <v-icon :style="{ color: snackbar.color }" class="pl-2 pr-3" dark>{{
            snackbar.icon
          }}</v-icon>
          <v-layout column>
            <div>
              <strong style="color: black">{{ snackbar.heading }}</strong>
            </div>
            <div style="color: black">{{ snackbar.text }}</div>
          </v-layout>
        </v-layout>
        <template v-slot:action="{}">
          <v-btn icon @click="snackbar.showing = false">
            <v-icon :style="{ color: 'black' }">mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import AppHeader from "./components/AppHeader";

export default {
  name: "App",
  components: {
    AppHeader,
  },
  computed: {
    ...mapGetters({
      snackbars: "notifications/getNotificationsList",
    }),
  },
  created() {
    if (localStorage.getItem("ewaybillToken")) {
      this.$store.dispatch("userDetails/setUserDetailsAction", {});
    }
  },
};
</script>

<style>
.main-styling {
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  padding: 0;
  margin: 0;
}
.v-btn-submit {
  box-shadow: none !important;
  margin: 0 4px 8px 3px !important;
  background-color: #3281d5 !important;
  color: white !important;
}
</style>