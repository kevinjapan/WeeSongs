<script setup>
import { ref } from 'vue'
import { useSongStore } from '@/stores/songStore'
import SongSections from '../SongSections/SongSections.vue'


// Song

const song_store = useSongStore()
const props = defineProps(['song'])
const notify_msg = ref('')

const update_song = async() => {
   const result = await song_store.save()
   if(result && result.message) notify_msg.value = result.message
}

const del_section = (section_id) => {
   const result = song_store.del_section(section_id)
   if(result && result.message && result.outcome === 'fail') notify_msg.value = result.message
}

const clone_section = (section_id) => {
   const result = song_store.clone_section(section_id)
   if(result && result.message && result.outcome === 'fail') notify_msg.value = result.message
}

const move_section = (section_id,direction) => {
   const result = song_store.move_section(section_id,direction)
   if(result && result.message && result.outcome === 'fail') notify_msg.value = result.message
}

const update_section = (section_id,modified_section) => {
   const result = song_store.update_section(section_id,modified_section)
   if(result && result.message && result.outcome === 'fail') notify_msg.value = result.message
}

const add_section = () => {
   const result = song_store.add_section()
   if(result && result.message && result.outcome === 'fail') notify_msg.value = result.message
}


// future : we currently rely on ref in store being changed by changing it directly reactively
//          work w/ this while ok (small scale etc so prob. ok)
//          but review - should we change this to emit() and handle..?

// to do : bug : clone a section, then try to move that section - it retains reference to and moves original section

// to do : we want to be able to access Song in store and display all parts (rather than go to database)


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
   
      <AppStatus v-model="notify_msg" />

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
