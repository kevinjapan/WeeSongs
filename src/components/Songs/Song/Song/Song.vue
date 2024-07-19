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

// to do : do the following funcs have to be async?

const del_section = async(section_id) => {
   const result = await song_store.del_section(section_id)
   // notify_msg.value = result.message  // to do : handle *if* error; on success, change is visible in UI
}

const clone_section = async(section_id) => {
   const result = await song_store.clone_section(section_id)
   // notify_msg.value = result.message  // to do : handle *if* error; on success, change is visible in UI
}

const move_section = (section_id,direction) => {
   const result = song_store.move_section(section_id,direction)
   // notify_msg.value = result.message  // to do : handle *if* error; on success, change is visible in UI
}

const change_num_bars = (num_bars) => {
   // to do : remove this drill prop?
}

const update_section = (section_id,modified_section) => {
   const result = song_store.update_section(section_id,modified_section)
   // notify_msg.value = result.message  // to do : handle *if* error; on success, change is visible in UI

   // to do : inject modified_section correctly and then update song in store!
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
      :change_num_bars="change_num_bars"
   />
  
   <AppStatus v-model="notify_msg" />

</template>

<style scoped>

</style>
