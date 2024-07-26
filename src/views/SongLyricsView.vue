<script setup>
import { ref,computed } from 'vue'
import { useSongStore } from '@/stores/songStore'
import SongCtrls from '../components/Songs/Song/SongCtrls/SongCtrls.vue'
import SongLyrics from '../components/Songs/Song/SongLyrics/SongLyrics.vue'


// SongLyricsView


const song_store = useSongStore()
const notify_msg = ref('')

// custom suspense flag
const loading = ref(false)
const loading_error = ref({is_error:false})
const has_error = computed(() => {
  return loading_error.is_error === true ? true : false
})

</script>

<template>
   
   <section>
      
      <SongCtrls />

      <div v-if="has_error">
         There was a problem loading data from the server, please try again later.
      </div>
      <div v-else>

         <div v-if="loading">
            Loading data...
         </div>

         <div v-else class="relative">
            <SongLyrics :song="song_store.song" />
         </div>
      </div>
      
   </section>

   <AppStatus v-model="notify_msg" />

</template>

<style scoped>

</style>
