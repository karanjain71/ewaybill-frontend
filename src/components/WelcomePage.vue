<template>
  <div>
    <v-card
      outlined
      class="mx-auto mt-10 px-4 rounded-lg mb-10"
      max-width="950"
      elevation="0"
    >
      <v-row align="center" justify="center" class="container mb-3">
        <h3 class="mt-8">Welcome to E-Tracker</h3>
      </v-row>
      <v-form class="mx-8 mt-4">
        <v-container>
          <v-row>
            <p class="requireditem">GST Number</p>
          </v-row>
          <v-row>
            <v-text-field
              class="custom-text-field"
              v-model="userDetails.gstNumber"
              outlined
              label="Enter GST Number"
              required
              dense
            ></v-text-field>
          </v-row>
          <v-row>
            <p class="requireditem">Phone Number</p>
          </v-row>
          <v-row>
            <v-text-field
              v-model="userDetails.phoneNumber"
              outlined
              label="Enter Phone Number"
              required
              dense
            ></v-text-field>
          </v-row>
          <v-row>
            <p>Additional Email</p>
          </v-row>
          <v-row>
            <v-text-field
              class="custom-text-field"
              v-model="userDetails.additionalEmail"
              outlined
              label="Enter Additional Email"
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
              @click="redirectToPath('/create-ewaybill')"
            >
              Skip and continue
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import consts from "../helpers/constants.js";
import { postWelcomePageDetails } from "./../helpers/backend_helper";
import { mapGetters } from "vuex";
import router from "./../router/index";
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
    async submitForm() {
      this.apiLoading = true;
      const response = await postWelcomePageDetails({
        gstNumber: this.userDetails.gstNumber,
        phoneNumber: this.userDetails.phoneNumber,
        additionalEmail: this.userDetails.additionalEmail,
        emailTime: this.time,
      });
      this.apiLoading = false;
      //redirect to create ewaybill page after successful
      console.log(JSON.stringify(response));
      this.redirectToPath("/create-ewaybill");
    },
    closePicker: function (v) {
      this.time = v + ":00";
      console.log(this.time);
    },
    redirectToPath(path) {
      if (router.currentRoute.path !== path) {
        router.push({ path });
      }
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