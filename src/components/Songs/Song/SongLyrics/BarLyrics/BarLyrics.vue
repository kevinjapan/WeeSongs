<script setup>
import { ref } from 'vue'


// BarLyrics
// single Bar component - only displays is contains lyrics (readonly)

const props = defineProps(['bar'])

// local state - we don't want to mutate props child properties
const chords = ref(props.bar.chords)
const txt = ref(props.bar.txt)

</script>

<template>
   <div class="bar_2 border-b border-slate-400 border-r w-1/4 p-0.5 pb-0" >
      <div>{{ chords }}</div>
      <div>{{  txt }}</div>
   </div>
</template>

<style scoped>
.bar_2 {
   float:left;
   
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;

   -webkit-box-orient:vertical;
   -webkit-box-direction:normal;
   -ms-flex-direction:column;
   flex-direction:column;

   -webkit-box-pack:justify;
   -ms-flex-pack:justify;
   justify-content:space-between;

   -webkit-box-align:start;
   -ms-flex-align:start;
   align-items:flex-start;

   margin-bottom:.25rem;
   padding-left:1rem;
   padding-right:1rem;
   width:100%;
   width:fit-content;
   max-width:fit-content;
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
