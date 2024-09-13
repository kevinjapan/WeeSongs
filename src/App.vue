<script setup>
import AppNav from './components/App/AppNav/AppNav.vue'



// App Root Component


</script>

<template>

   <AppNav />
   
   <main>
      <RouterView />
   </main>

   <AppStatus />

</template>

<style scoped>
main {
   min-height:120vh;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.view_link {
   padding:.5rem;
}
.selected_view {
   background:lightgrey;
}

</style>
