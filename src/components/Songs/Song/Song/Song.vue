<script setup>
import { ref } from 'vue'
import { useSongStore } from '@/stores/songStore'
import SongOutline from '../SongOutline/SongOutline.vue'
import SongSections from '../SongSections/SongSections.vue'


// Song

const song_store = useSongStore()
const props = defineProps(['song'])
const notify_msg = ref('')

const update_song = async() => {
   const result = await song_store.save()
   notify_msg.value = result.message
}

const del_section = (section_id) => {
   const result = song_store.del_section(section_id)
   if(result.outcome === 'fail') notify_msg.value = result.message
}

const clone_section = (section_id) => {
   const result = song_store.clone_section(section_id)
   if(result.outcome === 'fail') notify_msg.value = result.message
}

const move_section = (section_id,direction) => {
   const result = song_store.move_section(section_id,direction)
   if(result.outcome === 'fail') notify_msg.value = result.message
}

const update_section = (section_id,modified_section) => {
   const result = song_store.update_section(section_id,modified_section)
   if(result.outcome === 'fail') notify_msg.value = result.message
}
</script>

<template>

   <SongOutline :song="song" />

   <SongSections :song="song" 
      :update_song="update_song" 
      :del_section="del_section"
      :clone_section="clone_section"
      :move_section="move_section"
      :update_section="update_section"
   />
  
   <AppStatus v-model="notify_msg" />

</template>

<style scoped>

</style>
