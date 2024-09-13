<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'
import SongSections from '../SongSections/SongSections.vue'
import { scroll_to_elem } from '../../../../utilities/utilities/utilities'


// Song

const app_store = useAppStore()
const song_store = useSongStore()
const props = defineProps(['song'])

const update_song = async() => {
   const result = await song_store.save()
   if(result && result.message) app_store.set_notify_msg(result.message)
}

const del_section = (section_id) => {
   const result = song_store.del_section(section_id)
   if(result && result.message && result.outcome === 'fail') app_store.set_notify_msg(result.message)
}


const go_section = daw => {
   let target = document.getElementById(daw)
   if(target !== null) target.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
}

const clone_section = (section_id) => {
   const result = song_store.clone_section(section_id)
   if(result && result.message && result.outcome === 'fail') app_store.set_notify_msg(result.message)
   // scroll to new section after render delay
   setTimeout(() => scroll_to_elem(result.daw),150)
}

const move_section = (section_id,direction) => {
   const result = song_store.move_section(section_id,direction)
   if(result && result.message && result.outcome === 'fail') app_store.set_notify_msg(result.message)
   setTimeout(() => scroll_to_elem(result.daw),150)
}

const update_section = (section_id,modified_section) => {
   const result = song_store.update_section(section_id,modified_section)
   if(result && result.message && result.outcome === 'fail') app_store.set_notify_msg(result.message)
}

const add_section = () => {
   const result = song_store.add_section()
   if(result && result.message && result.outcome === 'fail') app_store.set_notify_msg(result.message)
}


// future : we currently rely on ref in store being changed by changing it directly reactively
// work w/ this while ok but review - should we change this to emit() and handle..?

// to do : bug : clone a section, then try to move that section - it retains reference to and moves original section
//          need to replicate reliably - sometimes happens after several clonings?



</script>

<template>

   <section class="song_wrapper">

      <SongSections 
         :song="props.song" 
         :update_song="update_song" 
         :del_section="del_section"
         :clone_section="clone_section"
         :move_section="move_section"
         :update_section="update_section"
      />

      <button @click="add_section">add</button>

   </section>

</template>

<style scoped>
.song_wrapper {

   /* leave plenty space to scroll bottom section from outline */
   margin-top:8rem; 
   margin-bottom:8rem;
   padding-top:0;
}
</style>
