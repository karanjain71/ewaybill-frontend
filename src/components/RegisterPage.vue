<template>
  <v-card
    outlined
    rounded
    class="mx-auto my-15 p-10 align-center"
    max-width="450"
    elevation="0"
  >
    <div class="container">
      <h3 class="align-center mt-8 ml-6">
        Register to E-Tracker for free 90 days trial
      </h3>
    </div>
    <v-form
      class="mx-8 mt-4"
      v-model="form"
      @submit.prevent="registerUser"
      ref="registerForm"
    >
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
            :rules="[rules.required]"
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
            type="submit"
            block
            elevation="0"
            color="primary"
            :loading="apiLoading"
          >
            Register
          </v-btn>
        </v-row>
        <v-row align="center" justify="center" class="my-3">
          <p class="mt-8" style="font-weight: bold">
            Already a member? Log in
            <span style="color: blue; font-weight: bold">
              <a @click="loginPage">here</a>
            </span>
          </p>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { postRegister } from "@/helpers/backend_helper";
import store from "./../store/index";
export default {
  name: "RegisterPage",
  data: () => ({
    loading: false,
    show: false,
    email: "",
    gstNumber: "",
    form: {},
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
    async registerUser() {
      this.apiLoading = true;
      try {
        const payload = {
          email: this.email,
          password: this.password,
          loginCount: 0,
        };
        if (this.$refs.registerForm.validate()) {
          const response = await postRegister(payload);
          this.apiLoading = false;
          if (response == true) {
            this.$refs.registerForm.reset();
          }
        } else {
          console.log("coming here");
          store.dispatch("notifications/setNotificationsList", {
            text: "Error in form. Please fill all fields properly",
            color: "red",
          });
        }
        this.apiLoading = false;
      } catch {
        console.log("eahrjhfjd");
        this.apiLoading = false;
      }
    },
    clear() {
      this.email = "";
      this.password = "";
      this.username = "";
      this.phoneNumber = "";
    },

    loginPage() {
      this.$router.push("/login");
    },
  },
};
</script>