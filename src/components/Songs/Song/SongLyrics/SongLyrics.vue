<script setup>
import { useSongStore } from '@/stores/songStore'
import SongSectionLyrics from './SongSectionLyrics/SongSectionLyrics.vue'


// SongLyrics

const song_store = useSongStore()
const props = defineProps(['song'])

const last = (index) => {
   return index === song_store.song.songsheet.aSections.length - 1
}


</script>

<template>

   <SongSectionLyrics v-for="(section, index) in song_store.song.songsheet.aSections" 
      :key="section.id" 
      :section="section"
      :index="index" 
      :last="last(index)"
   />

</template>

<style scoped>

</style>
