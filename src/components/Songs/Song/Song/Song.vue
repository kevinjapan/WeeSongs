<script setup>
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'
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

const app_store = useAppStore()
const song_store = useSongStore()

const update_song = async() => {
   const result = await song_store.save()
   if(result && result.message) app_store.set_notify_msg_list(result.message)
}


const clone_section = (section_id) => {
   const result = song_store.clone_section(section_id)
   if(result && result.message && result.outcome === 'fail') app_store.set_notify_msg_list(result.message)
   emit('set-selected-section-daw',result.daw)
   // scroll to new section after render delay
   setTimeout(() => scroll_to_elem(result.daw),150)
}

const move_section = (section_id,direction) => {
   const result = song_store.move_section(section_id,direction)
   if(result && result.message && result.outcome === 'fail') app_store.set_notify_msg_list(result.message)
   setTimeout(() => scroll_to_elem(result.daw),150)
}

const update_section = (section_id,modified_section) => {
   const result = song_store.update_section(section_id,modified_section)
   if(result && result.message && result.outcome === 'fail') app_store.set_notify_msg_list(result.message)
}

const delete_section = (section_id) => {
   const result = song_store.del_section(section_id)
   if(result && result.message && result.outcome === 'fail') app_store.set_notify_msg_list(result.message)
}

const add_section = () => {
   const result = song_store.add_section()
   if(result && result.message && result.outcome === 'fail') app_store.set_notify_msg_list(result.message)
}

// future : we currently rely on ref in store being changed by changing it directly reactively
// work w/ this while ok but review - should we change this to emit() and handle?


// to do : currently we don't support sm screens - review viewport widths are acceptable and notify if sm screen.

// to do : limit total no. sections - disable 'add section' below on that limit

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
@media (min-width: 768px) {
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
