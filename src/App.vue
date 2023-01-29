<template>
  <v-app v-if="this.$route.meta.layout=='AuthLayout'">
    <app-header></app-header>
    <v-main
      style="font-family: Roboto,Helvetica,Arial,sans-serif;background-color: #F8F8FB;"
      class="mt-16 pt-2 ml-4"
    >
      <router-view/>
    </v-main>
      
  </v-app>
  <v-app v-else>
    <v-main
          style="font-family: Roboto,Helvetica,Arial,sans-serif;background-color: #F8F8FB;"
      >
        <router-view />
    </v-main>
  </v-app>
</template>
<script>
import AppHeader from "./components/AppHeader"

export default {
  name: 'App',
  components: {
    AppHeader
},
};
</script>

<style>
  
</style>