<template>
  <v-container>
    <v-row class="d-flex" align="center" justify="center">
      <v-col class="d-flex justify-center">
        <h2 class="my-8">Choose the plan that fits for you</h2>
      </v-col>
    </v-row>
    <v-card
      rounded
      :class="
        monthly == false
          ? 'mx-auto my-4 px-6 py-4 rounded-lg card active-card'
          : 'mx-auto my-4 px-6 py-4 rounded-lg card'
      "
      max-width="500"
      elevation="0"
      outlined
      @click="changePlan('yearly')"
      append="mdi-magnify"
    >
      <!-- <v-icon class="icon-left">mdi-magnify</v-icon> -->
      <v-card-title>Premium Yearly</v-card-title>
      <v-card-title><span>&#8377;</span>100/month</v-card-title>
      <v-card-subtitle class="my-1"
        ><span>&#8377;</span>1,200 paid annually</v-card-subtitle
      >
    </v-card>
    <v-divider class="mx-20 my-4" />
    <v-card
      rounded
      :class="
        monthly == true
          ? 'mx-auto my-4 px-6 py-4 rounded-lg active-card'
          : 'mx-auto my-4 px-6 py-4 rounded-lg card'
      "
      max-width="500"
      elevation="0"
      outlined
      @click="changePlan('monthly')"
    >
      <v-card-title>Premium Monthly</v-card-title>
      <v-card-title><span>&#8377;</span>150/month</v-card-title>
    </v-card>
    <v-row align="center" class="my-9">
      <v-btn class="mx-auto v-btn-submit py-4" @click="openPaymentModal">{{
        planButtonText
      }}</v-btn>
      <razorpay-payment
        :payment_amount="paymentAmount * 100"
        v-if="paymentModal == true"
      />
    </v-row>
  </v-container>
</template>

<script>
import consts from "../helpers/constants.js";
import RazorpayPayment from "../components/RazorpayPayment.vue";
import { mapGetters } from "vuex";
import store from "./../store/index";

export default {
  components: { RazorpayPayment },
  data: () => ({
    consts: consts,
    monthly: false,
    yearly: true,
    planButtonText: "Start your yearly trial",
    paymentAmount: 1200,
  }),
  methods: {
    goToCalendar() {
      this.$router.push("/");
    },
    changePlan(plan) {
      if (plan == "monthly") {
        this.monthly = true;
        this.planButtonText = "Start your monthly trial";
        this.paymentAmount = 150;
      } else {
        this.monthly = false;
        this.planButtonText = "Start your yearly trial";
        this.paymentAmount = 1200;
      }
    },
    openPaymentModal() {
      store.dispatch("payments/setPaymentModalAction", true);
      console.log("hello buddy issue ?" + this.paymentAmount);
      // this.paymentModal = false;
    },
  },
  computed: {
    ...mapGetters({
      paymentModal: "payments/getPaymentModal",
    }),
  },
};
</script>

<style scoped>
.card {
  border-width: 5px;
}
.card::before {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.57;
  color: #fff;
  position: absolute;
  top: 0.125rem;
  padding: 0.25rem 1rem 0.375rem 1.5rem;
  background-color: #0365f2;
  transform: translateY(-50%);
}

.active-card {
  border: 5px solid #3281d5;
}
.card:hover {
  background-color: white;
}
.card:focus {
  background-color: white;
}
.card:active {
  background-color: white;
}
.card::after,
.card::before {
  background-color: white;
}
.v-card--link:focus {
  background-color: white;
}

.v-card--link:focus::before {
  opacity: 0;
}
.hello {
  border: 7px solid black;
}
</style>