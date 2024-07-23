<script setup>
import BarCounter from '../../BarCounter/BarCounter.vue'

const emit = defineEmits(['barNumsChanged'])
const props = defineProps(['section','num_bars','notify_updated_titles','editable'])

// to do : we are mutating child properties of 'section' prop   
//          see 'Binding Multiple Properties Using an Object' in components/props.html

const update = () => props.notify_updated_titles()

const change_num_bars = (num) => {
   emit('barNumsChanged',num)
}

</script>

<template>
   <div style="display:flex;justify-content:start;max-width:500px;gap:0.5rem;" class="p_0.5">
      edit {{ props.editable }}

      <input 
         v-model="props.section.daw" 
         class="w-12 text-slate-400" 
         name="daw" 
         style="width:15%;" 
         type="text"
         @input="update"
         :readonly="props.editable === false"
      />

      <input 
         v-model="props.section.title" 
         class="w-32 text-slate-400" 
         name="title" 
         style="width:85%;" 
         type="text"
         @input="update"
         :readonly="props.editable === false"
      />
      
      <BarCounter :num_bars="props.num_bars" @bar-nums-changed="change_num_bars" :editable="props.editable"></BarCounter>
   
   </div>

</template>

<style scoped>

input[readonly] {
   background:pink;
}
</style>
