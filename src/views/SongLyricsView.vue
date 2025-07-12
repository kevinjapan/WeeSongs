<script setup>
import { ref, computed, onBeforeMount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSongStore } from '@/stores/songStore'
import SongCtrls from '../components/Songs/Song/SongCtrls/SongCtrls.vue'
import SongLyrics from '../components/Songs/Song/SongLyrics/SongLyrics.vue'


// SongLyricsView

const route = useRoute()
const song_store = useSongStore()

onBeforeMount(async() => {

   // ensure song is loaded
   if(!song_store.song) {
      // there is an issue w/ server's handling of unknown slug - not clean, garbage returned (error reporting in php)
      // so, for now, we will simply report first line of error in AppNotifications notification until fix on server-side
      const result = await song_store.load_song(route.params.slug)
      if(result && result.outcome === 'fail') app_store.set_app_notifications(result.message)     
   }
})

// custom suspense flag
const loading = ref(false)
const loading_error = ref({is_error:false})
const has_error = computed(() => {
  return loading_error.is_error === true ? true : false
})

onMounted(() => {
   window.scroll(0,0)
})

</script>

<template>
   
   <section>
      
      <SongCtrls
         :show_outline="true" 
      />

      <div v-if="has_error">
         There was a problem connecting to the server.
      </div>
      <div v-else>

         <div v-if="loading" class="loading"></div>

         <div v-else class="relative lyrics_wrapper">
            <SongLyrics :song="song_store.song" />
         </div>
      </div>
      
   </section>

</template>

<style scoped>

section {
   width:100%;
}
.lyrics_wrapper {
   margin-top:15rem;
   margin-bottom:10rem;
   padding:0 2rem;
}
</style>
