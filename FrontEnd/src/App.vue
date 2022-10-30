<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <CustomHeader />
    <div id="main">
      <router-view />
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from './layout/CustomHeader.vue'
import CustomFooter from './layout/CustomFooter.vue'

export default {
  name: 'App',
  components: {
    CustomHeader,
    CustomFooter
  }
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
  background-color:#404040;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

#main {
  height: calc(100vh - 180px);
  background-color: white;
}
</style>
