<template>
  <v-card
    outlined
    rounded
    class="mx-auto my-15 p-10 align-center"
    max-width="430"
    elevation="0"
  >
    <v-row align="center" justify="center" class="container mb-3">
      <h3 class="mt-8">Please enter your email to reset password</h3>
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
          <v-btn
            class="mr-4 py-6 mb-7"
            @click="forgotPassword"
            block
            elevation="0"
            color="primary"
            :loading="apiLoading"
          >
            Send link
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { postForgotPassword } from "@/helpers/backend_helper";
export default {
  name: "ForgotPassword",
  data: () => ({
    email: "",
    apiLoading: false,
  }),

  methods: {
    async forgotPassword() {
      const payload = {
        email: this.email,
      };
      this.apiLoading = true;
      const response = await postForgotPassword(payload);
      this.apiLoading = false;
      if (response == true) {
        this.email = "";
      }
      console.log(response);
    },
  },
};
</script>