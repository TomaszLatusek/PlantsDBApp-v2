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
    <table>
      <tr>
        <th>Name:</th>
        <td>{{ user.name }}</td>
      </tr>
      <tr>
        <th>Last name:</th>
        <td>{{ user.lastname }}</td>
      </tr>
      <tr>
        <th>Email address:</th>
        <td>{{ user.mail }}</td>
      </tr>
      <tr>
        <th>Phone number:</th>
        <td>{{ user.phone }}</td>
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
      user: {},
    };
  },
  methods: {
    getAccountDetails() {
      axios.get(`${API}/Users/${localStorage.userId}`).then((response) => {
        this.user = response.data;
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
  height: 100vh;
  background: #eceff1;
  padding-top: 40px;
}

table {
  margin: 0 auto;
  text-align: left;
  border-collapse: collapse;
  background: white;
  box-shadow: 2px 2px 4px rgb(60 60 59 / 15%);
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