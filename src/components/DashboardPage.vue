<template>
  <v-card>
    <v-card-title>
      Ewaybills
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="ewaybills"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
    import {getAllEwaybills} from "../helpers/backend_helper"

  export default {
    name: "DashboardPage",
    data () {
      return {
        ewaybills: [],
        search: '',
        headers: [
          {
              text: "Id",
              align: "start",
              sortable: true,
              value: "id"
          },
          { text: 'Number', align: 'start', sortable: false, value: 'ewaybillNumber' },
          { text: 'Distance', value: 'distance' },
          { text: 'Generation Time', value: 'generationTime' },
          { text: 'Source Address', value: 'sourceAddress' },
          { text: 'Destination Address', value: 'destAddress' },
          { text: 'Status', value: 'status' },
          { text: 'Vehicle Number', value: 'vehicleNumber' },
        ],  
      }
    },
    async created(){
        const response = await getAllEwaybills();
        this.ewaybills = response;
        console.log(response);

    },
    methods: {

    }
  }
</script>