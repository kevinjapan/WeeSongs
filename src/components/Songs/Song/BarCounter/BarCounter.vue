<script setup>
import { ref } from 'vue'


// BarCounter


const props = defineProps(['bar','num_bars','editable'])

// we assign $attrs to <input> to enable emit to work w/ parent handler change_num_bars()
// since we have no single root element in template.
// event listeners (barNumsChanged) is passed to component and is now inherited by <input>
defineOptions({
   inheritAttrs: false
})

// previously, although not clear from docs, defining emits makes it function much more easily,
// otherwise have a lot of probs getting this working w/ converting case btwn emit and @.
const emit = defineEmits(['bar-nums-changed'])

// local state
const local_num_bars = ref(props.num_bars)

// we declare v-model on <input> below
// 'v-model' is equivalent to: <input :value="text" @input="event => text = event.target.value">
//  - wires up value bindings and change event listeners - 2-way binding w/ js variable

</script>


<template>
   <input 
      v-model="local_num_bars"
      v-bind="$attrs"
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
