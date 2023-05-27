<template>
  <div>
    <breadCrumb />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  data: () => ({
    items: [
      {
        title: "Scheduling Assistant",
        icon: "mdi-calculator",
        route: "/effort-calculator",
      },
      { title: "Calendar", icon: "mdi-calendar", route: "/calendar" },
      {
        title: "Change Inventory",
        icon: "mdi-clipboard",
        route: "/change-inventory",
      },
      {
        title: "Team Capacity",
        icon: "mdi-human-male-female",
        route: "/capacity-inventory",
      },
    ],
  }),
};
</script>