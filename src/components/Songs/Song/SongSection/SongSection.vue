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
   if(!props.section.id) {
      app_store.set_notify_msg_list("Corrupt SongSection -  missing 'id'.")
      return false
   }
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

// future : review : currently, we are reacting to every text entry into input -
//          more efficient to only update on 'apply' ?
const change_bar_txt = (bar_id,txt) => {

   const modified_section = JSON.parse(JSON.stringify(props.section))
   modified_section.aBars = modified_section.aBars.map((bar) => {

      // future : handle if no id is present - ensure any bar added/saved has a valid id

      if(bar.id === bar_id) bar.txt = txt
      return bar
   })   
   props.update_section(modified_section.id,modified_section)
   requires_update.value = true
}

const change_num_bars = (num_bars) => {
   
   if(!app_store.bearer_token) {
      app_store.set_notify_msg_list('You need to login to perform this action')
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
         max_id++
         modified.aBars.push({id:max_id, text:"", mods:"", chords:""})
      }
   }
   props.update_section(modified.id,modified)
   requires_update.value = true
}

</script>


<template>
   
   <div :id="props.section.daw" class="song_section_wrap">

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
      

      <div className="flex justify_end gap-3">

         <button @click="move('down')" :disabled="app_store.bearer_token === '' || props.last"
            class="wee_btn" >
            <img src="../../../../assets/icons/arrow-down-circle.svg" />
         </button>

         <button @click="move('up')" :disabled="app_store.bearer_token === '' || props.index <= 0"
            class="wee_btn" >
            <img src="../../../../assets/icons/arrow-up-circle.svg" />
         </button>

         <button @click="del" :disabled="app_store.bearer_token === ''"
            class="wee_btn" >
            <img src="../../../../assets/icons/trash.svg" alt="delete section"/>
         </button>

         <button :disabled="app_store.bearer_token === ''" @click="clone"
            class="wee_btn" >
            <img src="../../../../assets/icons/copy.svg" />
         </button>

         <button v-if="requires_update === true && app_store.bearer_token" @click="update_song"
            class="wee_btn" >Apply</button>         
         <button v-else disabled
         class="wee_btn" >Apply</button>

      </div>

   </div>
</template>


<style scoped>

.song_section_wrap {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;

   -webkit-box-pack:start;
   -ms-flex-pack:start;
   justify-content:flex-start;

   -webkit-box-orient:vertical;
   -webkit-box-direction:normal;
   -ms-flex-direction:column;
   flex-direction:column;

   margin:1rem;
   margin-top:2rem;
}

/* prevent double-thick borders on adjoining - top border only on first grid row */
div.bar_2:nth-child(-n + 4) {
    border-top:solid 1px lightgrey;
}


</style>
