<template>
  <div class="companiesWrapper">
    <SidebarMenu />
    <table id="availableTasks">
      <tr id="headers">
        <th>Name</th>
        <th><NewCompanyForm @submitted="getCompanies()" /></th>
      </tr>
      <tr v-for="company in companies" :key="company.companyid">
        <td>{{ company.companyname }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import SidebarMenu from "../components/SidebarMenu.vue";
import NewCompanyForm from "../components/NewCompanyForm.vue";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "companies",
  components: {
    SidebarMenu,
    NewCompanyForm,
  },
  data() {
    return {
      companies: [],
    };
  },
  methods: {
    getCompanies() {
      axios.get(`${API}/Company`).then((response) => {
        this.companies = response.data;
        console.log(response.data);
      });
    },
  },
  mounted() {
    this.getCompanies();
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

* {
  font-family: "Roboto", sans-serif;
}

.companiesWrapper {
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