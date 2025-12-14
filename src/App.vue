<script setup lang="ts">
import Navbar from './components/NavbarMenu.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
