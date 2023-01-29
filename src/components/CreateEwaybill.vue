<template>

    <div class="container">
        <h3 class="align-center mt-8 ml-6">Create a new eway-bill</h3>
        <v-form class="ml-6 mt-4">
        <v-container>
            <v-row justify="center" align="center">
                <v-col md="2">
                    <p>Ewaybill Number</p>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="ewaybill_number"
                        type="text"
                        outlined
                        label="Ewaybill Number"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center" align="center">
                <v-col md="2">
                    <p>Distance</p>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="distance"
                        type="number"
                        outlined
                        label="Distance"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center" align="center">
                <v-col md="2">
                    <p>Generation Time</p>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="generation_time"
                        type="date"
                        outlined
                        label="Generation Time"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center" align="center">
                <v-col md="2">
                    <p>Source Address</p>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="source_address"
                        type="text"
                        outlined
                        label="Source Address"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center" align="center">
                <v-col md="2">
                    <p>Destination Address</p>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="destination_address"
                        type="text"
                        outlined
                        label="Destination Address"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center" align="center">
                <v-col md="2">
                    <p>Status</p>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="status"
                        type="text"
                        outlined
                        label="Status"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center" align="center">
                <v-col md="2">
                    <p>Vehicle Number</p>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="vehicle_number"
                        type="text"
                        outlined
                        label="Vehicle Number"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-btn
                    class="ml-3 mr-4 mb-8"
                    @click="submit"
                >
                    Submit
                </v-btn>
                <v-btn
                    class="ml-3 mr-4 mb-8"
                >
                    Clear
                </v-btn>
            </v-row>
        </v-container>
        
        </v-form>
    </div>
</template>

<script>
    import {postCreateEwaybill} from "../helpers/backend_helper"
  export default {
    name: "CreateEwaybill",
    data: () => ({
      ewaybill_number: "",
      distance: "",
      generation_time: "",
      source_address: "",
      destination_address: "",
      status: "",
      vehicle_number: "",
    }),
    methods: {
        async submit(){
            const payload = {
                "ewaybillNumber" : this.ewaybill_number,
                "distance" : this.distance,
                "generationTime" : this.eneration_time,
                "sourceAddress" : this.source_address,
                "destAddress" : this.destination_address,
                "status" : this.status,
                "vehicleNumber" : this.vehicle_number
            }
            const response = await postCreateEwaybill(payload)
            console.log(response)

        }
    }
  }
</script>