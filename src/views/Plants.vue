<template>
  <div class="plantsWrapper">
    <SidebarMenu />
    <ul>
      <li v-for="item in plants" :key="item.paletPlantsTypeId">
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
  name: "plants",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      plants: [],
    };
  },
  methods: {
    getPlants() {
      axios.get(`${API}/PaletPlantsType`).then((response) => {
        this.plants = response.data;
        console.log(response.data);
      });
    },
  },
  beforeMount() {
    this.getPlants();
  },
};
</script>

<style scoped>
.plantsWrapper {
  margin-left: 250px;
}
</style>