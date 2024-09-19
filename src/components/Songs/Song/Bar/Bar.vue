<script setup>
import { ref } from 'vue'


// Bar
// single Bar component within Section.aBars

const props = defineProps(
   ['bar','notify_updated_bar']
)
const emit = defineEmits(
   ['bar-chords-changed','bar-txt-changed']
)

// local state - we don't want to mutate props child properties
const chords = ref(props.bar.chords)
const txt = ref(props.bar.txt)

// emit events
const change_chords = () => emit('bar-chords-changed',props.bar.id,chords.value)
const change_txt = () => emit('bar-txt-changed',props.bar.id,txt.value)

</script>

<template>
   <div class="bar_2">
      <input 
         v-model="chords"
         name="chords"
         @input="change_chords"
         type="text"
         class="chord_input w-full" 
      />
      <input 
         v-model="txt"
         name="txt" 
         @input="change_txt"
         type="text"
         class="w-full "
      />
   </div>
</template>

<style scoped>
.bar_2 {
   float:left;
   display:flex;

   -webkit-box-orient:vertical;
   -webkit-box-direction:normal;
   -ms-flex-direction:column;
   flex-direction:column;

   -webkit-box-pack:justify;
   -ms-flex-pack:justify;
   justify-content:space-between;

   margin-bottom:0;
   width:100%;
   border:1px solid lightgrey;
   border-top:none;
}


div.bar_lyrics_only {
   width:fit-content;
}
.bar_lyrics_only .lyric_line {
   white-space: pre; 
}

input {
   outline:none;
   border:none;
   padding-left:.5rem;
}
input:focus {
   border:solid 1px hsl(0, 0%, 33%);
   background:hsl(0, 0%, 92%);
}
input[readonly] {
   background:pink;
}
.chord_input {
   color:hsl(0, 0%, 45%);
}
</style>
