<template>
  <table id="takenTasks">
    <tr id="headers">
      <th>Palet number</th>
      <th>Plant</th>
      <th>Activity</th>
      <th>Due</th>
      <th>Priority</th>
      <th>Action</th>
    </tr>
    <tr v-for="task in takenTasks" :key="task.dateOfPlanting">
      <td>{{ task.paletNumber }}</td>
      <td>{{ task.paletPlantsTypeName || "not specified" }}</td>
      <td>{{ task.typeOfCareName }}</td>
      <td>
        {{ new Date(task.timeOfCare).toLocaleDateString("en-US", dateFormat) }}
      </td>
      <td>{{ task.priorityNumber }}</td>
      <td>
        <div class="dropdown">
          <button @click="handleDropdown(task.dateOfPlanting)">></button>
          <div :class="dropdown == task.dateOfPlanting ? 'active' : 'inactive'">
            <a @click="finishTask(task)">finish</a>
            <a @click="resignTask(task)">resign</a>
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>


<script>
export default {
  name: "taken",
  props: {
    tasks: Array,
    userId: Number,
    dateFormat: Object,
  },
  data() {
    return {
      dropdown: "",
    };
  },
  computed: {
    takenTasks: function () {
      return (this.tasks || [])
        .filter((result) => result.userId == -localStorage.id)
        .sort((a, b) => {
          if (a.priorityNumber > b.priorityNumber) return -1;
          if (a.priorityNumber < b.priorityNumber) return 1;
          return 0;
        });
    },
  },
  methods: {
    finishTask(task) {
      this.tasks[this.tasks.indexOf(task)].userId *= -1;
      this.tasks[this.tasks.indexOf(task)].realizationDate = Date.now();
      //TODO: CALL API AND UPDATE DB
    },
    resignTask(task) {
      this.tasks[this.tasks.indexOf(task)].userId = null;
      //TODO: CALL API AND UPDATE DB
    },
    handleDropdown(key) {
      if (key == this.dropdown) {
        this.dropdown = "";
      } else {
        this.dropdown = key;
      }
    },
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
  width: 70%;
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
  padding: 10px 0px 10px 5px;
  margin: 0;
  color: white;
  border: 0;
}

td {
  padding: 5px 0px 5px 5px;
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

/* dropdown Actions */
.dropdown {
  display: block;
  position: relative;
}
.inactive {
  display: none;
}

.active {
  z-index: 2;
  position: absolute;
  background: white;
  box-shadow: 2px 2px 4px 2px rgb(60 60 59 / 15%);
}

.active a {
  display: block;
  position: relative;
  color: #000000;
  padding: 5px;
  text-decoration: none;
  font-size: 14px;
}
.active a:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>