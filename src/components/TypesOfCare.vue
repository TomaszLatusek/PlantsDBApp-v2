<template>
  <table id="typesOfCare">
    <tr id="headers">
      <th>Id</th>
      <th>Name</th>
      <th><NewTypeOfCareForm :typesId="typesOfCare.length"/></th>
    </tr>
    <tr v-if="typesOfCare.length == 0">
      <td colspan="6" id="no-records">No records to show</td>
    </tr>
    <tr v-for="type in typesOfCare" :key="type.typeofcareid">
      <td>{{ type.typeofcareid }}</td>
      <td>{{ type.typeofcarename }}</td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
import NewTypeOfCareForm from "../components/NewTypeOfCareForm.vue";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "typesOfCare",
  components: {
    NewTypeOfCareForm,
  },
  data() {
    return {
      typesOfCare: [],
    };
  },
  computed: {
    userId: function () {
      return localStorage.userId;
    },
  },
  methods: {
    getTypesOfCare() {
      axios.get(`${API}/TypeOfCare`).then((response) => {
        this.typesOfCare = response.data;
        console.log(response.data);
      });
    },
  },
  beforeMount() {
    this.getTypesOfCare();
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

* {
  font-family: "Roboto", sans-serif;
}

.tasksWrapper {
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

.overdue {
  font-weight: bold;
  color: red;
}
</style>