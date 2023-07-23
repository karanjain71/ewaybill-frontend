<template>
  <v-progress-circular model-value="20" v-if="apiLoading"></v-progress-circular>
  <loading-screen v-else-if="loadingScreen"></loading-screen>
  <v-card v-else class="mx-2 mt-5 rounded-lg" outlined>
    <v-card-title>
      Ewaybills
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search Ewaybills"
        single-line
        hide-details
        outlined
        dense
        clearable
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="ewaybills"
      :search="search"
      show-select
      mobile-breakpoint="0"
      no-data-text="No ewaybills added"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-select
          outlined
          variant="solo"
          class="pa-0 mt-7 v-select"
          v-model="item.status"
          height="5px"
          :items="statusItems"
          :item-value="item.status"
          v-on:change="openDeliveryModal(item)"
          dense
          aria-expanded="false"
        >
          {{ item.status }}
        </v-select>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex">
          <v-icon color="#5F6367" class="mx-1" v-on:click="editEwaybill(item)"
            >mdi-pencil-outline</v-icon
          >
          <v-icon color="#5F6367" v-on:click="deleteEwaybill(item)"
            >mdi-delete-outline</v-icon
          >
        </div>
      </template>
      <template v-slot:[`item.generationTime`]="{ item }">
        {{ formatLocalDateTime(item.generationTime) }}
      </template>
      <template v-slot:[`item.expiryTime`]="{ item }">
        {{ formatLocalDateTime(item.expiryTime) }}
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="dialog-card">
        <v-card-title class="text-h8 pt-7 pl-9" style="font-weight: 500">
          {{ dialogMsg }}
          <v-spacer />
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form v-if="deliveryModal" class="mx-9 mt-3">
          <v-date-picker
            full-width
            v-model="deliveryDate"
            :max="nowDate"
            show-adjacent-months
          ></v-date-picker>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="true"
            color="primary"
            elevation="0"
            class="ml-3 mr-4 mb-8 mt-7"
            outlined
            @click="closeDialog()"
          >
            Cancel
          </v-btn>
          <v-btn
            class="v-btn-submit mr-6"
            color="primary"
            @click="deliveryModal ? changeStatus() : confirmDeleteItem()"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showEditModal" max-width="900">
      <v-card class="dialog-card px-5">
        <v-card-title class="text-h8 pt-7 pl-9" style="font-weight: 500">
          Edit Ewaybill
          <v-spacer />
          <v-icon @click="closeDialog">mdi-close</v-icon>
        </v-card-title>
        <v-form class="ml-6 mt-4" ref="manualForm">
          <v-container>
            <v-row justify="center" align="center">
              <v-col md="2">
                <p>Ewaybill Number</p>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="ewaybillNumber"
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
                  v-model="generationTime"
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
                  v-model="sourceAddress"
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
                  v-model="destinationAddress"
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
                  v-model="partyName"
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
                  v-model="vehicleNumber"
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
              <v-btn class="v-btn-submit" @click="submitEditEwaybill" medium>
                Submit
              </v-btn>
              <v-btn
                class="ml-3 mr-4 mb-8"
                outlined
                @click="clearEditForm"
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
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { formatLocalDateTime } from "@/helpers/common_functions";
import {
  getAllEwaybills,
  updateEwaybill,
  deleteEwaybillItem,
} from "../helpers/backend_helper";
import LoadingScreen from "./LoadingScreen.vue";

export default {
  components: { LoadingScreen },
  name: "DashboardPage",

  data() {
    return {
      hover: false,
      ewaybills: [],
      apiLoading: false,
      loadingScreen: false,
      dialog: false,
      deliveryModal: false,
      deliveryDatePayload: {},
      paymentModal: false,
      deliveryDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      dialogMsg: "",
      statusItems: ["New", "Delivered"],
      selectedStatus: "",
      toBeDeleted: 0,
      search: "",
      showEditModal: false,
      emailTiming: "10:00",
      allowedMinutes: [],
      ewaybillNumber: "",
      distance: "",
      generationTime: "",
      sourceAddress: "",
      destinationAddress: "",
      status: "New",
      vehicleNumber: "",
      partyName: "",
      editId: "",
      nowDate: new Date().toISOString().slice(0, 10),
      pdfRules: [(v) => !!v || "Ewaybill is required"],
      nameRules: [(v) => !!v || "Name is required"],
      distanceRules: [
        (v) => !!v || "Distance is required",
        (v) => (v && v >= 0) || "Distance should be positive",
      ],
      generationTimeRules: [(v) => !!v || "Generation time is required"],
      sourceAddressRules: [(v) => !!v || "Source address is required"],
      destAddressRules: [(v) => !!v || "Destination address is required"],
      partyNameRules: [(v) => !!v || "Party Name is required"],
      vehicleNumberRules: [(v) => !!v || "Vehicle Number is required"],
      headers: [
        {
          text: "Number",
          align: "start",
          sortable: false,
          value: "ewaybillNumber",
        },
        { text: "Distance", value: "distance", sortable: false },
        { text: "Generation Time", value: "generationTime", sortable: false },
        { text: "Source Address", value: "sourceAddress", sortable: false },
        { text: "Destination Address", value: "destAddress", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Vehicle Number", value: "vehicleNumber", sortable: false },
        { text: "Expiry Time", value: "expiryTime", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  async created() {
    this.loadingScreen = true;
    try {
      const response = await getAllEwaybills();
      this.ewaybills = response;
    } catch {
      console.log("Error");
    } finally {
      this.loadingScreen = false;
    }
  },
  methods: {
    async changeStatus() {
      // this.deliveryDate = this.deliveryDate.to;
      let timestamp = Date.parse(this.deliveryDate);
      let date = new Date(timestamp);
      console.log(date, timestamp, this.deliveryDate);
      // this.deliveryDate.setHours(1);
      // this.deliveryDate.setMinutes(0);
      // this.deliveryDate.setSeconds(0);
      // console.log(this.deliveryDate);
      this.deliveryDatePayload.deliveredTime = date;
      await updateEwaybill(this.deliveryDatePayload);
      this.loadingScreen = true;
      this.$nextTick(async () => {
        this.ewaybills = await getAllEwaybills();
      });
      this.loadingScreen = false;
      this.dialog = false;
      this.deliveryModal = false;
    },
    closeDialog() {
      this.status = "New";
      this.dialog = false;
      this.showEditModal = false;
      this.deliveryModal = false;
      this.paymentModal = false;
    },
    openDeliveryModal(payload) {
      if (payload.status === "Delivered") {
        this.dialogMsg = "Please enter delivery date";
        this.dialog = true;
        this.deliveryModal = true;
        this.deliveryDatePayload = payload;
      }
    },
    clearEditForm() {
      this.ewaybillNumber = "";
      this.distance = "";
      this.generationTime = "";
      this.sourceAddress = "";
      this.destinationAddress = "";
      this.partyName = "";
      this.vehicleNumber = "";
    },
    editEwaybill(item) {
      this.showEditModal = true;
      this.editId = item.id;
      this.ewaybillNumber = item.ewaybillNumber;
      this.distance = item.distance;
      console.log([item.generationTime]);
      const year = item.generationTime[0];
      const month = String(item.generationTime[1]).padStart(2, "0"); // Adding 1 to the month since it's zero-indexed
      const day = String(item.generationTime[2]).padStart(2, "0");
      this.generationTime = `${year}-${month}-${day}`;
      this.sourceAddress = item.sourceAddress;
      this.destinationAddress = item.destAddress;
      this.partyName = item.partyName;
      this.vehicleNumber = item.vehicleNumber;
    },
    async submitEditEwaybill() {
      try {
        await updateEwaybill({
          id: this.editId,
          ewaybillNumber: this.ewaybillNumber,
          distance: this.distance,
          generationTime: new Date(this.generationTime),
          sourceAddress: this.sourceAddress,
          destAddress: this.destinationAddress,
          partyName: this.partyName,
          status: this.status,
          vehicleNumber: this.vehicleNumber,
        });
        this.showEditModal = false;
        this.$nextTick(async () => {
          this.ewaybills = await getAllEwaybills();
        });
      } catch (err) {
        console.log(err);
      }
    },
    deleteEwaybill(item) {
      this.dialogMsg = "Are you sure you want to delete this item?";
      this.deliveryModal = false;
      this.dialog = true;
      this.toBeDeleted = item.id;
    },
    async confirmDeleteItem() {
      this.apiLoading = true;
      console.log(this.apiLoading + " apiloading");
      const response = await deleteEwaybillItem(this.toBeDeleted);
      this.ewaybills = await getAllEwaybills();
      this.apiLoading = false;
      console.log("Item deleted successfully" + response);
      this.dialog = false;
    },
    paymentTesting() {
      this.paymentModal = true;
    },
    formatLocalDateTime,
  },
};
</script>


<style>
.text-primary {
  background-color: black;
}
.v-select {
  /* padding-top: 0px; */
  width: 120px;
  border: none;
  padding-top: 2px;
  padding-bottom: 2px;
}
.border-solid {
  border: 1px solid black;
}
</style>
