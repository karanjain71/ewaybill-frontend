<template>
  <v-skeleton-loader
    class="mx-auto"
    elevation="24"
    max-width="1100"
    height="600"
    loading-text="Loading data..."
    type="table-heading, table"
  ></v-skeleton-loader>
</template>


<script>

export default({
    name: "LoadingScreen",
})
</script>
