<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
import Login from './views/Login.vue';
export default {
  name: 'App',
  components: {
    Login,
  },
}
</script>

<style>

body {
  margin: 0;
  padding: 0;
}

.app {
  margin: 0;
  padding: 0;
  height: 100vh;
}
</style>
