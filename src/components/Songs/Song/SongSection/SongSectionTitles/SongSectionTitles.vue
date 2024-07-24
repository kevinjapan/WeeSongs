<script setup>
import { ref } from 'vue'
import BarCounter from '../../BarCounter/BarCounter.vue'

const props = defineProps(['section','num_bars','notify_updated_titles','editable'])
const emit = defineEmits(['section-daw-changed','section-title-changed','bar-nums-changed'])

// local state - we don't want to mutate props child properties
const daw = ref(props.section.daw)
const title = ref(props.section.title)

// emit events
const change_daw = () => emit('section-daw-changed',daw.value)
const change_title = () => emit('section-title-changed',title.value)
const change_num_bars = num => emit('bar-nums-changed',num)

</script>

<template>
   <div style="display:flex;justify-content:start;max-width:500px;gap:0.5rem;" class="p_0.5">
      edit {{ props.editable }}

      <input
         v-model="daw"
         class="w-12 text-slate-400"
         name="daw"
         style="width:15%;"
         type="text"
         @input="change_daw"
         :readonly="props.editable === false"
      />

      <input
         v-model="title"
         class="w-32 text-slate-400"
         name="title"
         style="width:85%;"
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

input[readonly] {
   background:pink;
}
</style>
