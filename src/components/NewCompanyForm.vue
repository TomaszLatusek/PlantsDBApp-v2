<template>
  <div>
    <b-button v-b-modal.modal-1 title="Add new company">+</b-button>
    <b-modal id="modal-1" title="Add new company">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.companyname"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "NewCompanyForm",
  data() {
    return {
      companies: [],
      userCategories: [],
      form: {
        companyid: "",
        companyname: "",
      },
      show: true,
    };
  },
  props: {
    companyId: Number,
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.form.companyid = this.companyId + 1;
      axios.post(`${API}/Company`, this.form);
      this.$router.go();
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.companyid = "";
      this.form.companyname = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
