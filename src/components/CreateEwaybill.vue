<template>
  <div class="container">
    <span>
      <h3 class="align-center mt-8 ml-6">Create a new eway-bill</h3>
      <v-form class="ml-6" ref="pdfForm">
        <v-container>
          <v-row justify="center" align="center">
            <v-col md="2">
              <p>Upload Ewaybill</p>
            </v-col>
            <v-col>
              <v-file-input
                v-model="file"
                required
                chips
                label="Upload ewaybill"
                outlined
                dense
                placeholder="Select your files"
                :rules="pdfRules"
                :show-size="1000"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              class="v-btn-submit"
              color="primary"
              @click="uploadEwaybillPdf"
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
              @click="clearAttachment"
            >
              Clear
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </span>
    <h5 class="align-center mt-8 ml-6">Or, Enter details</h5>
    <v-form class="ml-6 mt-4" ref="manualForm">
      <v-container>
        <v-row justify="center" align="center">
          <v-col md="2">
            <p>Ewaybill Number</p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="ewaybill_number"
              type="text"
              outlined
              label="Ewaybill Number"
              :rules="nameRules"
              required
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col md="2">
            <p>Distance</p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="distance"
              type="number"
              outlined
              label="Distance"
              :rules="distanceRules"
              required
              dense
              class="pa-0"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col md="2">
            <p>Generation Time</p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="generation_time"
              type="date"
              outlined
              label="Generation Time"
              required
              dense
              :rules="generationTimeRules"
              :max="nowDate"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col md="2">
            <p>Source Address</p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="source_address"
              type="text"
              outlined
              label="Source Address"
              required
              dense
              :rules="sourceAddressRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col md="2">
            <p>Destination Address</p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="destination_address"
              type="text"
              outlined
              label="Destination Address"
              required
              dense
              :rules="destAddressRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col md="2">
            <p>Party Name</p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="party_name"
              type="text"
              outlined
              label="Party Name"
              required
              dense
              :rules="partyNameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col md="2">
            <p>Vehicle Number</p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="vehicle_number"
              type="text"
              outlined
              label="Vehicle Number"
              required
              dense
              :rules="vehicleNumberRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn class="v-btn-submit" @click="uploadEwaybill" medium>
            Submit
          </v-btn>
          <v-btn
            class="ml-3 mr-4 mb-8"
            outlined
            @click="clearForm"
            text="true"
            medium
            color="primary"
            elevation="0"
          >
            Clear
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import {
  postCreateEwaybill,
  postCreateEwaybillPdf,
} from "../helpers/backend_helper";
import store from "@/store/index";

export default {
  name: "CreateEwaybill",
  data: () => ({
    file: [],
    ewaybill_number: "",
    distance: "",
    generation_time: "",
    source_address: "",
    destination_address: "",
    status: "New",
    vehicle_number: "",
    party_name: "",
    nowDate: new Date().toISOString().slice(0, 10),
    pdfRules: [(v) => !!v || "Ewaybill is required"],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    distanceRules: [
      (v) => !!v || "Distance is required",
      (v) => (v && v >= 0) || "Distance should be positive",
    ],
    generationTimeRules: [(v) => !!v || "Generation time is required"],
    sourceAddressRules: [(v) => !!v || "Source address is required"],
    destAddressRules: [(v) => !!v || "Destination address is required"],
    partyNameRules: [(v) => !!v || "Party Name is required"],
    vehicleNumberRules: [(v) => !!v || "Vehicle Number is required"],
  }),
  methods: {
    async uploadEwaybill() {
      const payload = {
        ewaybillNumber: this.ewaybill_number,
        distance: this.distance,
        generationTime: this.generation_time,
        sourceAddress: this.source_address,
        destAddress: this.destination_address,
        status: this.status,
        vehicleNumber: this.vehicle_number,
        partyName: this.party_name,
      };
      if (this.$refs.manualForm.validate()) {
        const response = postCreateEwaybill(payload);
        console.log("coming here ");
        this.$refs.manualForm.reset();
        console.log(response);
      } else {
        store.dispatch("notifications/setNotificationsList", {
          text: "Error in form. Please fill all fields properly",
          color: "red",
        });
      }
    },
    async uploadEwaybillPdf() {
      if (this.$refs.pdfForm.validate() && this.file != "") {
        await postCreateEwaybillPdf(this.file);
        this.$refs.pdfForm.reset();
      } else {
        store.dispatch("notifications/setNotificationsList", {
          text: "Please upload ewaybill before submitting form",
          color: "red",
        });
      }
    },
    clearAttachment() {
      this.file = [];
    },
    clearForm() {
      this.ewaybill_number = "";
      this.distance = "";
      this.generation_time = "";
      this.source_address = "";
      this.vehicle_number = "";
      this.party_name = "";
    },
  },
};
</script>

<style scoped>
</style>

// remove slash from the end of vehicle number - done
//we have to handle the case when the vehiclenumber is in next line
//12,11
//14 - distance is 0
//13 - nothing
//delivered date should not be future date - done
//100 ewaybills testing - doing
// email table - done
//data should update without refresh - done
//try to fetch data from a table in spring and change this approach
//fix if one condition fails, it does not break out of the function and tries other things
//table designing in frontend
//how to get the scss values from vuetify 
//setup scss files in ewaybill and chalet
//store the token in cookies and expire it 30 mins
//setup notifications in frontend - done
//setup proper messaging in case of errors and all - done
//setup whatsapp setup 
//setup vuetify store in frontend to catch the user details in all pages
//form validation in vuetify - done

