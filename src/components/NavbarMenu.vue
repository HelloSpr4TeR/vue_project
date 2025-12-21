<template>
  <nav class="navbar">
    <router-link to="/">Posts</router-link>
    <router-link to="/tasks">Tasks</router-link>
    <router-link to="/count">Count</router-link>
    <router-link to="/users">Users</router-link>
    <router-link to="/training">Training</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  width: 100vw;
  height: 60px;
  background: green;
  color: white;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
}

a {
  color: white;
  text-decoration: none;
}

.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}
</style>
