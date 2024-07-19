<script setup>
import { ref } from 'vue'


// BarCounter

const props = defineProps(['bar','num_bars'])
const local_num_bars = ref(props.num_bars)


// v-model below is equivalent to:
// <input
//   :value="text"
//   @input="event => text = event.target.value">

</script>

<template>
   <input 
      v-model="local_num_bars"
      @keyup.enter="$emit('barNumsChanged',local_num_bars)"
      class="w-12 text-slate-400" 
      name="num_bars"  
      type="text"
   />
</template>

<style scoped>

</style>
