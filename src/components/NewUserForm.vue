<template>
  <div>
    <b-button v-b-modal.modal-1 title="Add new worker" >+</b-button>
    <b-modal id="modal-1" title="Add new worker">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-6" label="Id:" label-for="input-6">
          <b-form-input
            id="input-6"
            v-model="form.usersid"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Last name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.lastName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Mail:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.mail"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Phone:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.phone"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Birthday:" label-for="input-5">
          <b-form-datepicker
            id="input-5"
            v-model="form.birthday"
            locale="pl-PL"
            required
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group
          id="input-group-7"
          label="User category:"
          label-for="input-7"
        >
          <b-form-select id="input-7" v-model="form.userCategoryid" required>
            <b-form-select-option
              v-for="category in userCategories"
              :key="category.usercategoryid"
              :value="category.usercategoryid"
              >{{ category.usercategoryname }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-group-8" label="Company:" label-for="input-8">
          <b-form-select id="input-8" v-model="form.companyid" required>
            <b-form-select-option
              v-for="company in companies"
              :key="company.companyid"
              :value="company.companyid"
              >{{ company.companyname }}</b-form-select-option
            >
          </b-form-select>
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
  name: "NewUserForm",
  data() {
    return {
      companies: [],
      userCategories: [],
      form: {
        usersid: "",
        name: "",
        lastName: "",
        mail: "",
        phone: "",
        birthday: "",
        userCategoryid: "",
        companyid: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios.post(`${API}/Users`, this.form).then(this.$emit("submitted"));
      this.form.usersid = "";
      this.form.name = "";
      this.form.lastName = "";
      this.form.mail = "";
      this.form.phone = "";
      this.form.birthday = "";
      this.form.userCategoryid = "";
      this.form.companyid = "";
      this.$router.go();
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.lastName = "";
      this.form.email = "";
      this.form.phone = "";
      this.form.birthday = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getCompanies() {
      axios.get(`${API}/Company`).then((response) => {
        this.companies = response.data;
        console.log(this.companies);
      });
    },
    getUserCategories() {
      axios.get(`${API}/UserCategory`).then((response) => {
        this.userCategories = response.data;
        console.log(this.userCategories);
      });
    },
  },
  mounted() {
    this.getCompanies();
    this.getUserCategories();
  },
};
</script>


