<template>
  <div>
    <UserDetailsModal :user="worker" />
    <table id="finishedTasks">
      <tr id="headers">
        <th>Palet number</th>
        <th v-if="userId == 0">Worker</th>
        <th>Plant</th>
        <th>Activity</th>
        <th>Realisation date</th>
      </tr>
      <tr v-if="finishedTasks.length == 0">
        <td colspan="6" id="no-records">No records to show</td>
      </tr>
      <tr v-for="task in finishedTasks" :key="task.actualtaskid">
        <td>{{ task.paletid }}</td>
        <td
          v-if="userId == 0"
          v-b-modal.modal-1
          @click="getWorker(task.userid)"
        >
          {{ task.workerName + " " + task.workerLastName }}
        </td>
        <td>{{ task.paletplantstypename || "not specified" }}</td>
        <td>{{ task.typeofcarename }}</td>
        <td>
          {{
            new Date(task.realizationdate).toLocaleDateString(
              "en-US",
              dateFormat
            )
          }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import UserDetailsModal from "../components/UserDetailsModal.vue";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "finished",
  props: {
    tasks: Array,
    dateFormat: Object,
  },
  data() {
    return {
      worker: {},
    };
  },
  components: {
    UserDetailsModal,
  },
  computed: {
    finishedTasks: function () {
      return (this.tasks || [])
        .filter(
          (result) =>
            (result.userid == localStorage.userId &&
              result.realizationdate != null) ||
            (localStorage.userId == 0 && result.realizationdate != null)
        )
        .sort((a, b) => {
          if (a.realizationDate > b.realizationDate) return -1;
          if (a.realizationDate < b.realizationDate) return 1;
          return 0;
        });
    },
    userId: function () {
      return localStorage.userId;
    },
  },
  methods: {
    getTasks() {
      axios.get(`${API}/ActualTaskDedic`).then(async (response) => {
        this.tasks = response.data;
        console.log("getTasks available");
        this.tasks = await Promise.all(
          response.data.map(async (task) => ({
            ...task,
            workerName:
              task.userid > 0 ? (await this.getWorkerName(task)).data.name : "",
            workerLastName:
              task.userid > 0
                ? (
                    await this.getWorkerName(task)
                  ).data.lastname
                : "",
          }))
        );
      });
    },
    getWorker(id) {
      axios.get(`${API}/Users/${id}`).then((response) => {
        this.worker = response.data;
      });
    },
    getWorkerName(task) {
      return axios.get(`${API}/Users/${task.userid || 0}`);
    },
  },
  beforeMount() {
    this.getTasks();
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

#no-records {
  text-align: center;
}
</style>