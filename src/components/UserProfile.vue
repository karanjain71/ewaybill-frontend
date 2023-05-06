<template>
  <v-card
    rounded
    class="mx-auto my-5"
    max-width="1150"
    elevation="0"
    outlined

  >
    <v-list dense>
      <v-subheader>PROFILE</v-subheader>
      <template v-for="(item, i) in items">
          <v-divider
            v-if="!item"
            :key="`divider-${i}`"
          ></v-divider>

          <v-list-item
            v-else
            :key="`item-${i}`"
            :value="item"
            active-class="deep-purple--text text--accent-4"
          >
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title :v-text="item.text"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="deep-purple accent-4"
                ></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
    </v-list>
  </v-card>
</template>

<script>

import store from '@/store'
export default {
  name: 'UserProfile',
  data: () => ({
       items: [
        { text: 'Name', icon: 'mdi-clock', endIcon: 'mdi-chevron-right' },
        { text: 'Phone Number', icon: 'mdi-account', endIcon: 'mdi-chevron-right' },
        { text: 'Email Address', icon: 'mdi-flag', endIcon: 'mdi-chevron-right' },
      ],
  }),
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