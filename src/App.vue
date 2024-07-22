<script setup>

// App, Root Component

import { useAppStore } from '@/stores/appStore'

const app_store = useAppStore()

</script>

<template>
   <nav class="fixed">
      <RouterLink to="/" class="view_link" activeClass="selected_view" exactActiveClass="selected_view">
         Home</RouterLink>&nbsp;
      <RouterLink to="/songs" class="view_link" activeClass="selected_view" exactActiveClass="selected_view">
         Songs</RouterLink>&nbsp;
      <RouterLink to="/albums" class="view_link" activeClass="selected_view" exactActiveClass="selected_view">
         Albums</RouterLink>&nbsp;
      <RouterLink to="/search" class="view_link" activeClass="selected_view" exactActiveClass="selected_view">
         Search</RouterLink>&nbsp;
      <RouterLink v-if="!app_store.bearer_token" to="/login" class="view_link" activeClass="selected_view" exactActiveClass="selected_view">
         Login</RouterLink>
      <RouterLink v-else to="/login" class="view_link" activeClass="selected_view" exactActiveClass="selected_view">
         {{ app_store.username }}</RouterLink>
   </nav>
   <main>
      <RouterView />
   </main>
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
   min-height:100vh;
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
