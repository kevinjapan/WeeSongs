<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'


// CreateSongView

const app_store = useAppStore()
const songStore = useSongStore()
const title = ref('')


const apply = async() => {
   const result = await songStore.create_song(title.value)
   if(result && result.outcome) {
      app_store.set_notify_msg(result.outcome === 'success' 
         ? 'The song was successfully created' 
         : 'We were unable to create the song. ' + result.message)
   }
}

</script>

<template>

   <h1>Create New Song</h1>
   
   <form class="grid form_grid flex_col" @submit.prevent="apply">


      <label>Title</label>
      <input 
         v-model="title"
         name="title" 
         className="border border-slate-200"
         placeholder="title here"
      />

      <div></div>
      <button type="submit">Apply</button>
   
   </form>

</template>

<style scoped>
button {
   max-width:fit-content;
   border:solid 1px grey;
   padding:.5rem;
   margin-left:auto;
   margin-right:auto;
}
</style>
