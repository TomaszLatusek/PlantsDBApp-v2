<template>
  <div>
    <b-modal id="modal-1" title="Worker details">
      <p class="my-4"><span>Name: </span>{{ user.name }} {{ user.lastname }}</p>
      <p class="my-4"><span>Phone: </span> {{ user.phone }}</p>
      <p class="my-4"><span>Mail: </span> {{ user.mail }}</p>
      <!-- <p class="my-4"><span>Company: </span> {{ user.companyName}}</p> -->
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  props: {
    user: Object,
  },
//   data() {
//       return {
//       company: '',
//     };
//   },
//   methods: {
//     getWorkerCompany(worker) {
//         axios.get(`${API}/Company/${worker.companyid}`).then((response) => {
//             this.company = response.data.companyname;
//             console.log(response.data.companyname)
//         })
//     },
//   },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

* {
  font-family: "Roboto", sans-serif;
}

span {
    font-weight: bold;
}
</style>