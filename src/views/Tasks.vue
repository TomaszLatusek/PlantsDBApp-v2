<template>
  <div class="tasksWrapper">
    <SidebarMenu />
    <div id="tableWrapper">
      <div id="tabs">
        <a @click="tab = 1" v-bind:class="tab == 1 ? 'active' : 'inactive'"
          >Available</a
        >
        <a @click="tab = 2" v-bind:class="tab == 2 ? 'active' : 'inactive'"
          >Taken</a
        >
        <a @click="tab = 3" v-bind:class="tab == 3 ? 'active' : 'inactive'"
          >Finished</a
        >
      </div>
      <AvailableTasks
        v-if="tab == 1"
        :tasks="results"
        :dateFormat="dateFormat"
      />
      <TakenTasks
        v-if="tab == 2"
        :tasks="results"
        :dateFormat="dateFormat"
      />
      <FinishedTasks
        v-if="tab == 3"
        :tasks="results"
        :dateFormat="dateFormat"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SidebarMenu from "../components/SidebarMenu.vue";
import AvailableTasks from "../components/AvailableTasks.vue";
import TakenTasks from "../components/TakenTasks.vue";
import FinishedTasks from "../components/FinishedTasks.vue";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "tasks",
  components: {
    SidebarMenu,
    AvailableTasks,
    TakenTasks,
    FinishedTasks,
  },
  data() {
    return {
      results: [],
      tab: 1,
      dateFormat: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    };
  },
  props: {
    id: Number,
  },
  methods: {
    getTasks() {
      axios.get(`${API}/ActualTaskDedic`).then((response) => {
        this.results = response.data;
        console.log("getTasks")
      });
    },
  },
  mounted() {
    console.log(localStorage.userId);
  },
  beforeMount() {
    this.getTasks();
  },
};
</script>



<style scoped>
* {
  font-family: "Roboto", sans-serif;
}

.active {
  background: #76b852;
}

.inative {
  background: #43a047;
}

.tasksWrapper {
  margin-left: 250px;
  height: 100vh;
  background: #eceff1;
}

#tableWrapper {
  width: 70%;
  margin: 0 auto;
  padding-top: 40px;
}

#tabs {
  display: flex;
  width: 70%;
  margin: 0 auto;
  background: #43a047;
}

#tabs a {
  color: white;
  padding: 5px 15px;
  text-decoration: none;
}

#tabs a:hover {
  background: #76b852;
  cursor: pointer;
}
</style>
