<template>
  <table id="palets">
    <tr id="headers">
      <th>Id</th>
      <th>Palet number</th>
      <th>Plant type</th>
      <th>Date of planting</th>
      <th><NewPaletForm /></th>
    </tr>
    <tr v-if="palets.length == 0">
      <td colspan="6" id="no-records">No records to show</td>
    </tr>
    <tr v-for="palet in palets" :key="palet.paletid">
      <td>{{ palet.paletid }}</td>
      <td>{{ palet.paletnumber }}</td>
      <td>{{ palet.plantType }}</td>
      <td>{{ new Date(palet.dateofplanting).toLocaleDateString("pl-PL") }}</td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
import NewPaletForm from "../components/NewPaletForm.vue";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "palets",
  components: {
    NewPaletForm,
  },
  data() {
    return {
      palets: [],
    };
  },
  computed: {
    userId: function () {
      return localStorage.userId;
    },
  },
  methods: {
    getPalets() {
      axios.get(`${API}/Palet`).then(async (response) => {
        this.palets = response.data;
        console.log(response.data);
        this.palets = await Promise.all(
          response.data.map(async (palet) => ({
            ...palet,
            plantType: (
              await this.getPlantType(palet)
            ).data.paletplantstypename,
          }))
        );
      });
    },
    getPlantType(palet) {
      return axios.get(
        `${API}/PaletPlantsType/${palet.paletplantstypeid || 0}`
      );
    },
  },
  beforeMount() {
    this.getPalets();
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