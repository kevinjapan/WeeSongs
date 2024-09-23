<script setup>
import { ref,computed, onMounted } from 'vue'
import { useSongStore } from '@/stores/songStore'
import SongCtrls from '../components/Songs/Song/SongCtrls/SongCtrls.vue'
import SongLyrics from '../components/Songs/Song/SongLyrics/SongLyrics.vue'


// SongLyricsView

const song_store = useSongStore()

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
   margin-top:10rem;
   margin-bottom:10rem;
}
</style>
