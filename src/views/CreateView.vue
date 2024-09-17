<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'


// CreateView

const app_store = useAppStore()
const songStore = useSongStore()
const title = ref('')


const apply_song = async() => {

   // to do : enable create song and create album
   
   console.log('apply song')
   return
   const result = await songStore.create_song(title.value)
   if(result && result.outcome) {
      app_store.set_notify_msg_list(result.outcome === 'success' 
         ? 'The song was successfully created' 
         : 'We were unable to create the song. ' + result.message)
   }
}
const apply_album = async() => {
   console.log('apply album')
}

</script>

<template>

   
   <form class="flex flex_col align_start" @submit.prevent="apply_song">

      <h3>Create new song</h3>
      <section class="grid form_grid">
         <label>Title</label>
         <input 
            v-model="title"
            name="title" 
            className="border border-slate-200"
            placeholder="title here"
         />
         <div></div>      
         <button type="submit" v-if="app_store.is_logged_in()">Apply</button>
         <button type="button" v-else disabled>Apply</button>
      </section>

      <h3>Create new album</h3>
      <section class="grid form_grid">
         <label>Title</label>
         <input 
            v-model="title"
            name="title" 
            className="border border-slate-200"
            placeholder="title here"
         />
         <div></div>      
         <button type="button" v-if="app_store.is_logged_in()" @click="apply_album">Apply</button>
         <button type="button" v-else disabled>Apply</button>
      </section>

   </form>

</template>

<style scoped>
h3 {
   text-align:left;
}
section {
   width:100%;
   margin:1rem;
   padding:1rem;
   text-align:left;
   border:solid 1px lightgrey;
   border-radius:.25rem;
}
button {
   max-width:fit-content;
   border:solid 1px grey;
   padding:.5rem;
   margin-left:auto;
   margin-right:auto;
}
</style>
