<template>
  <div>
  <v-snackbar
    v-for="(snackbar, index) in snackbars.filter(s=>s.showing)"
      :key="snackbar.text + Math.random()"
      timeout="3500"
      :color="snackbar.color"
      v-model="snackbar.text"
      right
      :style="`bottom: ${(index * 60) + 8}px`"
    >
    {{snackbar.text}}
    <v-btn text @click="snackbar.showing = false">
      Close
    </v-btn>
  </v-snackbar>
</div>
</template>

<script>

import store from '@/store'
export default {
  name: 'AlertNotifications',
  created() {
    console.log('here man',store.getters["notifications/getNotificationsList"])
  },
  computed: {
    snackbars(){
      return store.getters["notifications/getNotificationsList"]
    }
      
},
}
</script>