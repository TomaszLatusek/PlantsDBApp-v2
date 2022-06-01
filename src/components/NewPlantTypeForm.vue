<template>
  <div>
    <b-button v-b-modal.modal-1 title="Add new plant type">+</b-button>
    <b-modal id="modal-1" title="Add new plant type">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <!-- <b-form-group id="input-group-0" label="Id:" label-for="input-0">
          <b-form-input
            id="input-0"
            v-model="form.paletplantstypeid"
          ></b-form-input>
        </b-form-group> -->

        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.paletplantstypename"
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
  name: "NewPlantTypeForm",
  data() {
    return {
      form: {
        paletplantstypeid: "",
        paletplantstypename: "",
      },
      show: true,
    };
  },
  props: {
    plantId: Number,
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.form.paletplantstypeid = this.plantId + 1;
      console.log(this.form);
      axios.post(`${API}/PaletPlantsType`, this.form);
      this.$router.go();
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.paletplantstypeid = "";
      this.form.paletplantstypename = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
