<template>
  <v-progress-circular model-value="20" v-if="apiLoading"></v-progress-circular>
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
        <v-select outlined variant="solo" class="py-4" density="compact"
        v-model= "item.status"
        height="50px"
        :items="statusItems"
        :item-value="item.status"
        v-on:change="openDeliveryModal(item)"
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
              @click="closeDialog()"
            >
              No
            </v-btn>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="deliveryModal?changeStatus():confirmDeleteItem()"
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

  export default {
    name: "DashboardPage",
    data () {
      return {
        ewaybills: [],
        apiLoading: false,
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
          {
              text: "Id",
              align: "start",
              sortable: true,
              value: "index",
              class: "text-primary"
          },
          { text: 'Number', align: 'start', sortable: false, value: 'ewaybillNumber' },
          { text: 'Distance', value: 'distance' },
          { text: 'Generation Time', value: 'generationTime' },
          { text: 'Source Address', value: 'sourceAddress' },
          { text: 'Destination Address', value: 'destAddress' },
          { text: 'Status', value: 'status' },
          { text: 'Vehicle Number', value: 'vehicleNumber' },
          { text: 'Actions', value: 'actions', width: '10%' },
        ],  
      }
    },
    async created(){
        const response = await getAllEwaybills();
        this.ewaybills = response;
        console.log(this.ewaybills);

    },
    methods: {
      async changeStatus(){
        this.deliveryDatePayload.deliveredTime = this.deliveryDate
        const response = await updateEwaybill(this.deliveryDatePayload)
        this.$nextTick(async () => {
          this.ewaybills = await getAllEwaybills();
        });
        console.log(response)
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


<style scoped>
  .text-primary{
    background-color: black;
  }


</style>
