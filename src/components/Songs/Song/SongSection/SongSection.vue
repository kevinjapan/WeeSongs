<script setup>
import { ref } from 'vue'
import Bar from '../Bar/Bar.vue'
import SongSectionTitles from './SongSectionTitles/SongSectionTitles.vue'

//
// SongSection
// single SongSection component within Song.aSections
//

const props = defineProps(['section','index','update','del_section','clone_section','move_section','last'])
const requires_update = ref(false)

// child Bar handlers
const notify_updated_bar = () => {
   // we simply enable access on update btn - user can apply thereafter at any time
   requires_update.value = true
}
const notify_updated_titles = () => {
   requires_update.value = true
}

// Section handlers
const update = () => {
   props.update()
   requires_update.value = false
}
const del = () => {
   props.del_section(props.section.id)
}
const clone = () => {
   props.clone_section(props.section.id)
}
const move = (direction) => {
   props.move_section(props.section.id,direction)
}
</script>


<template>
   <div style="display:flex;justify-content:flex-start;flex-direction:column;border:solid 1px grey;margin:1rem;margin-top:2rem;">

      <SongSectionTitles 
         :section="section"
         :notify_updated_titles="notify_updated_titles"
         />

      <div class="grid section_grid w-full border-t border-l border-slate-400 text-slate-700">
         <Bar 
            v-for="bar in props.section.aBars" 
            :key="bar.id" 
            :bar="bar"
            :notify_updated_bar="notify_updated_bar"
         />
      </div>

      <div className="flex justify-end gap-3">
         <button v-if="props.last" disabled>MoveDown</button>
         <button v-else @click="move('down')">MoveDown</button>
         <button v-if="props.index > 0" @click="move('up')">Move Up</button>
         <button v-else disabled>Move Up</button>
         <button @click="del">Delete</button>
         <button @click="clone">Clone</button>
         <button v-if="requires_update === true" @click="update">Apply</button>
         <button v-else disabled>Apply</button>
      </div>

   </div>
</template>


<style scoped>
button:disabled:hover {
   border:solid 1px transparent;
   cursor:auto;
}
</style>
