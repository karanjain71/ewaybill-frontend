<template>
  <div></div>
</template>

<script>
import { createOrderId, createOrder } from "@/helpers/backend_helper";
import { mapGetters } from "vuex";
import store from "@/store";
import logo from "./../assets/images/logo.png";
export default {
  name: "RazorpayPayment",
  props: ["payment_amount"],
  data() {
    return {
      orderId: "",
      script: `https://checkout.razorpay.com/v1/checkout.js`,
    };
  },
  methods: {
    async loadRazorPay() {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.setAttribute("width", "200px");
        script.setAttribute("height", "200px");
        script.src = this.script;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          console.log("here");
          resolve(false);
        };
        document.body.appendChild(script);
      });
    },
  },
  async created() {
    console.log(this.payment_amount);
    try {
      const newOrderId = await createOrderId(this.payment_amount);
      const result = await this.loadRazorPay();
      if (!result) {
        console.log("Failed to load razorpay script");
        return;
      }
      const options = {
        key: process.env.VUE_APP_RAZORPAY_KEY,
        amount: this.payment_amount,
        currency: `INR`,
        name: this.userDetails.name,
        image: logo,
        description: `E-tracker subscription`,
        order_id: newOrderId,
        handler: async (response) => {
          console.log(response);
          await createOrder({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            amount: this.payment_amount,
          });
          store.dispatch("userDetails/setUserDetailsAction", {
            email: this.userDetails.email,
          });
          store.dispatch("payments/setPaymentModalAction", false);
        },
        prefill: {
          name: this.userDetails.name,
          email: this.userDetails.email,
          contact: this.userDetails.phoneNumber,
        },
        modal: {
          ondismiss: function () {
            store.dispatch("payments/setPaymentModalAction", false);

            console.log("Checkout form closed");
          },
        },
        remember_customer: true,
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
      });
      paymentObject.on("payment.success", function (response) {
        console.log("Inside success");
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
      });
      paymentObject.open();
    } catch (err) {
      console.log("Error while doing payment ", err);
    }
  },
  computed: {
    snackbars() {
      return store.getters["notifications/getNotificationsList"];
    },
    ...mapGetters({
      userDetails: "userDetails/getUserDetails",
      paymentModal: "payments/getPaymentModal",
    }),
  },
};
</script>

<style scoped>
</style>