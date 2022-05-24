<template>
  <div class="login-page">
    <div class="form">
      <form class="login-form">
        <input
          type="text"
          placeholder="username"
          id="username"
          v-model="usernameValue"
          @input="handleInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          v-model="passwordValue"
          @input="handleInput"
        />
        <button @click="validateForm">login</button>
        <label v-bind:class="invalidUsername ? 'invalid' : 'valid'" align="left"
          >Invalid credentials</label
        >
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const API = "https://localhost:5001/api";
axios.defaults.headers.common["accept"] = "text/json";

export default {
  name: "login",
  data() {
    return {
      usernameValue: "",
      passwordValue: "",
      invalidUsername: false,
      userId: -1,
    };
  },
  methods: {
    validateForm() {
      axios
        .post(`${API}/LoginDedic`, { MAIL: `${this.usernameValue}` })
        .then((response) => {
          if (response.data != "") {
            console.log(`Welcome ${this.usernameValue}`);

            this.$router.push({
              name: "tasks",
              params: { id: response.data.usersid },
            });

            localStorage.userId = response.data.usersid;
          } else {
            this.invalidUsername = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleInput() {
      this.invalidUsername = false;
    },
  },
  mounted() {
    if (localStorage.userId) {
      this.userId = localStorage.userId;
    }
    console.log(localStorage.userId);
  },
  watch: {
    id(newId) {
      localStorage.userId = newId;
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

* {
  font-family: "Roboto", sans-serif;
}

.login-page {
  width: 100%;
  padding: 8% 0 0;
  margin: auto;
  height: 100vh;
  background: #76b852;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  padding-bottom: 26px;
  text-align: center;
  box-shadow: 2px 2px 4px rgb(60 60 59 / 15%);
}
.form input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.valid {
  color: #ffffff;
}

.invalid {
  color: red;
  font-size: 12px;
}

.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
</style>