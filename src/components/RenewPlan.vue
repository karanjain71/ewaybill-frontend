<template>
  <v-container>
    <v-row class="d-flex" align="center" justify="center">
      <v-col class="d-flex justify-center">
        <h2 class="my-8">Choose the plan that fits for you</h2>
      </v-col>
    </v-row>
    <v-row class="mx-0" no-gutters>
      <v-col>
        <v-card
          rounded
          :class="
            monthly == false
              ? 'mx-auto my-4 px-6 py-4 rounded-lg card active-card'
              : 'mx-auto my-4 px-6 py-4 rounded-lg card'
          "
          max-width="500px"
          elevation="0"
          outlined
          @click="changePlan('yearly')"
          append="mdi-magnify"
        >
          <div class="ribbon"><span>Best Deal</span></div>
          <v-card-title>Premium Yearly</v-card-title>
          <v-card-title><span>&#8377;</span>100/month</v-card-title>
          <v-card-subtitle class="my-1"
            ><span>&#8377;</span>1,200 paid annually</v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>
    <div class="divider-breaker"><span>or</span></div>

    <!-- <v-divider class="mx-20 my-4" /> -->
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
  border-width: 3px;
}
.card::before {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.57;
  color: #fff;
  position: absolute;
  top: 0.125rem;
  padding: 0.25rem 1rem 0.375rem 1.5rem;
  background-color: #188cd8;
  transform: translateY(-50%);
}

.active-card {
  border: 3px solid #188cd8;
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
.ribbon {
  position: absolute;
  left: -5px;
  top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 75px;
  height: 75px;
  text-align: right;
}
.ribbon span {
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  width: 100px;
  display: block;
  background: #188cd8;
  background: linear-gradient(#188cd8 0%, #188cd8 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px;
  left: -21px;
}
.ribbon span::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid #188cd8;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #188cd8;
}
.ribbon span::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #188cd8;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #188cd8;
}
</style>