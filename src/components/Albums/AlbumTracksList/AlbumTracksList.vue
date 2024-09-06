<script setup>
import { ref,onBeforeMount } from 'vue'
import { useAlbumStore } from '@/stores/albumStore'
import AllTracksSelector from '../../Tracks/AllTracksSelector/AllTracksSelector.vue'



// AlbumTracksList


const props = defineProps(['album_id','songs'])

const album_store = useAlbumStore()

const tracks = ref([])
const show_all_tracks_list = ref(false)

const add_track = () => {
   show_all_tracks_list.value = show_all_tracks_list.value ? false : true
}

onBeforeMount(() => {
   tracks.value = props.songs.map(track => track.slug)
   console.log('tracks',tracks.value)
})


// to do : close dialog on 'apply' tracks changes

// to do : order initial tracks list alphabetically?

// currently, we only support one album per song.
// future : change album_id to contain a string / array of ids ?
// we only map one album per song and laravel is set up to rely on 
// relationships on this one-to-many orm - so not a trivial change.

const update_track_list = async(new_track_list) => {

   const removed_tracks_slugs = tracks.value.filter(i => !new_track_list.some(j => j == i))
   await album_store.remove_album_tracks(props.album_id,removed_tracks_slugs)

   const added_tracks = await album_store.add_album_tracks(props.album_id,new_track_list)
   tracks.value = [...added_tracks]
}

console.log('props.songs',tracks.value)




</script>

<template>

   <section class="relative mt_2 text_left">

      <nav class="flex gap_1">
         <h3>Tracks</h3>
         <button @click="add_track">+</button>
      </nav>

      <ul>
         <li v-for="song in tracks" :key="song">
            <RouterLink :to="{name:'songcontainer',params: {slug:song}}">{{ song }}</RouterLink>
         </li>
      </ul>

      <AllTracksSelector 
         v-if="show_all_tracks_list" 
         :client_track_list="tracks"
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


