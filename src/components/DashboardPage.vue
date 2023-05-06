<template>
  <v-progress-circular model-value="20" v-if="apiLoading"></v-progress-circular>
  <loading-screen v-else-if="loadingScreen"></loading-screen>
  <v-card v-else>
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
        no-data-text="No data available"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="ewaybills"
      :search="search"
      show-select
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-select outlined variant="solo" class="pa-0 mt-7 v-select"
        v-model= "item.status"
        height="20px"
        :items="statusItems"
        :item-value="item.status"
        v-on:change="openDeliveryModal(item)"
        aria-expanded="false"
        >
          {{ item.status }}
        </v-select>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div>
        <v-icon color="#6E7478" class="mx-1" v-on:click="editEwaybill(item)">mdi-pencil</v-icon>
        <v-icon color="#6E7478" v-on:click="deleteEwaybill(item)">mdi-delete</v-icon>
        </div>
      </template>
      <template v-slot:[`item.generationTime`]="{item}">
        {{new Date(item.generationTime).toLocaleDateString()}}
      </template>
    </v-data-table>
    <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card>
          <v-card-title class="text-h5">
            {{dialogMsg}}
          </v-card-title>
          <v-form v-if="deliveryModal" class="mx-3">
            <p>Enter delivery Date</p>
            <v-date-picker v-model="deliveryDate" :max="nowDate"
            show-adjacent-months
            ></v-date-picker>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              style="margin: 0 4px 8px 3px;"
              @click="closeDialog()"
            >
              No
            </v-btn>
            <v-btn
              variant="text"
              @click="deliveryModal?changeStatus():confirmDeleteItem()"
              class="v-btn-submit"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-card>
  
</template>

<script>
  import {getAllEwaybills, updateEwaybill, deleteEwaybillItem} from "../helpers/backend_helper"
import LoadingScreen from './LoadingScreen.vue';

  export default {
  components: { LoadingScreen },
    name: "DashboardPage",
    
    data () {
      return {
        ewaybills: [],
        apiLoading: false,
        loadingScreen: false,
        dialog: false,
        deliveryModal: false,
        nowDate: new Date().toISOString().slice(0,10),
        deliveryDatePayload: {},
        deliveryDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dialogMsg: "",
        statusItems: ['New', 'Delivered'],
        selectedStatus: "",
        toBeDeleted: 0,
        search: '',
        headers: [
          { text: 'Number', align: 'start', sortable: false, value: 'ewaybillNumber' },
          { text: 'Distance', value: 'distance', sortable: false },
          { text: 'Generation Time', value: 'generationTime', sortable: false },
          { text: 'Source Address', value: 'sourceAddress', sortable: false },
          { text: 'Destination Address', value: 'destAddress', sortable: false },
          { text: 'Status', value: 'status', sortable: false },
          { text: 'Vehicle Number', value: 'vehicleNumber', sortable: false },
          { text: 'Actions', value: 'actions', width: '10%', sortable: false },
        ],  
      }
    },
    async created(){
        this.loadingScreen = true
        const response = await getAllEwaybills();
        this.loadingScreen = false;
        this.ewaybills = response;
        console.log(this.ewaybills);

    },
    methods: {
      async changeStatus(){
        this.deliveryDatePayload.deliveredTime = this.deliveryDate
        await updateEwaybill(this.deliveryDatePayload)
        this.loadingScreen = true;
        this.$nextTick(async () => {
          this.ewaybills = await getAllEwaybills();
        });
        this.loadingScreen = false
        this.dialog = false
        this.deliveryModal = false
        
      },
      closeDialog(){
        this.dialog = false
        this.deliveryModal = false
      },  
      openDeliveryModal(payload){
        if(payload.status === "Delivered"){
          this.dialogMsg = "Please enter delivery date"
          this.dialog = true
          this.deliveryModal = true
          this.deliveryDatePayload = payload
        }
        
      },
      editEwaybill(item){
        console.log(item)
      },
      deleteEwaybill(item){
        this.dialogMsg = "Are you sure you want to delete this item?"
        this.deliveryModal = false
        this.dialog = true;
        this.toBeDeleted = item.id
      },
      // async updateDeliveryDate(){
      //   const response = await 
      // },
      async confirmDeleteItem(){
        this.apiLoading = true
        console.log(this.apiLoading + " apiloading")
        const response = await deleteEwaybillItem(this.toBeDeleted)
        this.ewaybills = await getAllEwaybills();
        this.apiLoading = false
        console.log("Item deleted successfully" + response)
        this.dialog = false

      }
    }
  }
  // enter delivery date when the user delivers the item
  // add party name field in db and in form also, display it in the email also
  // add regex in all the fields in form
  //red - expired ewaybills  - three categories
  //orange - today
  //yellow - tomorrow
</script>


<style>
  .text-primary{
    background-color: black;
  }
  .v-select{
    /* padding-top: 0px; */
    width: 120px;
    border:none;
    padding-top: 2px;
    padding-bottom: 2px;
  }


</style>
