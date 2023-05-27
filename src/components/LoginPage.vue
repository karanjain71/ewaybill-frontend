<template>
  <v-card
    outlined
    rounded
    class="mx-auto my-15 p-10 align-center"
    max-width="430"
    elevation="0"
  >
    <v-row align="center" justify="center" class="container mb-3">
      <h3 class="mt-8">Log in to E-Tracker</h3>
    </v-row>
    <v-form class="mx-8 mt-4" @submit.prevent="loginUser" ref="loginForm">
      <v-container>
        <v-row>
          <v-text-field
            v-model="email"
            outlined
            label="Email"
            required
            dense
            :rules="[rules.required, rules.email]"
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
            <template v-slot:append v-if="!show">
              <v-icon @click="show = !show">mdi-eye</v-icon>
            </template>
            <template v-slot:append v-else>
              <v-icon color="primary" @click="show = !show">mdi-eye</v-icon>
            </template>
          </v-text-field>
        </v-row>
        <v-row>
          <v-btn
            class="mr-4 py-6"
            block
            elevation="0"
            color="primary"
            :loading="apiLoading"
            type="submit"
          >
            Log in
          </v-btn>
        </v-row>
        <v-row align="center" justify="center">
          <p class="mt-6" style="font-weight: bold">
            <span style="color: blue; font-weight: bold">
              <a @click="forgotPassword">Forgot Password?</a>
            </span>
          </p>
        </v-row>
        <v-row align="center" justify="center" class="my-3">
          <p class="mt-2" style="font-weight: bold">
            Not a member yet? Register
            <span style="color: blue; font-weight: bold">
              <a @click="registerPage">here</a>
            </span>
          </p>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { postLogin } from "@/helpers/backend_helper";
import store from "./../store/index";
import router from "@/router";
export default {
  name: "LoginPage",
  data: () => ({
    loading: false,
    email: "jainkaran049@gmail.com",
    password: "123",
    rememberMe: false,
    show: false,
    apiLoading: false,
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),

  methods: {
    async loginUser() {
      this.apiLoading = true;
      try {
        if (this.$refs.loginForm.validate()) {
          const response = await postLogin(this.email, this.password);
          console.log(response);
          console.log("logging with" + this.email);
          localStorage.setItem("ewaybillToken", response.token);
          store.dispatch("userDetails/setUserDetailsAction", {
            email: this.email,
          });
          if (response.firstLogin === true) {
            router.push("/welcome-page");
          } else {
            router.push("/");
          }
          console.log(response);
        } else {
          store.dispatch("notifications/setNotificationsList", {
            text: "Error in form. Please fill all fields properly",
            color: "red",
          });
        }
        this.apiLoading = false;
      } catch {
        console.log("inside log");
        this.apiLoading = false;
      }
    },
    clear() {
      this.email = "";
      this.password = "";
      this.rememberMe = false;
    },

    registerPage() {
      this.$router.push("/register");
    },
    forgotPassword() {
      this.$router.push("/forgot-password");
    },
  },
};
</script>

<style scoped>
.v-input__icon--append .v-icon {
  color: purple;
}
</style>