<script setup>
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import AppNav from './components/App/AppNav/AppNav.vue'



// App Root Component

const route = useRoute()
const app_store = useAppStore()

// synch AppNav w/ current view on initial load
onMounted(() => {
   if(route.fullPath === '/') app_store.curr_view_route = '/'
})

// synch AppNav w/ current view on refresh page
watch(() => route.fullPath, () => {
   app_store.curr_view_route = route.fullPath
})

</script>

<template>

   <AppNav />
   
   <main>
      <RouterView />
   </main>

   <AppNotifications />

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
