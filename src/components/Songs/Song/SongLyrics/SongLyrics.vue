<script setup>
import { ref } from 'vue'
import { useSongStore } from '@/stores/songStore'
import SongOutline from '../SongOutline/SongOutline.vue'
import SongSectionLyrics from './SongSectionLyrics/SongSectionLyrics.vue'


// SongLyrics

const song_store = useSongStore()
const props = defineProps(['song'])
const notify_msg = ref('')

const last = (index) => {
   return index === song_store.song.songsheet.aSections.length - 1
}


</script>

<template>

   <SongOutline :song="song" />

   <SongSectionLyrics v-for="(section, index) in song_store.song.songsheet.aSections" 
      :key="section.id" 
      :section="section"
      :index="index" 
      :last="last(index)"
   />
  
   <AppStatus v-model="notify_msg" />

</template>

<style scoped>

</style>
