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
        <th><NewUserForm @submitted="getWorkers()" /></th>
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
import NewUserForm from "../components/NewUserForm.vue";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "workers",
  components: {
    SidebarMenu,
    NewUserForm,
  },
  data() {
    return {
      workers: [],
    };
  },
  methods: {
    getWorkers() {
      axios.get(`${API}/Users`).then(async (response) => {
        this.workers = await Promise.all(
          response.data.map(async (worker) => ({
            ...worker,
            companyName: (await this.getWorkerCompany(worker)).data.companyname,
          }))
        );
      });
    },
    getWorkerCompany(worker) {
      return axios.get(`${API}/Company/${worker.companyid}`);
    },
  },
  mounted() {
    this.getWorkers();
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

* {
  font-family: "Roboto", sans-serif;
}

.workersWrapper {
  margin-left: 250px;
}

.titleRow td {
  background: #43a047;
  color: #ffffff;
}

table {
  /* width: 70%; */
  width: 100%;
  margin: 0 auto;
  text-align: left;
  box-shadow: 2px 2px 4px rgb(60 60 59 / 15%);
  border-collapse: collapse;
  background: #ffffff;
}

tr:hover {
  background: rgb(240, 240, 240);
}

th {
  padding: 10px 0px 10px 15px;
  margin: 0;
  color: white;
  border: 0;
}

td {
  padding: 5px 0px 5px 15px;
}

#headers {
  background: #76b852;
}

input[type="checkbox"]:before {
  position: relative;
  display: block;
  width: 12px;
  height: 12px;
  content: "";
}

input[type="checkbox"]:not(:disabled):hover:before {
  cursor: pointer;
  border-radius: 1px;
}

#no-records {
  text-align: center;
}
</style>