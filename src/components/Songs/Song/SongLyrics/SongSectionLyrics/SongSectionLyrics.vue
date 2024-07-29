<script setup>
import { ref, computed } from 'vue'
import BarLyrics from '../BarLyrics/BarLyrics.vue'


// SongSectionLyrics
// Readonly view of song lyrics only
// to simplify, we keep distinct from SongSection (which we re-used in orig implementation) 

const props = defineProps(['section'])

// local state - we don't want to mutate props child properties
const bars = ref(props.section.aBars)


const includes_text = computed(() => 
   // future : cover empty strings too
   bars.value.some((bar) => bar.txt !== null)
)

</script>


<template>
   <div v-if="includes_text">
      <div style="text-align:left;font-size:.9rem;color:grey;padding-left:1rem;margin-top:1rem;">{{ section.daw }} / {{ section.title }}</div>
      <div class="grid section_grid_2 w-full border-t border-l border-slate-400 text-slate-700">
         <BarLyrics
            v-for="bar in bars" 
            :key="bar.id" 
            :bar="bar"
         />
      </div>
   </div>
</template>


<style scoped>

/* 
future : review fit-content arg in this context: 
4 bars covers 90% of songs lyrics - so good enough
*/
.section_grid_2 {
   grid-template-columns: fit-content(40%) fit-content(40%) fit-content(40%) fit-content(40%);
}

</style>