<script setup>
import { ref } from 'vue'
import { useAlbumStore } from '@/stores/albumStore'
import AllTracksSelector from '../../Tracks/AllTracksSelector/AllTracksSelector.vue'



// AlbumTracksList


const props = defineProps(['songs'])

const album_store = useAlbumStore()
const show_all_tracks_list = ref(false)

const add_track = () => {
   show_all_tracks_list.value = show_all_tracks_list.value ? false : true
}

const update_track_list = (track_list) => {

   // -----------------------------------------------------------------------------
   // to do : we receive an array of slugs -
   // - update each song on track_list to contain this album.id as 'album_id' field
   // - change album_id to contain a string - array of ids
   // -----------------------------------------------------------------------------
   if(album_store.album) {      
      console.log('got album: ', album_store.album)
      console.log('got tracks: ',track_list)
   }

}

</script>

<template>

   <section class="relative mt_2 text_left">

      <nav class="flex gap_1">
         <h3>Tracks</h3>
         <button @click="add_track">+</button>
      </nav>

      <ul>
         <li v-for="song in props.songs" :key="song.id">
            <RouterLink :to="{name:'songcontainer',params: {slug:song.slug}}">{{ song.title }}</RouterLink>
         </li>
      </ul>

      <AllTracksSelector 
         v-if="show_all_tracks_list" 
         :client_track_list="props.songs"
         @update-track-list="update_track_list"
      />

   </section>

</template>


<style scoped>
h3 {
   text-align:left;
}
ul {
   width:fit-content;
   margin:.5rem 0;
   padding:.5rem 1rem .5rem 1rem;
   text-align:left;
   border:solid 1px lightgrey;
   border-radius:.25rem;
}
button {
   outline:none;
   border:none;
   font-size:1.2rem;
   width:fit-content;
   height:fit-content;
   margin:0;
   padding:0;
   background:none;
}
</style>


