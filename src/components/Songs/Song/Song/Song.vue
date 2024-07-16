<script setup>
import { ref } from 'vue'
import { useSongStore } from '@/stores/songStore'
import SongOutline from '../SongOutline/SongOutline.vue'
import SongSections from '../SongSections/SongSections.vue'


// Song

const song_store = useSongStore()
const props = defineProps(['song'])
const notify_msg = ref('')

const update = async() => {
   const result = await song_store.save()
   notify_msg.value = result.message
}

const del_section = async(section_id) => {
   const result = await song_store.del_section(section_id)
   // notify_msg.value = result.message  // to do : handle *if* error; on success, change is visible in UI
}

const clone_section = async(section_id) => {
   console.log('clone_section in Song',section_id)
   const result = await song_store.clone_section(section_id)
   // notify_msg.value = result.message  // to do : handle *if* error; on success, change is visible in UI
}

const move_section = (section_id,direction) => {
   console.log('move_section in Song',section_id,direction)
}
</script>

<template>

   notify msg: {{ notify_msg }}

   <SongOutline :song="song" />

   <SongSections :song="song" :update="update" 
      :del_section="del_section"
      :clone_section="clone_section"
      :move_section="move_section"
   />
  
   <AppStatus v-model="notify_msg" />

</template>

<style scoped>

</style>
