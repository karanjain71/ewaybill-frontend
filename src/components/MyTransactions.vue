<template>
  <loading-screen v-if="loadingScreen"></loading-screen>
  <v-card v-else class="card-design mx-5 mt-5 rounded-lg" outlined>
    <v-card-title>
      My Transactions
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search Transactions"
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
      :items="transactions"
      :search="search"
      show-select
      mobile-breakpoint="0"
      no-data-text="No transactions yet"
    >
      <template v-slot:[`item.transactionDate`]="{ item }">
        {{ formatLocalDateTime(item.transactionDate) }}
      </template>
      <template v-slot:[`item.amount`]="{ item }">
        <span>&#8377;</span> {{ item.amount / 100 }}
      </template>
    </v-data-table>
  </v-card>
</template>
  
  <script>
import { getMyTransactions } from "../helpers/backend_helper";
import LoadingScreen from "./LoadingScreen.vue";
import { formatLocalDateTime } from "./../helpers/common_functions";

export default {
  components: { LoadingScreen },
  name: "MyTransactions",
  data() {
    return {
      sortBy: [{ key: "id", order: "asc" }],
      transactions: [],
      search: "",
      loadingScreen: false,
      headers: [
        {
          text: "Id",
          align: "start",
          value: "id",
          sortable: false,
        },
        { text: "Order Id", value: "orderId", sortable: false },
        {
          text: "RazorpayPaymentId",
          value: "razorpayPaymentId",
          sortable: false,
        },
        { text: "Amount", value: "amount", sortable: false },
        { text: "Transaction Date", value: "transactionDate", sortable: false },
        { text: "Status", value: "status", sortable: false },
      ],
    };
  },
  async created() {
    this.loadingScreen = true;
    try {
      const response = await getMyTransactions();
      this.transactions = response;
    } catch (err) {
      console.log("Error getting my transactions ", err);
    } finally {
      this.loadingScreen = false;
    }
  },
  methods: {
    formatLocalDateTime,
  },
};
</script>
  
  <style lang="scss" scoped>
.card-design {
  padding-bottom: 20px;
}
</style>