<template>
  <div>
    <b-button  v-b-modal.modal-1 title="Add new type of care">+</b-button>
    <b-modal id="modal-1" title="Add new type of care">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.typeofcarename"
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
  name: "NewTypeOfCareForm",
  data() {
    return {
      typesOfCare: [],
      form: {
        typeofcareid: "",
        typeofcarename: "",
      },
      show: true,
    };
  },
  props: {
    typesId: Number,
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.form.typeofcareid = this.typesId + 1;
      axios.post(`${API}/TypeOfCare`, this.form);
      this.$router.go();
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.typeofcareid = "";
      this.form.typeofcarename = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
