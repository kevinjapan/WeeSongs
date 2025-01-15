<script setup>
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'
import { useSongConfigStore } from '@/stores/SongConfigStore'
import SongSections from '../SongSections/SongSections.vue'
import { scroll_to_elem } from '../../../../utilities/utilities/utilities'


// Song

// Component Interface - props and emits
const props = defineProps({
   song:Object
})
const emit = defineEmits([
   'set-selected-section-daw'
])

// stores
const app_store = useAppStore()
const song_store = useSongStore()
const song_config_store = useSongConfigStore()


// save local copy to server
const update_song = async() => {
   const result = await song_store.save()
   if(result && result.message) app_store.set_app_notifications(result.message)
}


// actions on local copy
const clone_section = (section_id) => {
   const result = song_store.clone_section(section_id)
   if(result && result.message && result.outcome === 'fail') app_store.set_app_notifications(result.message)
   emit('set-selected-section-daw',result.daw)
   // scroll to new section after render delay
   setTimeout(() => scroll_to_elem(result.daw),150)
}
const move_section = (section_id,direction) => {
   const result = song_store.move_section(section_id,direction)
   if(result && result.message && result.outcome === 'fail') app_store.set_app_notifications(result.message)
   setTimeout(() => scroll_to_elem(result.daw),150)
}
const add_section = () => {
   if(song_store.song.songsheet.aSections.length >= song_config_store.max_sections) {
      app_store.set_app_notifications(`This song already contains the max number of sections [${song_config_store.max_sections}]`)
      return
   }
   const result = song_store.add_section()
   if(result && result.message && result.outcome === 'fail') app_store.set_app_notifications(result.message)
}
const update_section = (section_id,modified_section) => {
   const result = song_store.update_section(section_id,modified_section)
   if(result && result.message && result.outcome === 'fail') app_store.set_app_notifications(result.message)
}
const delete_section = (section_id) => {
   const result = song_store.del_section(section_id)
   if(result && result.message && result.outcome === 'fail') app_store.set_app_notifications(result.message)
}

// future : we currently rely on ref in store being changed by changing it directly reactively
// work w/ this while ok but review - should we change this to emit() and handle?

</script>

<template>

   <section v-if="props.song" class="song_wrapper">

      <SongSections
         :song="props.song"
         @update-song="update_song"
         @clone-section="clone_section"
         @move-section="move_section"
         @update-section="update_section"
         @delete-section="delete_section"
      />

      <button @click="add_section">add section</button>

   </section>

</template>

<style scoped>
.song_wrapper {
   /* we leave plenty space to scroll bottom section from outline */
   margin-top:var(--song_top_margin_sm);
   margin-bottom:8rem;
   padding-top:0;
}
@media (min-width: 1110px) {
   .song_wrapper {
      margin-top:var(--song_top_margin_lg);
   }
}
@media (hover: none) {
   .song_wrapper {
      margin-top:14rem; 
   }
}
</style>
