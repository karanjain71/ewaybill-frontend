<template>
    <v-card 
        rounded
        class="mx-auto my-15 p-10 align-center"
        max-width="430"
        elevation="0"
    >
      <v-row align="center" justify="center" class="container mb-3">
        <h3 class="mt-8">Log in to E-Tracker</h3>
      </v-row>
      <v-form class="mx-8 mt-4">
        <v-container>
          <v-row>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              required
              dense
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="password"
              outlined
              label="Password"
              required
              dense
              :type="show ? 'text' : 'password'"
            >
            
              <template v-slot:append v-if="!show"  >
                <v-icon @click="show=!show">mdi-eye</v-icon>
              </template>
              <template v-slot:append v-else>
                <v-icon color="primary" @click="show=!show">mdi-eye</v-icon>
              </template>
            </v-text-field>
          </v-row>
          <v-row>
            <v-btn
              class="mr-4 py-6"
              @click="loginUser"
              block
              elevation="0"
              color="primary"
              :loading="apiLoading"
            >
              Log in
            </v-btn>
            <!-- <a href="http://localhost:8080/api/auth/user">
              <v-btn >
                Login With Google
              </v-btn>
            </a> -->
          </v-row>
          <v-row align="center" justify="center">
            <p class="mt-6" style="font-weight:bold" ><span style="color:blue; font-weight: bold">
            <a @click="forgotPassword">Forgot Password?</a>
            </span> </p>
          </v-row>
          <v-row align="center" justify="center" class="my-3">
            <p class="mt-2" style="font-weight:bold" >Not a member yet? Register <span style="color:blue; font-weight: bold">
            <a @click="registerPage">here</a>
            </span> </p>
          </v-row>
        </v-container>
        
      </v-form>
    </v-card>
  </template>

<script>
import {postLogin} from "@/helpers/backend_helper"
import store from "./../store/index"
import router from '@/router'
  export default {
    name: "LoginPage",
    data: () => ({
      loading: false,
      email: "jainkaran049@gmail.com",
      password: "12345",
      rememberMe: false,
      show: false,
      apiLoading: false
    }),

    methods: {
       async loginUser () {
        this.apiLoading = true
        const response = await postLogin(this.email, this.password)
        console.log("logging with" + this.email)
        this.apiLoading = false
        console.log(response + " printing response")
        localStorage.setItem('ewaybillToken', response.token);
        store.dispatch("userDetails/setUserDetailsAction", {email:this.email})
        router.push('/')
        console.log(response)

      },
      clear () {
        this.email = ''
        this.password = ''
        this.rememberMe = false
      },

      registerPage(){
        this.$router.push("/register")
      },
      forgotPassword(){
        this.$router.push("/forgot-password")
      }
    },
  }
</script>

<style scoped>
  
.v-input__icon--append .v-icon { 
    color: purple;
}
</style>