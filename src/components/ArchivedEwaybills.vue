<template>
  <v-card class="card-design">
    <v-card-title >
      Archived Ewaybills
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table class="table-design"
      :sort-by="sortBy"
      :headers="headers"
      :items="ewaybills"
      :search="search"
      show-select
    >
    <template v-slot:[`item.generationTime`]="{item}">
        {{new Date(item.generationTime).toLocaleDateString()}}
    </template>
    <template v-slot:[`item.deliveredTime`]="{item}">
        {{new Date(item.deliveredTime).toLocaleDateString()}}
    </template>
    <!-- <template v-slot:header>
      <thead class="header">
        <td v-for="(item,index) in headers" :key="index">
          {{item.text}}
        </td>
      </thead>
    </template> -->
    <!-- <template v-slot:header>
      <tr>
        <th v-for="header in headers"
            :key="header.value">
            {{header.text}}
        </th>
    </tr>
    </template> -->
    <!-- <template v-slot:header>
      This will be injected as the header slot.
    </template> -->
    
    </v-data-table>
  </v-card>
</template>

<script>
  import {getArchivedEwaybills} from "../helpers/backend_helper"

  export default {
    name: "ArchivedEwaybills",
    data () {
      return {
        sortBy: [{ key: 'id', order: 'asc' }],
        ewaybills: [],
        search: '',
        headers: [
          {
              text: "Id",
              align: "start",
              sortable: true,
              value: "id"
          },
          { text: 'Number', align: 'start', value: 'ewaybillNumber' },
          { text: 'Distance', value: 'distance' },
          { text: 'Generation Time', value: 'generationTime' },
          { text: 'Party Name', value: 'partyName' },
          { text: 'Source Address', value: 'sourceAddress' },
          { text: 'Destination Address', value: 'destAddress' },
          { text: 'Status', value: 'status' },
          { text: 'Vehicle Number', value: 'vehicleNumber' },
          { text: 'Delivery Time', value: 'deliveredTime' },
        ],  
      }
    },
    async created(){
        const response = await getArchivedEwaybills();
        this.ewaybills = response

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  // .table-design{
  //   border-radius: 5px;

  // }
  .card-design{
    padding-bottom: 20px;
  }
  .v-data-table-header[data-v-a2123d40]{
    background-color: black;
  }
  th{
    /* background-color: red; */
  }
  .header{
    background-color: #F8FBFC;
    color: #80868A;
    /* color: red; */
  }
  ::v-deep .v-data-table-header {
    background-color: #EDF0F4;
    border-radius: 100px;
  }
  ::v-deep .v-data-table {
    border: 2px solid #EDF0F4;
    margin: 10px;
    // margin-bottom: 30px;
    border-radius: 100px;
  }
  ::v-deep .v-data-footer {
    margin-bottom: 10px;
    border-radius: 100px;
    // margin-bottom: 30px;
  }
  ::v-deep .v-data-table-body {
    tr{
      padding: 10px 0;
    }
  }

</style>