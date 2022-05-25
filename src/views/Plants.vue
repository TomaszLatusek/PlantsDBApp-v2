<template>
  <div class="plantsWrapper">
    <SidebarMenu />
    <table id="availableTasks">
      <tr id="headers">
        <th>Name</th>
        <th>Last name</th>
        <th>Email address</th>
        <th>Phone number</th>
        <th>Company</th>
      </tr>
      <tr v-for="worker in workers" :key="worker.usersid">
        <td>{{ worker.name }}</td>
        <td>{{ worker.lastname }}</td>
        <td>{{ worker.mail }}</td>
        <td>{{ worker.phone }}</td>
        <td>{{ worker.companyName }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import SidebarMenu from "../components/SidebarMenu.vue";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "plants",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      plants: [],
    };
  },
  methods: {
    getPlants() {
      axios.get(`${API}/PaletPlantsType`).then((response) => {
        this.plants = response.data;
        console.log(response.data);
      });
    },
  },
  beforeMount() {
    this.getPlants();
  },
};
</script>

<style scoped>
.plantsWrapper {
  margin-left: 250px;
}
</style>