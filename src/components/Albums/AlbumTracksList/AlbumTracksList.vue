<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useAlbumStore } from '@/stores/albumStore'
import AllTracksSelector from '../../Tracks/AllTracksSelector/AllTracksSelector.vue'



// AlbumTracksList

// currently, we support one album per song.
// we only map one album per song and laravel is set up to rely on 
// relationships on this one-to-many orm - so not a trivial change.

// Component Interface - props and emits
const props = defineProps({
   songs:Array,
   album_id:Number
})

const app_store = useAppStore()
const album_store = useAlbumStore()

// tracks list
const tracks = ref([])

// display flag for AllTracksSelector
const show_all_tracks_list = ref(false)


const add_track = () => {
   show_all_tracks_list.value = show_all_tracks_list.value ? false : true
}

onBeforeMount(() => {
   tracks.value = props.songs.map(track => track.slug).sort()
})

const update_track_list = async(new_track_list) => {

   let outcomes = []

   // intermediate to avoid rendering template twice
   let modified = [...tracks.value]

   // determine which tracks have been added/removed
   const removed_tracks_slugs = tracks.value.filter(prev_track_slug => !new_track_list.some(slug => slug == prev_track_slug))
   const added_tracks_slugs = new_track_list.filter(prev_track_slug => !tracks.value.some(slug => slug == prev_track_slug))

   if(removed_tracks_slugs.length > 0) {
      const { data: remove_data, error: remove_error } = await album_store.remove_album_tracks(removed_tracks_slugs)
      if(remove_data){
         // remove the removed tracks locally - we may not get success on add, so keep ui-ready
         modified = [...tracks.value.filter(track => !removed_tracks_slugs.some(slug => slug === track))].sort()
         outcomes.push('Tracks were removed successfully.')
      }
      else {
         outcomes.push('There was an error removing tracks: ' + remove_error)
      }
   }

   if(added_tracks_slugs.length > 0) {
      const { data: add_data, error: add_error } = await album_store.add_album_tracks(props.album_id,added_tracks_slugs)
      if(add_data){
         // inject the added tracks locally      
         modified = [...modified,...added_tracks_slugs].sort()
         outcomes.push('Tracks were added successfully.')
      }
      else {
         outcomes.push('There was an error adding tracks: ' + add_error)
      }
   }

   tracks.value = [...modified]
   show_all_tracks_list.value = false
   app_store.set_notify_msg_list(outcomes)
}

const close_all_tracks_list = () => {
   show_all_tracks_list.value = false
}

const get_resource_img = (img) => {
   // future : we pass 'slug' into this method, since we only get slugs from parent - review
   //           ok for now, we know 'slug' and 'img' are identical (albeit img contains file extension)
   return `/data/imgs/songs/${img.toLowerCase()}.jpg`
}

</script>

<template>

   <section class="relative mt_2 text_left">

      <nav class="flex gap_1">
         <div class="flex align_center gap_.5"><h3>Tracks </h3><span class="text_grey">[{{ tracks.length }}]</span></div>
         <button class="wee_btn" @click="add_track">+</button>
      </nav>

      <ul class="flex flex_col gap_1">
         <li v-for="song in tracks" :key="song" class="flex gap_1 align_items_center">
            <div class="mr_1"><img class="song_tiny_teaser" :src="get_resource_img(song)" /></div>
            <RouterLink :to="{name:'songcontainer',params: {slug:song}}">{{ song }}</RouterLink>
         </li>
      </ul>

      <AllTracksSelector 
         v-if="show_all_tracks_list" 
         :client_track_list="tracks"
         @update-track-list="update_track_list"
         @close-all-tracks-list="close_all_tracks_list"
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
img.song_tiny_teaser {
   width:80px;
   height:50px;
}
</style>


