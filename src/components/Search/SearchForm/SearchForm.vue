<script setup>

// we use Component v-model to implement two-way binding
const search_term = defineModel()

// although not clear from docs, at points omitted, at others described as 'optional',
// defining emitted events using defineEmits macro makes it function much more easily in the template w/ $emit
// otherwise we have a lot of probs getting this working w/ converting event name's case btwn emit and @.
const emit = defineEmits(['submit-search-term'])

</script>


<template>

   <form class="grid form_grid flex_col" @submit.prevent="apply">
      <label for="title">Search</label>
      <input id="title" name="title" v-model="search_term" />
      <div></div>
      <button @click="$emit('submit-search-term')">Search</button>
   </form>

</template>


<style scoped>

</style>


