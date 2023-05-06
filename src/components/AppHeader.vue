<template>
  <div class="nav-class">
    <v-navigation-drawer  
      :mini-variant.sync="mini"
      v-model="drawer"
      app
      dark
      style="backgroundColor: #000022"
      >
      <v-list-item class="">
        <v-list-item-icon>
          <router-link to="/" style="text-decoration:none;">
          <v-img
            src="../assets/images/logo.png"
            max-height="30"
            max-width="30"
          ></v-img>
          </router-link>
        </v-list-item-icon>
        <v-list-item-content>
          <router-link to="/" style="text-decoration:none;">
            <v-list-item-title style="color:white;font-size: 1.4rem;">{{consts.APP_TITLE}}</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mx-2"></v-divider>
      <v-list class="my-2" dense nav >
        <v-list-group
          v-for="(itemHeader, index) in itemHeaders" :key="itemHeader"
          :value="true"
          sub-group
        >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{itemHeader}}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item class="selected-tile my-2"
              active-class="selected-tile-active" 
              v-for="item in items[index]" :key="item" :to="item.title!='Standard Change' ? item.route : null" :href ="item.title=='Standard Change' ? item.link : null" :target="item.title=='Standard Change'?'_blank':null" link >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="list-item-class">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
      <v-app-bar class="flex-grow-0" app>
        <v-app-bar-nav-icon @click.stop="(mini) = !mini"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-menu offset-y rounded="lg" nudge-bottom="12" nudge-left="5">
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list background-color="#3281D5">
            <v-list-item>
              <v-list-item-title class="ml-2 bg-primary">
                  karanjain71@gmail.com
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="redirectToProfile">
              <v-icon class="mx-2">mdi-account</v-icon>
              <v-list-item-title class="text-muted">
                  Profile
              </v-list-item-title>
            </v-list-item>
            <v-divider/>
            <v-list-item >
              <v-btn elevation="0" color="#ebf2fb" class="px-15 py-5 ml-2 mt-3 mb-2" @click="logoutUser" style="color:#3281D5">
                    Logout
              </v-btn>
            </v-list-item>
          </v-list>
      </v-menu>
      </v-app-bar>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';

import consts from '../helpers/constants.js';
// import store from './../store/index'

export default {
  name: 'AppHeader',
  data: () => ({
    consts: consts,
    itemHeaders: [consts.DASHBOARD],
    items: [
        [
          { title: consts.DASHBOARD, icon: 'mdi-home', route: '/' },
          { title: consts.CREATE_EWAYBILL, icon: 'mdi-calculator', route: '/create-ewaybill' },
          { title: consts.COMPLETED, icon: 'mdi-history', route: '/archived-ewaybills' },
        ]
    ],
    drawer: true,
    mini: false,
    dark:false,
  }),
  computed: {
    ...mapGetters({
      userDetails: "userDetails/getUserDetails"
    })
  },
  methods: {
    logoutUser(){
      localStorage.removeItem('ewaybillToken')
      this.$router.push({path: "/login"})
    },
    redirectToProfile(){
      this.$router.push({path: '/profile'})
    }
  }
};
</script>
<style scoped>
  .list-item-class {
    color: #f5f5f5;
  }
  
  .selected-tile:hover {
      border-radius: 4px;
      background: #455A64
  }
  
  .selected-tile-active {
    border-radius: 4px;
    background: rgba(10, 204, 117, 0.19)
  }
</style>
