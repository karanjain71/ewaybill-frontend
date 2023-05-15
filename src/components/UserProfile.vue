<template>
  <v-progress-circular model-value="20" v-if="apiLoading"></v-progress-circular>
  <loading-screen v-else-if="loadingScreen"></loading-screen>
  <v-card v-else
    rounded
    class="mx-auto my-4 rounded-lg"
    max-width="1150"
    elevation="0"
    outlined

  >
    <v-list dense>
      <v-subheader>ACCOUNT SETTINGS</v-subheader>
      <v-divider></v-divider>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
      <template v-for="(item, index) in items">

          <v-list-item :key="item.text" two-line @click="openDialog(item)">
            <v-list-item-icon class="py-7">
              <v-icon >{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="flexing">
              <v-list-item-title>{{item.text}} </v-list-item-title>
              <v-list-item-title class="mr-8" v-if="item.id!=='password'">{{userDetails[item.id]}}</v-list-item-title>
              <v-list-item-title class="mr-8" v-else>********</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon class="py-7">
              <v-icon>{{item.endIcon}}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        <v-divider :key="item.text" v-if="index+1<items.length"></v-divider>
      </template>
      </v-list-item-group>
    </v-list>
    <v-dialog
        v-model="dialog"
        max-width="700"
        round
      >
        <v-card>
          <v-card-title class="text-h8 pt-7 pl-9" style="font-weight: 500">
            {{dialogTitle}}
          </v-card-title>
          <v-form >
            <v-text-field
              v-if="dialogFieldName=='email'"
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
              v-else-if="dialogFieldName=='name'"
              label="Update Name" 
              class="mx-9 mt-2 pt-3"
              type="text" 
              v-model="userDetails.name"
              dense
              outlined
              >

            </v-text-field>
            <v-text-field
              v-else-if="dialogFieldName=='additionalEmail'"
              label="Additional Email"
              class="mx-9 mt-2 pt-3"
              type="text" 
              v-model="userDetails.additionalEmail"
              dense
              outlined
              >

            </v-text-field>
            <v-text-field
              v-else-if="dialogFieldName=='phone'"
              label="Phone Number"
              class="mx-9 mt-2 pt-3"
              type="number" 
              prefix="+91"
              v-model="userDetails.phoneNumber"
              dense
              outlined
              >

            </v-text-field>
            <v-text-field
              v-if="dialogFieldName=='password'"
              label="Current Password"
              class="mx-9 mt-2 pt-3"
              v-model="currentPassword"
              outlined
              dense
              :type="showCurrentPassword ? 'text' : 'password'"
            >
            
              <template v-slot:append v-if="!showCurrentPassword"  >
                <v-icon @click="showCurrentPassword=!showCurrentPassword">mdi-eye</v-icon>
              </template>
              <template v-slot:append v-else>
                <v-icon color="primary" @click="showCurrentPassword=!showCurrentPassword">mdi-eye</v-icon>
              </template>
            </v-text-field>
            <v-text-field
              v-if="dialogFieldName=='password'"
              label="New Password"
              class="mx-9  pt-3"
              v-model="newPassword"
              outlined
              dense
              :type="showNewPassword ? 'text' : 'password'"
            >
              <template v-slot:append v-if="!showNewPassword"  >
                <v-icon @click="showNewPassword=!showNewPassword">mdi-eye</v-icon>
              </template>
              <template v-slot:append v-else>
                <v-icon color="primary" @click="showNewPassword=!showNewPassword">mdi-eye</v-icon>
              </template>
            </v-text-field>
            <v-text-field
              v-if="dialogFieldName=='password'"
              label="Confirm Password"
              class="mx-9 pt-3"
              v-model="confirmPassword"
              outlined
              dense
              :type="showConfirmPassword ? 'text' : 'password'"
            >
              <template v-slot:append v-if="!showConfirmPassword"  >
                <v-icon @click="showConfirmPassword=!showConfirmPassword">mdi-eye</v-icon>
              </template>
              <template v-slot:append v-else>
                <v-icon color="primary" @click="showConfirmPassword=!showConfirmPassword">mdi-eye</v-icon>
              </template>
            </v-text-field>
          </v-form>
          <v-card-actions v-if="dialogFieldName!='email'">
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
              @click="dialogFieldName=='password'?resetPassword():updateAccountDetails()"
            >
              Continue
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-card>
  
</template>

<script>

import store from '@/store'
import { updateUserDetails, resetUserPassword } from '@/helpers'
import LoadingScreen from './LoadingScreen.vue';
import { mapGetters } from 'vuex';

export default {
  components: { LoadingScreen },
  name: 'UserProfile',
  data: () => ({
       items: [
        { id: "name", text: 'Name', icon: 'mdi-account-outline', endIcon: 'mdi-chevron-right' },
        { id: "phoneNumber", text: 'Phone Number', icon: 'mdi-phone', endIcon: 'mdi-chevron-right' },
        { id: "email", text: 'Email Address', icon: 'mdi-email-outline', endIcon: 'mdi-chevron-right' },
        { id: "password", text: 'Password', icon: 'mdi-lock', endIcon: 'mdi-chevron-right' },
        { id: "additionalEmail", text: 'Additional Email', icon: 'mdi-email-outline', endIcon: 'mdi-chevron-right' },
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
      apiLoading: false,

  }),
  async created() {
    this.fetchUserDetails()
    // console.log(response)
  },
  computed: {
    snackbars(){
      return store.getters["notifications/getNotificationsList"]
    },
    ...mapGetters({
      userDetails: "userDetails/getUserDetails"
    })
  },
  methods:{
    openDialog(item){

      if(item.id=="email"){
        this.dialogTitle = "Change Your Email"
        this.dialogFieldType = "text"
        this.dialogFieldName = "email"
      }
      else if(item.id=="name"){
        this.dialogTitle = "Update Your Name"
        this.dialogFieldType = "text"
        this.dialogFieldName = "name"

      }
      else if(item.id=="phoneNumber"){
        this.dialogTitle = "Update Your Phone Number"
        this.dialogFieldType = "number"
        this.dialogFieldName = "phone"
      }
      else if(item.id=="password"){
        this.dialogTitle = "Change Your Password"
        this.dialogFieldType = "text"
        this.dialogFieldName = "password"
      }
      else if(item.id=="additionalEmail"){
        this.dialogTitle = "Update Your Additional Email"
        this.dialogFieldType = "text"
        this.dialogFieldName = "additionalEmail"
      }
      this.dialog = true
    },
    closeDialog(){
      this.dialog = false
    },
    async updateAccountDetails(){
      this.apiLoading = true
      await updateUserDetails({
        "email": this.userDetails.email,
        "name": this.userDetails.name,
        "additionalEmail": this.userDetails.additionalEmail,
        "phoneNumber": this.userDetails.phoneNumber
      })
      this.apiLoading = false
      this.dialog = false

      // this.fetchUserDetails()
      store.dispatch('notifications/setNotificationsList', {text: 'Updated User Data Successfully',color: 'green'})

    },
    async fetchUserDetails(){
      this.loadingScreen = true
      // const response = await getUserDetails();
      // this.password = `********`
      // this.email = response?.email
      // this.name = response?.name
      // this.additionalEmail = response?.additionalEmail
      // this.phoneNumber = response?.phoneNumber
      
      this.loadingScreen = false;
    },
    async resetPassword(){
      if(this.confirmPassword === this.newPassword){
        this.apiLoading = true;
        const response = await resetUserPassword({
          "currentPassword": this.currentPassword,
          "newPassword": this.newPassword
        })
        this.apiLoading = false;
        if(response==true){
          this.dialog = false
          this.currentPassword = ""
          this.newPassword = ""
          this.confirmPassword = ""
        }
      }
      else{
        store.dispatch('notifications/setNotificationsList', {text: 'New Password and Confirm Password field values are different',color: 'red'})
      }
      
    }
  }
      
}
</script>

<style scoped>
/* .red_list:hover .v-list-item-group:hover .v-list-item--hover{
  background-color: red;
  color: white;
} */
.flexing{
  display: flex;
  /* flex-direction: row; */
  flex-flow: nowrap;
}
.v-text-field--outlined {
  border-color: red
}
</style>