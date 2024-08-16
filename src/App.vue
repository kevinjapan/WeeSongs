<script setup>
import AppNav from './components/App/AppNav/AppNav.vue'



// App Root Component


</script>

<template>
   <main>
      <RouterView />
   </main>

   <AppNav />

</template>

<style scoped>
nav {
   height:40px;
   width:100%;
   text-align:right;
   background:white;
   z-index:9999;
}
.fixed {
   position:fixed;
   top:0;
   left:0;
}
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
