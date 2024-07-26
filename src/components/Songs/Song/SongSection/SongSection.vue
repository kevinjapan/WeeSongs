<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import Bar from '../Bar/Bar.vue'
import SongSectionTitles from './SongSectionTitles/SongSectionTitles.vue'


// SongSection
// single SongSection component within Song.aSections

const props = defineProps(
   ['section','index','update_song','del_section','clone_section','move_section','last','update_section','editable']
)

const app_store = useAppStore()
const requires_update = ref(false)
const notify_msg = ref('')
const num_bars = ref(props.section.aBars.length)
const max_bars = 32


const notify_updated_titles = () => {
   requires_update.value = true
}
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

const change_daw = (daw) => {
   const modified = JSON.parse(JSON.stringify(props.section))
   modified.daw = daw
   props.update_section(modified.id,modified)
   requires_update.value = true
}

const change_title = (title) => {
   const modified = JSON.parse(JSON.stringify(props.section))
   modified.title = title
   props.update_section(modified.id,modified)
   requires_update.value = true
}

const change_bar_chords = (bar_id,chords) => {

   const modified_section = JSON.parse(JSON.stringify(props.section))
   modified_section.aBars = modified_section.aBars.map((bar) => {
      if(bar.id === bar_id) bar.chords = chords
      return bar
   })
   props.update_section(modified_section.id,modified_section)
   requires_update.value = true
}

const change_bar_txt = (bar_id,txt) => {

   const modified_section = JSON.parse(JSON.stringify(props.section))
   modified_section.aBars = modified_section.aBars.map((bar) => {
      if(bar.id === bar_id) bar.txt = txt
      return bar
   })   
   props.update_section(modified_section.id,modified_section)
   requires_update.value = true
}

const change_num_bars = (num_bars) => {
   
   if(!app_store.bearer_token) {
      notify_msg.value = 'You need to login to perform this action'
      return
   }
   const new_num_bars = parseInt(num_bars)
   if(!Number.isInteger(new_num_bars)) return
   if(new_num_bars < 1 || new_num_bars > max_bars) return
   
   // extract as a local var - 'unwrap'
   const modified = JSON.parse(JSON.stringify(props.section))
   const current_len = modified.aBars.length
   if(new_num_bars === current_len) return

   if(new_num_bars < current_len) {
      for(let i = 0; i < (current_len - new_num_bars); i++) {
         modified.aBars.pop()
      }
   }
   else {
      // increment max id
      const bar_ids = modified.aBars.map(bar => bar.id)
      let max_id = bar_ids.reduce((a,b) => Math.max(a,b),-Infinity)

      for(let j = 0; j < (num_bars - current_len); j++) {
         modified.aBars.push({id:max_id++, text:"", mods:"", chords:""})
      }
   }
   props.update_section(modified.id,modified)
   requires_update.value = true
}

</script>


<template>
   <div :id="props.section.daw"
      style="display:flex;justify-content:flex-start;flex-direction:column;
      margin:1rem;margin-top:2rem;">

      <SongSectionTitles 
         :section="section"
         :num_bars="num_bars"
         :notify_updated_titles="notify_updated_titles"
         :editable="props.editable"
         @section-daw-changed="change_daw"
         @section-title-changed="change_title"
         @bar-nums-changed="change_num_bars"
      />

      <div class="grid section_grid w-full border-t border-l border-slate-400 text-slate-700">
         <Bar 
            v-for="bar in props.section.aBars" 
            :key="bar.id" 
            :bar="bar"
            @bar-chords-changed="change_bar_chords"
            @bar-txt-changed="change_bar_txt"
         />
      </div>
      

      <div className="flex justify-end gap-3">

         <button @click="move('down')" :disabled="app_store.bearer_token === '' || props.last">
            <img src="../../../../assets/icons/arrow-down-circle.svg" />
         </button>

         <button @click="move('up')" :disabled="app_store.bearer_token === '' || props.index <= 0">
            <img src="../../../../assets/icons/arrow-up-circle.svg" />
         </button>

         <button @click="del" :disabled="app_store.bearer_token === ''">
            <img src="../../../../assets/icons/trash.svg" alt="delete section"/>
         </button>

         <button :disabled="app_store.bearer_token === ''" @click="clone">
            <img src="../../../../assets/icons/copy.svg" />
         </button>

         <button v-if="requires_update === true && app_store.bearer_token" @click="update_song">Apply</button>         
         <button v-else disabled>Apply</button>

      </div>

      <AppStatus v-model="notify_msg" />

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
