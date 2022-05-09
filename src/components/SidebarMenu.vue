<template>
  <div>
    <div id="mySidenav" class="sidenav">
      <router-link to="/tasks" id="tasks">Tasks</router-link>
      <router-link to="/account" id="acccount">My Account</router-link>
      <router-link to="/plants" id="plants">Plants</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarMenu",
  methods: {},
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
  color: #ffffff;
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
</style>
