<template>
  <table id="careSchedules">
    <tr id="headers">
      <th>Id</th>
      <th>Type of care</th>
      <th>Time of care</th>
      <th>Plant type</th>
      <th>Priority</th>
      <th><NewCareScheduleForm /></th>
    </tr>
    <tr v-if="careSchedules.length == 0">
      <td colspan="6" id="no-records">No records to show</td>
    </tr>
    <tr v-for="schedule in careSchedules" :key="schedule.carescheduleid">
      <td>{{ schedule.carescheduleid }}</td>
      <td>{{ schedule.typeOfCare }}</td>
      <td>{{ schedule.timeofcare }}</td>
      <td>{{ schedule.plantType }}</td>
      <td>{{ schedule.prioritynumber }}</td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
import NewCareScheduleForm from "../components/NewCareScheduleForm.vue";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "careSchedules",
  components: {
    NewCareScheduleForm,
  },
  data() {
    return {
      careSchedules: [],
    };
  },
  computed: {
    userId: function () {
      return localStorage.userId;
    },
  },
  methods: {
    getCareSchedules() {
      axios.get(`${API}/CareSchedule`).then(async (response) => {
        this.careSchedules = response.data;
        console.log(response.data);
        this.careSchedules = await Promise.all(
          response.data.map(async (schedule) => ({
            ...schedule,
            typeOfCare: (
              await this.getTypeOfCare(schedule)
            ).data.typeofcarename,
            plantType: (
              await this.getPlantType(schedule)
            ).data.paletplantstypename,
          }))
        );
      });
    },
    getTypeOfCare(schedule) {
      return axios.get(`${API}/TypeOfCare/${schedule.typeofcareid || 0}`);
    },
    getPlantType(schedule) {
      return axios.get(
        `${API}/PaletPlantsType/${schedule.paletplantstypeid || 0}`
      );
    },
  },
  beforeMount() {
    this.getCareSchedules();
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