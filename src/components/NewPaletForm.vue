<template>
  <div>
    <b-button v-b-modal.modal-1 title="Add new palet">+</b-button>
    <b-modal id="modal-1" title="Add new palet">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <b-form-group
          id="input-group-1"
          label="Palet number:"
          label-for="input-1"
          ><b-form-input
            id="input-1"
            v-model="form.paletnumber"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Plant type:"
          label-for="input-2"
        >
          <b-form-select id="input-2" v-model="form.paletplantstypeid" required>
            <b-form-select-option
              v-for="plant in plants"
              :key="plant.paletplantstypeid"
              :value="plant.paletplantstypeid"
              >{{ plant.paletplantstypename }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>

        <!-- <b-form-group
          id="input-group-3"
          label="Date of planting:"
          label-for="input-3"
        >
          <b-form-datepicker
            id="input-3"
            v-model="form.dateofplanting"
            locale="pl-PL"
            required
          ></b-form-datepicker>
        </b-form-group> -->

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
      plants: [],
      form: {
        paletid: "",
        paletnumber: "",
        paletplantstypeid: "",
        dateofplanting: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios.post(
        `${API}/ActualTaskDedic?paletNumber=${this.form.paletnumber}&paletPlantsTypeId=${this.form.paletplantstypeid}`
      );
      this.$router.go();
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.paletid = "";
      this.form.paletnumber = "";
      this.form.paletplantstypeid = "";
      this.form.dateofplanting = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
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
    this.getPlants();
  },
};
</script>
