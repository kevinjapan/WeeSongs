<script setup>
import { ref } from 'vue'
import { useSongStore } from '@/stores/songStore'


// CreateSongView

const songStore = useSongStore()
const notify_msg = ref('')
const title = ref('')


const apply = async() => {
   const result = await songStore.create_song(title.value)
   if(result && result.outcome) {
      notify_msg.value = result.outcome === 'success' ? 'The song was successfully created' : 'We were unable to create the song'
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
   
   <AppStatus v-model="notify_msg" />

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
