<template>
    <v-card 
        rounded
        class="mx-auto my-12 p-10"
        max-width="600"
    >
      <div class="container">
        <h3 class="align-center mt-8 ml-6">Please Login to continue</h3>
      </div>
      <v-form class="mx-8 mt-4">
        <v-container>
          <v-row>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="password"
              outlined
              label="Password"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-checkbox
              v-model="rememberMe"
              label="Remember Me"
            ></v-checkbox>
          </v-row>
          <v-row>
            <v-btn
              class="mr-4"
              @click="loginUser"
            >
              Login
            </v-btn>
            <a href="http://localhost:8080/api/auth/user">
              <v-btn >
                Login With Google
              </v-btn>
            </a>
          </v-row>
          <v-row>
            <p class="text-muted mt-8" >If you are new, then please register <span style="color:blue;">
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
      selection: 1,
      email: "",
      password: "",
      rememberMe: false,
    }),

    methods: {
       async loginUser () {
        const response = await postLogin(this.email, this.password)
        store.dispatch("userDetails/setUserDetailsAction", {email:this.email})
        localStorage.setItem('token', response.token);
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
      }
    },
  }
</script>