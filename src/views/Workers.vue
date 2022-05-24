<template>
  <div class="workersWrapper">
    <SidebarMenu />
    <ul>
      <li v-for="item in workers" :key="item.paletPlantsTypeId">
        <p><span>Name: </span>{{ item.paletPlantsTypeName }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import SidebarMenu from "../components/SidebarMenu.vue";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "workers",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      workers: [],
    };
  },
  methods: {
    getWorkers() {
        // TODO:
      axios.get(`${API}/PaletPlantsType`).then((response) => {
        this.workers = response.data;
        console.log(response.data);
      });
    },
  },
  beforeMount() {
    this.getWorkers();
  },
};
</script>

<style scoped>
.workersWrapper {
  margin-left: 250px;
}
</style>