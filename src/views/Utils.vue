<template>
  <div class="tasksWrapper">
    <SidebarMenu />
    <div id="tableWrapper">
      <div id="tabs">
        <a @click="tab = 1" v-bind:class="tab == 1 ? 'active' : 'inactive'"
          >Types of care</a
        >
        <a @click="tab = 2" v-bind:class="tab == 2 ? 'active' : 'inactive'"
          >Care schedules</a
        >
        <a @click="tab = 3" v-bind:class="tab == 3 ? 'active' : 'inactive'"
          >Palets</a
        >
      </div>
      <TypesOfCare v-if="tab == 1" />
      <CareSchedules v-if="tab == 2" :dateFormat="dateFormat" />
      <Palets v-if="tab == 3" :dateFormat="dateFormat" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SidebarMenu from "../components/SidebarMenu.vue";
import TypesOfCare from "../components/TypesOfCare.vue";
import CareSchedules from "../components/CareSchedules.vue";
import Palets from "../components/Palets.vue";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "tasks",
  components: {
    SidebarMenu,
    TypesOfCare,
    CareSchedules,
    Palets,
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
        console.log("getTasks");
      });
    },
  },
  computed: {
    userId: function () {
      return localStorage.userId;
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
  /* width: 70%; */
  width: 100%;
  margin: 0 auto;
  /* padding-top: 40px; */
}

#tabs {
  display: flex;
  /* width: 70%; */
  width: 100%;
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

