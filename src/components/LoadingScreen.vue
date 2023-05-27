<template>
  <v-skeleton-loader
    class="mx-8"
    elevation="24"
    max-width="7000"
    height="700"
    loading-text="Loading data..."
    type="table-heading, table"
  ></v-skeleton-loader>
</template>


<script>
export default {
  name: "LoadingScreen",
};
</script>
