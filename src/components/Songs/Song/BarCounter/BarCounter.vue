<script setup>
import { ref } from 'vue'


// BarCounter

const props = defineProps(['bar','num_bars','editable'])

// local state
const local_num_bars = ref(props.num_bars)

// although not clear from docs, defining emits makes it function much more easily,
// otherwise have a lot of probs getting this working w/ converting case btwn emit and @.
// const emit = defineEmits(['bar-nums-changed'])

// --------------------------------------------------------------------------------------------
// v-model
//
// 'v-model' is equivalent to:
//
//   <input
//      :value="text"
//      @input="event => text = event.target.value">
//
//  - wires up value bindings and change event listeners - 2-way binding w/ js variable
//  - we want to bind to state within this component - not to props or props child properties
// --------------------------------------------------------------------------------------------

</script>

<template>
   <input 
      v-model="local_num_bars"
      @keyup.enter="$emit('bar-nums-changed',local_num_bars)"
      class="w-12 text-slate-400" 
      name="num_bars"  
      type="text"
      :readonly="props.editable === false"
   />
</template>

<style scoped>

input[readonly] {
   background:pink;
}
</style>
