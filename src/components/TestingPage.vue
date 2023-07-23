<!--<template>
  <v-card
    class="mx-auto mt-10 px-4 py-4"
    max-width="500"
    max-height="600"
    elevation="4"
  >
    <v-range-slider
      :v-model="selectedRange"
      hint="Im a hint"
      max="50"
      min="-50"
      track-color="green"
      track-fill-color="red"
      step="5"
      tick-labels="[a,b,c,d,e,f,g,h,i]"
      height="100"
      tick-size="3"
      thumb-label="always"
      v-on:change="changes"
      v-on:start="values"
      v-on:end="inputs"
      v-on:click="clicking"
      @input="handleRangeSliderInput"
    ></v-range-slider>
  </v-card>
</template>

<script>
/* eslint-disable */

import consts from "../helpers/constants.js";

export default {
  data: () => ({
    consts: consts,
    value1: 5,
    value2: 15,
    minValue: 30,
    maxValue: 0,
    selectedRange: [0, 50],
    previousRange: [0, 50],
  }),
  methods: {
    goToCalendar() {
      this.$router.push("/");
    },
    changes(event) {
      console.log("inside changes", event);
      this.value1 = event[0];
      this.value2 = this.value1 + 10;
      // if (this.value1 > this.value2) {
      //   this.value1 = this.value2;
      // }
      // if (this.value1 < this.value2) {
      //   this.value1 = this.value1;
      // }
    },
    handleRangeSliderInput() {
      console.log("coming here");
    },
    values(event) {
      console.log("inside start", event);
      // this.value1 = event[0];
      // this.value2 = this.value1 + 10;
      // if (this.value1 > this.value2) {
      //   this.value1 = this.value2;
      // }
      // if (this.value1 < this.value2) {
      //   this.value2 = this.value1;
      // }
      // console.log(this.selectedRange, "v-model");
      // console.log(event, "here buddy");
      // console.log(this.value1, this.value2);
    },
    inputs(event) {
      console.log("inside end", event);

      const [minValue, maxValue] = this.selectedRange;
      const [prevMinValue, prevMaxValue] = this.previousRange;
      console.log(minValue, maxValue, prevMinValue, prevMaxValue);
      if (minValue !== prevMinValue && maxValue !== prevMaxValue) {
        console.log("Both handles moved");
      } else if (minValue !== prevMinValue) {
        console.log("Minimum handle moved");
      } else if (maxValue !== prevMaxValue) {
        console.log("Maximum handle moved");
      }

      this.previousRange = [...this.selectedRange];
      console.log(this.value1, this.value2);
    },
    clicking(event) {
      console.log("inside clicking", event);
    },
  },
  watch: {
    value1(newValue) {
      if (newValue > this.maxValue) {
        console.log("here buddy");
        this.minValue = this.maxValue;
      }
    },
    maxValue(newValue) {
      if (newValue < this.minValue) {
        console.log("inside maxVlaue");
        this.maxValue = this.minValue;
      }
    },
  },
};
</script>-->

<template>
  <span>
    <v-range-slider
      v-model="selectedRange"
      max="12"
      min="0"
      ticks="always"
      step="0.5"
      :tick-labels="timers"
      class="custom-range"
      height="150"
      tick-size="3"
      thumb-label="always"
      thumb-color="blue"
      loader-height="40"
      ><template v-slot:thumb-label="props">
        {{ changeValue(props.value * 2) }}
      </template></v-range-slider
    >
    <v-range-slider
      v-model="selectedRange"
      max="12"
      min="0"
      ticks="always"
      step="0.5"
      :tick-labels="timers"
      class="custom-range"
      height="150"
      tick-size="3"
      thumb-label="always"
      thumb-color="blue"
      loader-height="40"
      ><template v-slot:thumb-label="props">
        {{ changeValue(props.value * 2) }}
      </template></v-range-slider
    >
  </span>
</template>

<script>
export default {
  data() {
    return {
      selectedRange: [0, 240],
      previousRange: [0, 240],
      timeGap: 0.5,
      selectedRanges: [25, 50, 75], // Example initial values
      segments: [
        { min: 0, max: 33, color: "red" },
        { min: 33, max: 66, color: "green" },
        { min: 66, max: 100, color: "blue" },
      ],
      timers: [
        "0",
        "",
        "1",
        "",
        "2",
        "",
        "3",
        "",
        "4",
        "",
        "5",
        "",
        "6",
        "",
        "7",
        "",
        "8",
        "",
        "9",
        "",
        "10",
        "",
        "11",
        "",
        "12",
        "",
        "13",
        "",
        "14",
        "",
        "15",
        "",
        "16",
        "",
        "17",
        "",
        "18",
        "",
        "19",
        "",
        "20",
        "",
        "21",
        "",
        "22",
        "",
        "23",
        "",
        "24",
      ],
    };
  },
  computed: {
    getTicks() {
      const ticks = [];
      for (let i = 1; i <= 24; i += this.timeGap) {
        const hour = Math.floor(i);
        const minute = (i % 1) * 60;
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        ticks.push({ label: time, value: i });
      }
      return ticks;
    },
  },
  watch: {
    selectedRange(newValue) {
      // Perform actions or updates based on the new value
      console.log(newValue, this.selectedRange);
      if (newValue[1] != this.previousRange[1]) {
        this.selectedRange[0] = this.selectedRange[1] - 2;
      } else if (newValue[0] != this.previousRange[0]) {
        this.selectedRange[1] = this.selectedRange[0] + 2;
      }
      this.previousRange = this.selectedRange;
      console.log("Selected range updated:", newValue);
    },
  },
  methods: {
    changeValue(val) {
      if (val % 2 == 0) return Math.floor(val / 2) + ":00";
      else return Math.floor(val / 2) + ":30";
    },
  },
};
</script>
<style scoped>
.custom-range-slider .custom-range {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  outline: none;
  border-radius: 4px;
}

.custom-range-slider .custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #ff0000;
  border-radius: 50%;
  cursor: pointer;
}

.range-slider {
  display: flex;
  flex-direction: column;
}

.custom-range {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background-color: var(--segment-color);
  outline: none;
  border-radius: 4px;
}

.custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
}

/* Add more styles for other parts of the component as needed */
</style>


/* Add more styles for other parts of the component as needed */


