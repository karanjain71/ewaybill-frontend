<template>
  <v-card
    rounded
    outlined
    class="mx-auto my-15 p-10 align-center"
    max-width="430"
    elevation="0"
  >
    <v-row align="center" justify="center" class="container mb-3">
      <h3 class="mt-8">Reset Password</h3>
    </v-row>
    <v-form class="mx-8 mt-4">
      <v-container>
        <v-row>
          <v-text-field
            v-model="newPassword"
            outlined
            label="New Password"
            required
            dense
            :type="showNewPassword ? 'text' : 'password'"
          >
            <template v-slot:append v-if="!showNewPassword">
              <v-icon @click="showNewPassword = !showNewPassword"
                >mdi-eye</v-icon
              >
            </template>
            <template v-slot:append v-else>
              <v-icon
                color="primary"
                @click="showNewPassword = !showNewPassword"
                >mdi-eye</v-icon
              >
            </template>
          </v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="confirmPassword"
            outlined
            label="Confirm Password"
            required
            dense
            :type="showConfirmPassword ? 'text' : 'password'"
          >
            <template v-slot:append v-if="!showConfirmPassword">
              <v-icon @click="showConfirmPassword = !showConfirmPassword"
                >mdi-eye</v-icon
              >
            </template>
            <template v-slot:append v-else>
              <v-icon
                color="primary"
                @click="showConfirmPassword = !showConfirmPassword"
                >mdi-eye</v-icon
              >
            </template>
          </v-text-field>
        </v-row>
        <v-row>
          <v-btn
            class="mr-4 py-6 mt-2 mb-6"
            @click="resetPasswordSubmit"
            block
            elevation="0"
            color="primary"
            :loading="apiLoading"
          >
            Reset Password
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import store from "@/store";
import { resetUserPasswordLink } from "./../helpers/backend_helper";

export default {
  name: "ResetPassword",
  data: () => ({
    apiLoading: false,
    showNewPassword: false,
    showConfirmPassword: false,
    newPassword: "",
    confirmPassword: "",
  }),
  created() {
    const token = window.location.search.split("=")[1];
    console.log(token);
  },
  computed: {
    snackbars() {
      return store.getters["notifications/getNotificationsList"];
    },
  },
  methods: {
    async resetPasswordSubmit() {
      const token = window.location.search.split("=")[1];
      if (this.newPassword === this.confirmPassword) {
        this.apiLoading = true;
        try {
          const response = await resetUserPasswordLink({
            newPassword: this.newPassword,
            resetToken: token,
          });
          if (response == true) {
            this.newPassword = "";
            this.confirmPassword = "";
          }
        } catch (e) {
          console.log("Reset password error -", e);
        } finally {
          this.apiLoading = false;
        }
      } else {
        store.dispatch("notifications/setNotificationsList", {
          text: "New Password and Confirm Password field values are different",
          color: "red",
        });
      }
    },
  },
};
</script>