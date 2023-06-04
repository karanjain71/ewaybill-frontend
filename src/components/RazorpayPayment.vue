<template>
  <div></div>
</template>

<script>
import { createOrder } from "@/helpers/backend_helper";
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  name: "RazorpayPayment",
  props: ["payment_amount"],
  data() {
    return {
      script: `https://checkout.razorpay.com/v1/checkout.js`,
    };
  },
  methods: {
    async loadRazorPay() {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = this.script;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    },
  },
  async created() {
    const result = await this.loadRazorPay();
    if (!result) {
      alert("Failed to load razorpay script");
      return;
    }
    const options = {
      key: process.env.VUE_APP_RAZORPAY_KEY,
      amount: this.payment_amount,
      currency: `INR`,
      name: this.userDetails.name,
      description: `E-tracker subscription`,
      order_id: createOrder(this.payment_amount),
      handler: function () {},
      prefill: {
        name: this.userDetails.name,
        email: this.userDetails.email,
        contact: this.userDetails.phoneNumber,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  },
  computed: {
    snackbars() {
      return store.getters["notifications/getNotificationsList"];
    },
    ...mapGetters({
      userDetails: "userDetails/getUserDetails",
    }),
  },
};
</script>

<style>
</style>