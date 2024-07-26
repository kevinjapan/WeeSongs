<script setup>
import { ref } from 'vue'


// Bar
// single Bar component within Section.aBars

const props = defineProps(['bar','notify_updated_bar'])
const emit = defineEmits(['bar-chords-changed','bar-txt-changed'])

// local state - we don't want to mutate props child properties
const chords = ref(props.bar.chords)
const txt = ref(props.bar.txt)

// emit events
const change_chords = () => emit('bar-chords-changed',props.bar.id,chords.value)
const change_txt = () => emit('bar-txt-changed',props.bar.id,txt.value)

</script>

<template>
   <div class="bar_2 border-b border-slate-400 border-r w-1/4 p-0.5 pb-0" style="border:solid 1px lightgrey;">
      <input 
         v-model="chords"
         name="chords"
         @input="change_chords"
         type="text"
         class="w-full"
         style="border:none;" 
         />
      <input 
         v-model="txt"
         name="txt" 
         @input="change_txt"
         type="text"
         class="w-full " 
         style="border:none;"
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
