<template>
  <div>
    <UserDetailsModal :user="worker"/>
    <table id="takenTasks">
      <tr id="headers">
        <th>Palet number</th>
        <th v-if="userId == 0">Worker</th>
        <th>Plant</th>
        <th>Activity</th>
        <th>Due</th>
        <th>Priority</th>
        <th>Action</th>
      </tr>
      <tr v-if="takenTasks.length == 0">
        <td colspan="6" id="no-records">No records to show</td>
      </tr>
      <tr v-for="task in takenTasks" :key="task.actualtaskid">
        <td>{{ task.paletid }}</td>
        <td v-if="userId == 0" v-b-modal.modal-1 @click="getWorker(task.userid)">
          {{ task.workerName + " " + task.workerLastName }}
        </td>
        <td>{{ task.paletplantstypename || "not specified" }}</td>
        <td>{{ task.typeofcarename }}</td>
        <td>
          <span v-if="getDueDate(task) < new Date()" class="overdue">!</span>
          {{ getDueDate(task).toLocaleDateString("pl-PL", dateFormat) }}
        </td>
        <td>{{ task.prioritynumber }}</td>
        <td>
          <b-dropdown id="dropdown-dropright" dropright class="m-2" size="sm">
            <b-dropdown-item @click="finishTask(task)" v-if="userId > 0"
              >finish</b-dropdown-item
            >
            <b-dropdown-item @click="resignTask(task)">resign</b-dropdown-item>
          </b-dropdown>
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
  name: "taken",
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
    takenTasks: function () {
      return (this.tasks || [])
        .filter(
          (result) =>
            (result.userid == this.userId ||
              (this.userId == 0 && result.userid > 0)) &&
            result.realizationdate == null
        )
        .sort((a, b) => {
          if (this.getDueDate(a) < this.getDueDate(b)) return -1;
          if (this.getDueDate(a) > this.getDueDate(b)) return 1;
          if (a.prioritynumber > b.prioritynumber) return -1;
          if (a.prioritynumber < b.prioritynumber) return 1;
          return 0;
        });
    },
    userId: function () {
      return localStorage.userId;
    },
  },
  methods: {
    finishTask(task) {
      const copy = [...this.tasks];
      copy[copy.indexOf(task)].realizationDate = Date.now();
      this.tasks = copy;
      axios
        .put(`${API}/ActualTaskDedic/?actualTaskId=${task.actualtaskid}&userId=${this.userId}`)
        .then(() => {
          this.getTasks();
        });
    },
    resignTask(task) {
      this.updateId(task.actualtaskid);
    },
    updateId(taskId) {
      axios
        .put(`${API}/ActualTaskDedic/5?actualTaskId=${taskId}&userId=-1`)
        .then(() => {
          this.getTasks();
        });
    },
    getTasks() {
      axios.get(`${API}/ActualTaskDedic`).then(async (response) => {
        this.tasks = response.data;
        console.log(response.data);
        this.tasks = await Promise.all(
          response.data.map(async (task) => ({
            ...task,
            workerName: task.userid > 0 ? (await this.getWorkerName(task)).data.name : "",
            workerLastName: task.userid > 0 ? (await this.getWorkerName(task)).data.lastname : "",
          }))
       );
      });
    },
    getWorker(id) {
      axios.get(`${API}/Users/${id}`).then((response) => {
        this.worker = response.data;
      })
    },
    getWorkerName(task) {
      return axios.get(`${API}/Users/${task.userid || 0}`);
    },
    getDueDate(task) {
      var date = new Date(task.dateofplanting);
      date.setDate(date.getDate() + task.timeofcare);
      return date;
    },
  },
  mounted() {
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

input[type="checkbox"]:before {
  position: relative;
  display: block;
  width: 12px;
  height: 12px;
  content: "";
}

input[type="checkbox"]:not(:disabled):hover:before {
  /* background-color: #dad6d6; */
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