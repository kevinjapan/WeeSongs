<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useAlbumStore } from '@/stores/albumStore'
import { useSongStore } from '@/stores/songStore'


// CreateView

const app_store = useAppStore()
const albumStore = useAlbumStore()
const songStore = useSongStore()

const song_title = ref('')
const album_title = ref('')


const apply_song = async() => {
   const result = await songStore.create_song(song_title.value)
   if(result && result.outcome) {
      app_store.set_notify_msg_list(result.outcome === 'success' 
         ? 'The song was successfully created' 
         : 'We were unable to create the song. ' + result.message)
   }
}
const apply_album = async() => {
   const result = await albumStore.create_album(album_title.value)
   if(result && result.outcome) {
      app_store.set_notify_msg_list(result.outcome === 'success' 
         ? 'The album was successfully created' 
         : 'We were unable to create the album. ' + result.message)
   }
}

</script>

<template>

   
   <form class="flex flex_col align_start" @submit.prevent="apply_song">

      <h3>Create new song</h3>
      <section class="grid form_grid">
         <label for="song_title">Title</label>
         <input 
            v-model="song_title"
            id="song_title"
            name="song_title" 
            className="border border-slate-200"
            placeholder="title here"
         />
         <div></div>      
         <button type="submit" v-if="app_store.is_logged_in() && song_title.length > 0">Apply</button>
         <button type="button" v-else disabled>Apply</button>
      </section>

      <h3>Create new album</h3>
      <section class="grid form_grid">
         <label for="album_title">Title</label>
         <input 
            v-model="album_title"
            id="album_title"
            name="album_title" 
            className="border border-slate-200"
            placeholder="title here"
         />
         <div></div>      
         <button type="button" v-if="app_store.is_logged_in() && album_title.length > 0" @click="apply_album">Apply</button>
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
