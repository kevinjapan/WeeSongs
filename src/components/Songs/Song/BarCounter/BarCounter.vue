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
      name="num_bars"  
      type="text"
      :readonly="props.editable === false"
      class="num_bars_input"
   />
   <span class="local_num_label">bars</span>
</template>

<style scoped>

input {
   outline:none;
   border:solid 1px hsl(0, 0%, 83%);
   border-radius:.5rem;
   margin-left:.5rem;
}
.num_bars_input {
   max-width:2rem;
   text-align:center;
}
input:focus {
   border:solid 1px hsl(0, 0%, 33%);
   background:hsl(0, 0%, 92%);
}
input[readonly] {
   background:pink;
}
.local_num_label {
   font-size:.9rem;
   color:grey;
   padding-top:.25rem;
}
</style>
