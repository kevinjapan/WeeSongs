<script setup>
import { ref } from 'vue'
import BarCounter from '../../BarCounter/BarCounter.vue'


// SongSectionTitles

// Component Interface - props and emits
const props = defineProps({
   section: Object,
   num_bars: Number,
   editable: Boolean
})
const emit = defineEmits(
   ['section-daw-changed','section-title-changed','bar-nums-changed']

)

// local state - we don't want to mutate props child properties
const daw = ref(props.section.daw)
const title = ref(props.section.title)

// emit events
const change_daw = () => emit('section-daw-changed',daw.value)
const change_title = () => emit('section-title-changed',title.value)
const change_num_bars = num => emit('bar-nums-changed',num)

// future : validation on input lengths etc below - rollout

</script>

<template>

   <div class="song_section_titles">

      <input
         v-model="daw"
         name="daw"
         class="daw_input w-12 text-slate-400"
         type="text"
         @input="change_daw"
         :readonly="props.editable === false"
      />

      <input
         v-model="title"
         name="title"
         class="title_input w-32 text-slate-400"
         type="text"
         @input="change_title"
         :readonly="props.editable === false"
      />
      
      <BarCounter
         :num_bars="props.num_bars"
         :editable="props.editable"
         @bar-nums-changed="change_num_bars"
      />
   
   </div>

</template>

<style scoped>
.song_section_titles {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;

   -webkit-box-pack:start;
   -ms-flex-pack:start;
   justify-content:start;

   max-width:300px;
   gap:0.25rem;
   padding:0 0 .25rem 0;
}
input {
   outline:none;
   border:solid 1px hsl(0, 0%, 83%);
   border-radius:.5rem;
   padding-left:.5rem;
}
input:focus {
   border:solid 1px hsl(0, 0%, 33%);
   background:hsl(0, 0%, 92%);
}
input[readonly] {
   background:pink;
}
.title_input {
   width:85%;
}
.daw_input {
   width:15%;
}
</style>
