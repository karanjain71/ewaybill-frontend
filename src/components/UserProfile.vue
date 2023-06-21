<template>
  <v-progress-circular model-value="20" v-if="apiLoading"></v-progress-circular>
  <loading-screen v-else-if="loadingScreen"></loading-screen>
  <v-container v-else>
    <v-card
      rounded
      class="mx-auto my-4 rounded-lg"
      max-width="1150"
      elevation="0"
      outlined
    >
      <v-list dense>
        <v-subheader class="ml-3">PERSONAL DETAILS</v-subheader>
        <v-divider></v-divider>
        <v-list-item-group v-model="selectedPersonalDetail" color="primary">
          <template v-for="(item, index) in personalDetails">
            <v-list-item :key="item.text" two-line @click="openDialog(item)">
              <v-list-item-icon class="py-7">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="flexing">
                <v-list-item-title>{{ item.text }} </v-list-item-title>
                <v-list-item-title class="mr-8">{{
                  userDetails[item.id]
                }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon class="py-7">
                <v-icon>{{ item.endIcon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-divider
              :key="item.text"
              v-if="index + 1 < personalDetails.length"
            ></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card
      rounded
      class="mx-auto my-4 rounded-lg"
      max-width="1150"
      elevation="0"
      outlined
    >
      <v-list dense>
        <v-subheader class="ml-3">ACCOUNT SETTINGS</v-subheader>
        <v-divider></v-divider>
        <v-list-item-group v-model="selectedAccountSetting" color="primary">
          <template v-for="item in accountSettings">
            <v-list-item :key="item.text" two-line @click="openDialog(item)">
              <v-list-item-icon class="py-7">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="flexing">
                <v-list-item-title>{{ item.text }} </v-list-item-title>
                <v-list-item-title class="mr-8" v-if="item.id === 'password'"
                  >********</v-list-item-title
                >
                <v-list-item-title v-else class="mr-8">{{
                  userDetails[item.id]
                }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon class="py-7">
                <v-icon>{{ item.endIcon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-divider :key="item.text"></v-divider>
          </template>
        </v-list-item-group>
        <v-list-item>
          <v-list-item-icon class="py-7">
            <v-icon>mdi-clock-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="flexing">
            <v-list-item-title>Member Since </v-list-item-title>
            <v-list-item-title class="mr-13 pr-9">
              {{
                formatLocalDateTime(userDetails["memberSince"])
              }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <v-card
      rounded
      class="mx-auto my-4 rounded-lg"
      max-width="1150"
      elevation="0"
      outlined
    >
      <v-list dense>
        <v-subheader class="ml-3">PLAN DETAILS</v-subheader>
        <v-divider></v-divider>
        <template>
          <v-list-item v-for="(item, i) in planDetails" two-line :key="i">
            <v-list-item-icon class="py-7">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="flexing">
              <v-list-item-title>{{ item.text }} </v-list-item-title>
              <v-list-item-title class="mr-8" v-if="item.id === 'planType'"
                >Your {{ userDetails["planType"] }} plan expires on
                {{
                  formatLocalDateTime(userDetails["planValidTillTime"])
                }}</v-list-item-title
              >
              <v-list-item-title v-else class="mr-8">{{
                userDetails[item.id]
              }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon class="py-3">
              <v-btn class="v-btn-submit" @click="renewPlan">Renew Now</v-btn>
            </v-list-item-icon>
          </v-list-item>
          <v-divider
            :key="item.text"
            v-if="index + 1 < planDetails.length"
          ></v-divider>
        </template>
      </v-list>
    </v-card>
    <v-card
      rounded
      class="mx-auto my-4 rounded-lg"
      max-width="1150"
      elevation="0"
      outlined
    >
      <v-list dense>
        <v-subheader class="ml-3">SOCIAL LOGINS</v-subheader>
        <v-divider></v-divider>
        <template>
          <v-list-item v-for="(item, i) in socialLogins" two-line :key="i">
            <v-list-item-icon class="py-7">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="flexing">
              <v-list-item-title>{{ item.text }} </v-list-item-title>
              <v-list-item-title class="mr-13 pr-9">
                <v-icon
                  color="green"
                  v-if="userDetails['googleLoginEnabled'] === true"
                  >mdi-check</v-icon
                >
                <v-icon color="red" v-else>mdi-alpha-x-circle-outline</v-icon>
                {{
                  userDetails["googleLoginEnabled"] === true
                    ? "Enabled"
                    : "Disabled"
                }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider
            :key="item.text"
            v-if="index + 1 < socialLogins.length"
          ></v-divider>
        </template>
      </v-list>
    </v-card>
    <v-dialog v-model="dialog" max-width="700" round>
      <v-card class="dialog-card">
        <v-card-title class="text-h8 pt-7 pl-9" style="font-weight: 500">
          {{ dialogTitle }}
          <v-spacer />
          <v-icon @click="closeDialog">mdi-close</v-icon>
        </v-card-title>
        <v-form>
          <v-card-subtitle
            v-if="dialogFieldName == 'gstNumber'"
            style="color: red"
            class="pl-9"
          >
            GST Number cannot be changed
          </v-card-subtitle>
          <v-text-field
            v-if="dialogFieldName == 'email'"
            label="Update Email"
            class="mx-9 mt-2 pt-3"
            type="text"
            v-model="userDetails.email"
            disabled
            dense
            outlined
          >
          </v-text-field>
          <v-text-field
            v-else-if="dialogFieldName == 'gstNumber'"
            label="Update GST Number"
            class="mx-9 pt-3"
            type="text"
            v-model="userDetails.gstNumber"
            dense
            disabled
            outlined
          >
          </v-text-field>
          <v-text-field
            v-else-if="dialogFieldName == 'additionalEmail'"
            label="Additional Email"
            class="mx-9 mt-2 pt-3"
            type="text"
            v-model="userDetails.additionalEmail"
            dense
            outlined
          >
          </v-text-field>

          <v-text-field
            v-else-if="dialogFieldName == 'phone'"
            label="Phone Number"
            class="mx-9 mt-2 pt-3"
            type="number"
            prefix="+91"
            v-model="userDetails.phoneNumber"
            dense
            outlined
          >
          </v-text-field>
          <v-time-picker
            v-else-if="dialogFieldName == 'emailTime'"
            label="Email Time"
            class="mx-9 mt-2 pt-3"
            v-model="userDetails.emailTime"
            dense
            outlined
            :allowed-minutes="[]"
          >
          </v-time-picker>
          <v-text-field
            v-if="dialogFieldName == 'password'"
            label="Current Password"
            class="mx-9 mt-2 pt-3"
            v-model="currentPassword"
            outlined
            dense
            :type="showCurrentPassword ? 'text' : 'password'"
          >
            <template v-slot:append v-if="!showCurrentPassword">
              <v-icon @click="showCurrentPassword = !showCurrentPassword"
                >mdi-eye</v-icon
              >
            </template>
            <template v-slot:append v-else>
              <v-icon
                color="primary"
                @click="showCurrentPassword = !showCurrentPassword"
                >mdi-eye</v-icon
              >
            </template>
          </v-text-field>
          <v-text-field
            v-if="dialogFieldName == 'password'"
            label="New Password"
            class="mx-9 pt-3"
            v-model="newPassword"
            outlined
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
          <v-text-field
            v-if="dialogFieldName == 'password'"
            label="Confirm Password"
            class="mx-9 pt-3"
            v-model="confirmPassword"
            outlined
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
        </v-form>
        <v-card-actions v-if="dialogFieldName != 'email'">
          <v-spacer></v-spacer>
          <v-btn
            text="true"
            color="primary"
            elevation="0"
            class="ml-3 mr-4 mb-8 mt-6"
            outlined
            dense
            :loading="apiLoading"
            @click="closeDialog()"
          >
            Cancel
          </v-btn>
          <v-btn
            class="v-btn-submit mr-6"
            color="primary"
            :loading="apiLoading"
            @click="
              dialogFieldName == 'password'
                ? resetPassword()
                : updateAccountDetails()
            "
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import store from "@/store";
import { updateUserDetails, resetUserPassword } from "@/helpers";
import LoadingScreen from "./LoadingScreen.vue";
import { mapGetters } from "vuex";
import { formatLocalDateTime } from "./../helpers/common_functions";

export default {
  components: { LoadingScreen },
  name: "UserProfile",
  data: () => ({
    personalDetails: [
      {
        id: "gstNumber",
        text: "GST Number",
        icon: "mdi-account-outline",
        endIcon: "mdi-chevron-right",
      },
      {
        id: "phoneNumber",
        text: "Phone Number",
        icon: "mdi-phone-outline",
        endIcon: "mdi-chevron-right",
      },
      {
        id: "additionalEmail",
        text: "Additional Email",
        icon: "mdi-email-outline",
        endIcon: "mdi-chevron-right",
      },
      {
        id: "emailTime",
        text: "Email Timing",
        icon: "mdi-clock-outline",
        endIcon: "mdi-chevron-right",
      },
    ],
    accountSettings: [
      {
        id: "email",
        text: "Email Address",
        icon: "mdi-email-outline",
        endIcon: "mdi-chevron-right",
      },
      {
        id: "password",
        text: "Password",
        icon: "mdi-lock-outline",
        endIcon: "mdi-chevron-right",
      },
    ],
    planDetails: [
      {
        id: "planType",
        text: "Plan Type",
        icon: "mdi-clock-outline",
        endIcon: "mdi-chevron-right",
      },
    ],
    socialLogins: [
      {
        id: "googleLoginEnabled",
        text: "Google",
        icon: "mdi-share-variant-outline",
      },
    ],
    dialog: false,
    phoneNumber: "",
    password: "",
    updatedValue: "",
    dialogTitle: "",
    dialogSubmitMessage: "",
    dialogCancelMessage: "",
    dialogFieldType: "",
    dialogFieldName: "",
    loadingScreen: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
    planType: "",
    planValidTillTime: "",
    apiLoading: false,
  }),
  async created() {
    this.fetchUserDetails();
    // console.log(response)
  },
  computed: {
    snackbars() {
      return store.getters["notifications/getNotificationsList"];
    },
    ...mapGetters({
      userDetails: "userDetails/getUserDetails",
    }),
  },
  methods: {
    openDialog(item) {
      if (item.id == "email") {
        this.dialogTitle = "Change Your Email";
        this.dialogFieldType = "text";
        this.dialogFieldName = "email";
      } else if (item.id == "gstNumber") {
        this.dialogTitle = "Update Your GST Number";
        this.dialogFieldType = "text";
        this.dialogFieldName = "gstNumber";
      } else if (item.id == "phoneNumber") {
        this.dialogTitle = "Update Your Phone Number";
        this.dialogFieldType = "number";
        this.dialogFieldName = "phone";
      } else if (item.id == "password") {
        this.dialogTitle = "Change Your Password";
        this.dialogFieldType = "text";
        this.dialogFieldName = "password";
      } else if (item.id == "additionalEmail") {
        this.dialogTitle = "Update Your Additional Email";
        this.dialogFieldType = "text";
        this.dialogFieldName = "additionalEmail";
      } else if (item.id == "emailTime") {
        this.dialogTitle = "Update Your Email Timings";
        this.dialogFieldName = "emailTime";
      } else if (item.id == "planType") {
        this.dialogTitle = "Your plan settings";
      }
      this.dialog = true;
    },
    renewPlan() {
      this.$router.push("/renew-plan");
    },
    closeDialog() {
      this.dialog = false;
    },
    async updateAccountDetails() {
      this.apiLoading = true;
      await updateUserDetails({
        email: this.userDetails.email,
        additionalEmail: this.userDetails.additionalEmail,
        phoneNumber: this.userDetails.phoneNumber,
        emailTime: this.userDetails.emailTime,
      });
      this.apiLoading = false;
      this.dialog = false;

      // this.fetchUserDetails()
      store.dispatch("notifications/setNotificationsList", {
        text: "Updated User Data Successfully",
        color: "green",
      });
    },
    async fetchUserDetails() {
      this.loadingScreen = true;
      // const response = await getUserDetails();
      // this.password = `********`
      // this.email = response?.email
      // this.name = response?.name
      // this.additionalEmail = response?.additionalEmail
      // this.phoneNumber = response?.phoneNumber

      this.loadingScreen = false;
    },
    async resetPassword() {
      if (this.confirmPassword === this.newPassword) {
        this.apiLoading = true;
        const response = await resetUserPassword({
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        });
        this.apiLoading = false;
        if (response == true) {
          this.dialog = false;
          this.currentPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";
        }
      } else {
        store.dispatch("notifications/setNotificationsList", {
          text: "New Password and Confirm Password field values are different",
          color: "red",
        });
      }
    },
    formatLocalDateTime,
  },
};
</script>

<style scoped>
/* .red_list:hover .v-list-item-group:hover .v-list-item--hover{
  background-color: red;
  color: white;
} */
.flexing {
  display: flex;
  /* flex-direction: row; */
  flex-flow: nowrap;
}
.v-text-field--outlined {
  border-color: red;
}
</style>