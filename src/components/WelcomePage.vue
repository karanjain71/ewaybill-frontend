<template>
  <v-card
    outlined
    class="mx-auto mt-10 px-4 py-4 rounded-lg"
    max-width="950"
    max-height="600"
    elevation="0"
  >
    <v-row align="center" justify="center" class="container mb-3">
      <h3 class="mt-8">Welcome to E-Tracker</h3>
    </v-row>
    <v-form class="mx-8 mt-4">
      <v-container>
        <v-row>
          <p>Additional Email</p>
        </v-row>
        <v-row>
          <v-text-field
            class="custom-text-field"
            v-model="userDetails.additionalEmail"
            outlined
            label="Enter Additional Email"
            required
            dense
          ></v-text-field>
        </v-row>
        <v-row class="mt-5">
          <p>Please enter time to send daily reminder mail</p>
        </v-row>
        <v-row>
          <v-dialog
            class="dialog-card"
            ref="dialog"
            v-model="modal2"
            :return-value.sync="time"
            width="390px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                outlined
                label="Picker in dialog"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="modal2"
              v-model="time"
              full-width
              @click:hour="closePicker"
              :allowed-minutes="[]"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal2 = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(time)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-row>
        <v-spacer />
        <v-row class="mt-7">
          <v-btn
            @click="submitForm"
            class="v-btn-submit"
            color="primary"
            :loading="apiLoading"
          >
            Submit
          </v-btn>
          <v-btn
            text="true"
            medium
            color="primary"
            elevation="0"
            class="ml-3 mr-4 mb-8"
            outlined
            @click="goToDashboard"
          >
            Skip and continue
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import consts from "../helpers/constants.js";
import { postWelcomePageDetails } from "./../helpers/backend_helper";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    consts: consts,
    additionalEmail: "",
    time: "10:00",
    modal2: false,
    allowedMinutes: [],
    apiLoading: false,
  }),
  methods: {
    goToDashboard() {
      this.$router.push("/");
    },
    async submitForm() {
      this.apiLoading = true;
      const response = await postWelcomePageDetails({
        additionalEmail: this.userDetails.additionalEmail,
        emailTime: this.time,
      });
      this.apiLoading = false;
      //redirect to create ewaybill page after successful
      console.log(JSON.stringify(response));
    },
    closePicker: function (v) {
      this.time = v + ":00";
      console.log(this.time);
    },
  },
  computed: {
    ...mapGetters({
      userDetails: "userDetails/getUserDetails",
    }),
  },
};
</script>

<style scoped>
.custom-text-field input {
  box-shadow: 0 0 0 2px red; /* Set the desired border color */
}
</style>