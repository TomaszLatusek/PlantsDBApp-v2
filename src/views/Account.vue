<template>
  <div class="accountWrapper">
    <SidebarMenu />
    <!-- <ul>
      <li v-for="item in results" :key="item.userId">
        <p><span>Name: </span>{{ item.name }}</p>
        <p><span>Last name: </span>{{ item.lastName }}</p>
        <p><span>Email address: </span>{{ item.mail }}</p>
        <p><span>Phone number: </span>{{ item.phone }}</p>
      </li>
    </ul> -->
    <table v-for="item in results" :key="item.userId">
      <tr>
        <th>Name:</th>
        <td>{{ item.name }}</td>
      </tr>
      <tr>
        <th>Last name:</th>
        <td>{{ item.lastName }}</td>
      </tr>
      <tr>
        <th>Email address:</th>
        <td>{{ item.mail }}</td>
      </tr>
      <tr>
        <th>Phone number:</th>
        <td>{{ item.phone }}</td>
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
  name: "account",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      results: [],
    };
  },
  methods: {
    getAccountDetails() {
      axios.get(`${API}/Users`).then((response) => {
        this.results = response.data;
        console.log(response.data);
      });
    },
  },
  beforeMount() {
    this.getAccountDetails();
  },
};
</script>

<style scoped>

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