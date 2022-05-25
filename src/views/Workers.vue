<template>
  <div class="workersWrapper">
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
  name: "workers",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      workers: [],
    };
  },
  methods: {
    getWorkers() {
      axios.get(`${API}/Users`).then(async (response) => {
        this.workers = await Promise.all(response.data.map(async worker => ({...worker, companyName: (await this.getWorkerCompany(worker)).data.companyname})));
      });
    },
    getWorkerCompany(worker) {
      return axios.get(`${API}/Company/${worker.companyid}`)
    },
  },
  mounted() {
    this.getWorkers();
  },
};
</script>

<style scoped>
.workersWrapper {
  margin-left: 250px;
}

* {
  font-family: "Roboto", sans-serif;
}

.accountWrapper {
  margin-left: 250px;
}

table {
  margin: 0 auto;
  text-align: left;
  margin-top: 40px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  border-collapse: collapse;
}

tr:hover {
  background: rgb(240, 240, 240);
}

th {
  padding: 10px;
  margin: 0;
  border: 0;
}

td {
  padding: 10px;
}
</style>