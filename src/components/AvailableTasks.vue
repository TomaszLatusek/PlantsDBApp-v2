<template>
  <table id="availableTasks">
    <tr id="headers">
      <th>Palet number</th>
      <th>Plant</th>
      <th>Activity</th>
      <th>Due</th>
      <th>Priority</th>
      <th v-if="userId > 0">Action</th>
    </tr>
    <tr v-if="availableTasks.length == 0">
      <td colspan="6" id="no-records">No records to show</td>
    </tr>
    <tr v-for="task in availableTasks" :key="task.actualtaskid">
      <td>{{ task.paletid }}</td>
      <td>{{ task.paletplantstypename || "not specified" }}</td>
      <td>{{ task.typeofcarename }}</td>
      <td>
        <span v-if="getDueDate(task) < new Date()" class="overdue">!</span>
        {{ getDueDate(task).toLocaleDateString("pl-PL", dateFormat) }}
      </td>
      <td>{{ task.prioritynumber }}</td>
      <td v-if="userId > 0">
        <b-dropdown id="dropdown-dropright" dropright class="m-2" size="sm">
          <b-dropdown-item class="dropdown-item"
            ><a @click="takeTask(task)" class="dropdown-item"
              >take</a
            ></b-dropdown-item
          >
        </b-dropdown>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "available",
  props: {
    tasks: Array,
    dateFormat: Object,
  },
  computed: {
    availableTasks: function () {
      return (this.tasks || [])
        .filter((result) => result.userid == null || result.userid < 0)
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
    takeTask(task) {
      this.updateId(task.actualtaskid);
    },
    updateId(taskId) {
      axios
        .put(
          `${API}/ActualTaskDedic/5?actualTaskId=${taskId}&userId=${this.userId}`
        )
        .then(() => {
          this.getTasks();
        });
    },
    getTasks() {
      axios.get(`${API}/ActualTaskDedic`).then((response) => {
        this.tasks = response.data;
        console.log("getTasks available");
      });
    },
    getDueDate(task) {
      var date = new Date(task.dateofplanting);
      date.setDate(date.getDate() + task.timeofcare);
      return date;
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