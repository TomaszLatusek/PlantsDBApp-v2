<template>
  <div>
    <b-button v-b-modal.modal-1 title="Add new care schedule">+</b-button>
    <b-modal id="modal-1" title="Add new care schedule">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-0" label="Id:" label-for="input-0">
          <b-form-input
            id="input-0"
            v-model="form.carescheduleid"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Type of care:"
          label-for="input-1"
        >
          <b-form-select id="input-1" v-model="form.typeofcareid" required>
            <b-form-select-option
              v-for="type in typesOfCare"
              :key="type.typeofcareid"
              :value="type.typeofcareid"
              >{{ type.typeofcarename }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Time of care:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.timeofcare"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Plant type:"
          label-for="input-3"
        >
          <b-form-select id="input-3" v-model="form.paletplantstypeid" required>
            <b-form-select-option
              v-for="plant in plants"
              :key="plant.paletplantstypeid"
              :value="plant.paletplantstypeid"
              >{{ plant.paletplantstypename }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Priority number:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="form.prioritynumber"
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
  name: "NewCareScheduleForm",
  data() {
    return {
      typesOfCare: [],
      plants: [],
      form: {
        carescheduleid: "",
        typeofcareid: "",
        timeofcare: "",
        paletplantstypeid: "",
        prioritynumber: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log(this.form)
      axios.post(`${API}/CareSchedule`, this.form);
      this.$router.go();
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.carescheduleid = "";
      this.form.typeofcareid = "";
      this.form.timeofcare = "";
      this.form.paletplantstypeid = "";
      this.form.prioritynumber = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getTypesOfCare() {
      axios.get(`${API}/TypeOfCare`).then((response) => {
        this.typesOfCare = response.data;
        console.log(this.typesOfCare);
      });
    },
    getPlants() {
      axios.get(`${API}/PaletPlantsType`).then((response) => {
        this.plants = response.data;
        console.log(this.plants);
      });
    },
  },
  mounted() {
    this.getTypesOfCare();
    this.getPlants();
  },
};
</script>
