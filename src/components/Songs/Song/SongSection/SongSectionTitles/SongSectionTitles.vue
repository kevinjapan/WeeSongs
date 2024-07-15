<script setup>
import BarCounter from '../../BarCounter/BarCounter.vue'

const props = defineProps(['section','notify_updated_titles'])

const update = () => props.notify_updated_titles()

</script>

<template>
   <div style="display:flex;justify-content:start;max-width:160px;gap:0.5rem;" class="p_0.5">

      <input 
         v-model="props.section.daw" 
         class="w-12 text-slate-400" 
         name="daw" 
         style="width:15%;" 
         type="text"
         @input="update"
      />

      <input 
         v-model="props.section.title" 
         class="w-32 text-slate-400" 
         name="title" 
         style="width:85%;" 
         type="text"
         @input="update"
      />
      
      <BarCounter></BarCounter>
           <!-- num_bars={props.num_bars}
            onKeyPress={props.onBarsKeyPress} />-->
   
   </div>

</template>

<style scoped>

</style>
