<template>
  <loading-screen v-if="loadingScreen"></loading-screen>
  <v-card v-else class="card-design mx-5 mt-5 rounded-lg" outlined>
    <v-card-title>
      Archived Ewaybills
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
      class="table-design"
      :sort-by="sortBy"
      :headers="headers"
      :items="ewaybills"
      :search="search"
      show-select
      mobile-breakpoint="0"
      no-data-text="No archived ewaybills"
    >
      <template v-slot:[`item.generationTime`]="{ item }">
        {{ formatLocalDateTime(item.generationTime) }}
      </template>
      <template v-slot:[`item.deliveredTime`]="{ item }">
        {{ formatLocalDateTime(item.deliveredTime) }}
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
import { getArchivedEwaybills } from "../helpers/backend_helper";
import LoadingScreen from "./LoadingScreen.vue";
import { formatLocalDateTime } from "./../helpers/common_functions";

export default {
  components: { LoadingScreen },
  name: "ArchivedEwaybills",
  data() {
    return {
      sortBy: [{ key: "id", order: "asc" }],
      ewaybills: [],
      search: "",
      loadingScreen: false,
      headers: [
        {
          text: "Number",
          align: "start",
          value: "ewaybillNumber",
          sortable: false,
        },
        { text: "Distance", value: "distance", sortable: false },
        { text: "Generation Time", value: "generationTime", sortable: false },
        { text: "Party Name", value: "partyName", sortable: false },
        { text: "Source Address", value: "sourceAddress", sortable: false },
        { text: "Destination Address", value: "destAddress", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Vehicle Number", value: "vehicleNumber", sortable: false },
        { text: "Delivery Time", value: "deliveredTime", sortable: false },
      ],
    };
  },
  async created() {
    this.loadingScreen = true;
    const response = await getArchivedEwaybills();
    this.ewaybills = response;
    this.loadingScreen = false;
  },
  methods: {
    formatLocalDateTime,
  },
};
</script>

<style lang="scss" scoped>
// .table-design{
//   border-radius: 5px;

// }
.card-design {
  padding-bottom: 20px;
}
// .v-data-table-header[data-v-a2123d40]{
//   background-color: black;
// }
// th{
//   /* background-color: red; */
// }
// .header{
//   background-color: #F8FBFC;
//   color: #80868A;
//   /* color: red; */
// }
// ::v-deep .v-data-table-header {
//   background-color: #EDF0F4;
//   border-radius: 100px;
// }
// ::v-deep .v-data-table {
//   border: 2px solid #EDF0F4;
//   margin: 10px;
//   // margin-bottom: 30px;
//   border-radius: 100px;
// }
// ::v-deep .v-data-footer {
//   margin-bottom: 10px;
//   border-radius: 100px;
//   // margin-bottom: 30px;
// }
// ::v-deep .v-data-table-body {
//   tr{
//     padding: 10px 0;
//   }
// }
</style>