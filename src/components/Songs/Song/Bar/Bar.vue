<script setup>
import { ref } from 'vue'

//
// Bar
// single Bar component within Section.aBars
//
// v-model is equivalent to:
// <input
//   :value="text"
//   @input="event => text = event.target.value">


const props = defineProps(['bar','notify_updated_bar'])

const update = () => props.notify_updated_bar()

// to do : this is 'working', since JS permits us to 'mutate' this child nested members of 'bar' prop.
//         docs recommend props should be one-way, use emit and propograte an event to the parent.. 
//         see also SongSectionTitles
</script>



<template>
   <div class="bar_2 border-b border-slate-400 border-r w-1/4 p-0.5 pb-0" style="border:solid 1px lightgrey;">
      <input 
         v-model="props.bar.chords"
         @input="update"
         type="text"
         class="w-full"
         style="border:none;"
         name="chords" 
         />
      <input 
         v-model="props.bar.txt"
         @input="update"
         type="text"
         class="w-full " 
         style="border:none;"
         name="txt" 
         />
   </div>
</template>

<style scoped>
.bar_2 {
   float:left;
   display:flex;
   flex-direction:column;
   justify-content:space-between;   
   margin-bottom:.25rem;
   width:100%;background:yellow;
}
.bar_chord {
   border-left:solid 1px lightgrey;
   margin-bottom:3px;
}
.bar_lyrics_only {
   width:fit-content;
}
.bar_lyrics_only .lyric_line {
   white-space: pre; 
}
.edit_bar {
   padding:.3rem;
   border:solid 1px lightgrey;
   border-left:solid 1px lightgrey;
}
</style>
