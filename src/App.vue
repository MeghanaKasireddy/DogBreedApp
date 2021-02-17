<template>
  <div id="app">
    <NavBar />
    <keep-alive include="BreedList">
      <router-view></router-view>
    </keep-alive>
   
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style>
#app {
  font-family: "Lucida Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
