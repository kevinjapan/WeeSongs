<script setup>
import { ref } from 'vue'
import { useSongStore } from '@/stores/songStore'
import SongOutline from '../SongOutline/SongOutline.vue'
import SongSection from '../SongSection/SongSection.vue'


// SongLyrics

const song_store = useSongStore()
const props = defineProps(['song'])
const notify_msg = ref('')



const last = (index) => {
   return index === song_store.song.songsheet.aSections.length - 1
}

// to do : on newly created songs, fails on key below - since section.id is not set?

</script>

<template>

   <SongOutline :song="song" />


   <SongSection v-for="(section, index) in song_store.song.songsheet.aSections" 
      :key="section.id" 
      :section="section" 
      :update_song="props.update_song" 
      :index="index" 
      :last="last(index)"
      :editable="false"
      :del_section="props.del_section"
      :clone_section="props.clone_section"
      :move_section="props.move_section"
      :update_section="props.update_section"
   />
  
   <AppStatus v-model="notify_msg" />

</template>

<style scoped>

</style>
