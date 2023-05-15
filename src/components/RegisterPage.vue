<template>
    <v-card 
        rounded
        class="mx-auto my-15 p-10 align-center"
        max-width="450"
        elevation="0"
    >
      <div class="container">
        <h3 class="align-center mt-8 ml-6">Register to E-Tracker</h3>
      </div>
      <v-form class="mx-8 mt-4" v-model="form">
        <v-container>
          <v-row>
            <v-text-field
              v-model="name"
              outlined
              label="Name"
              required
              dense
            ></v-text-field>
          </v-row>
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
            <v-text-field
              v-model="phoneNumber"
              outlined
              label="Phone Number"
              required
              dense
              prefix="+91"	
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="about"
              outlined
              label="About"
              required
              dense
            ></v-text-field>
          </v-row>
          <v-row>
            <v-btn
              class="mr-4 py-6"
              @click="submit"
              block
              elevation="0"
              color="primary"
              :loading="apiLoading"
            >
              Register
            </v-btn>
          </v-row>
          <v-row align="center" justify="center" class="my-3">
            <p class="mt-8" style="font-weight:bold" >Already a member? Log in <span style="color:blue; font-weight: bold">
            <a @click="loginPage">here</a>
            </span> </p>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </template>

<script>
  import {postRegister} from "@/helpers/backend_helper"

  export default {
    name: "RegisterPage",
    data: () => ({
      loading: false,
      show: false,
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      about: "",
      form: {},
      apiLoading: false
    }),

    methods: {
      async submit () {
        this.apiLoading = true
        const payload = {
          "name": this.name,
          "email": this.email,
          "password": this.password,
          "about": this.about
        }
        const response = await postRegister(payload)
        this.apiLoading = false
        if(response == true){
          console.log("clearing the fields")
          this.clear()
        }
      },
      clear () {
        this.email = ""
        this.password = ""
        this.username = ""
        this.about = ""
        this.phoneNumber = ""
        this.name = ""
      },

      loginPage(){
        this.$router.push("/login")
      }
    },
  }
</script>