<template>
  <div>
    <div id="mySidenav" class="sidenav">
      <router-link to="/tasks" id="tasks">Tasks</router-link>
      <router-link v-if="userId > 0" to="/account" id="account">My Account</router-link>
      <router-link to="/plants" id="plants">Plants</router-link>
      <router-link v-if="userId == 0" to="/workers" id="workers">Workers</router-link>
      <router-link v-if="userId == 0" to="/companies" id="companies">Companies</router-link>
      <router-link v-if="userId == 0" to="/utils" id="utils">Utils</router-link>
      <router-link to="/" id="home">Log out</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarMenu",
  methods: {},
  computed: {
    userId: function () {
      return localStorage.userId;
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

#mySidenav {
  width: 250px;
}
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #76b852;
  padding-top: 40px;
  box-shadow: 2px 2px 4px rgb(60 60 59 / 15%);
}

.sidenav a {
  font-family: "Roboto", sans-serif;
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #ffffff;
  display: block;
  transition: 0.3s;
  /* border-bottom: 1px solid #43a047; */
}

.sidenav a:hover {
  background: #43a047;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

#home {
  width: 100%;
  position:absolute;                
  bottom:0;                        
  left:0;                        
}

/* #home:hover {
  background: #76b852;
} */

</style>
