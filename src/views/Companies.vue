<template>
  <div class="companiesWrapper">
    <SidebarMenu />
    <ul>
      <li v-for="item in companies" :key="item.paletPlantsTypeId">
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
  name: "companies",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      companies: [],
    };
  },
  methods: {
    getCompanies() {
        // TODO:
      axios.get(`${API}/PaletPlantsType`).then((response) => {
        this.companies = response.data;
        console.log(response.data);
      });
    },
  },
  beforeMount() {
    this.getCompanies();
  },
};
</script>

<style scoped>
.companiesWrapper {
  margin-left: 250px;
}
</style>