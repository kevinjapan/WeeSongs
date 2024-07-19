<script setup>
import { ref } from 'vue'
import Bar from '../Bar/Bar.vue'
import SongSectionTitles from './SongSectionTitles/SongSectionTitles.vue'


// SongSection
// single SongSection component within Song.aSections

const props = defineProps(['section','index','update_song','del_section','clone_section','move_section','last','update_section'])
const requires_update = ref(false)

const num_bars = ref(props.section.aBars.length)
const max_bars = 32

// child Bar handlers
const notify_updated_bar = () => {
   // we simply enable access on update btn - user can apply thereafter at any time
   requires_update.value = true
}
const notify_updated_titles = () => {
   requires_update.value = true
}

// Section handlers
const update_song = () => {
   props.update_song()
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

const change_num_bars = (num_bars) => {
   
   const new_num_bars = parseInt(num_bars)
   if(!Number.isInteger(new_num_bars)) return
   if(new_num_bars < 1 || new_num_bars > max_bars) return
   
   // extract as a local var - 'unwrap'
   const modified = JSON.parse(JSON.stringify(props.section))
   const current_len = modified.aBars.length
   if(new_num_bars === current_len) return

   let temp_id = 1000   // to do : replace w/ - actual calculated id  calc id from pre-existing ids / chords from song key (?)

   if(new_num_bars < current_len) {
      for(let i = 0; i < (current_len - new_num_bars); i++) {
         modified.aBars.pop()
      }
   }
   else {
      for(let j = 0; j < (num_bars - current_len); j++) {
         modified.aBars.push({id:temp_id++, text:"", mods:"", chords:""})
      }
   }
   props.update_section(modified.id,modified)
}

</script>


<template>
   <div :id="props.section.daw"
      style="display:flex;justify-content:flex-start;flex-direction:column;border:solid 1px grey;margin:1rem;margin-top:2rem;">

      <SongSectionTitles 
         :section="section"
         :num_bars="num_bars"
         :notify_updated_titles="notify_updated_titles"
         @bar-nums-changed="change_num_bars"
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

         <button v-if="props.last" disabled>
            <img src="../../../../assets/icons/arrow-down-circle.svg" />
         </button>
         <button v-else @click="move('down')">
            <img src="../../../../assets/icons/arrow-down-circle.svg" />
         </button>

         <button v-if="props.index > 0" @click="move('up')">
            <img src="../../../../assets/icons/arrow-up-circle.svg" />
         </button>
         <button v-else disabled>
            <img src="../../../../assets/icons/arrow-up-circle.svg" />
         </button>

         <button @click="del">
            <img src="../../../../assets/icons/trash.svg" alt="delete section"/>
         </button>

         <button @click="clone">
            <img src="../../../../assets/icons/copy.svg" />
         </button>

         <button v-if="requires_update === true" @click="update_song">Apply</button>         
         <button v-else disabled>Apply</button>

      </div>

   </div>
</template>


<style scoped>
button {
   background:white;
}
button:disabled {
   position:relative;
}
button:disabled:hover {
   border:solid 1px transparent;
   cursor:auto;
}
/* grey out disabled btn */
button:disabled::before {
   content:'';
   position:absolute;
   width:100%;
   height:100%;
   top:0;
   left:0;
   background:white;
   opacity:.7;
}

</style>
