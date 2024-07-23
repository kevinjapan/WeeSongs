<script setup>

// we use Component v-model to implement two-way binding
const search_term = defineModel()

// although not clear from docs, defining emits makes it function much more easily in the template w/ $emit
// otherwise have a lot of probs getting this working w/ converting case btwn emit and @.
const emit = defineEmits(['submitSearchTerm'])

</script>


<template>

   <form class="grid form_grid flex_col" @submit.prevent="apply">
      <label for="title">Search</label>
      <input id="title" name="title" v-model="search_term" />
      <div></div>
      <button @click="$emit('submitSearchTerm')">Search</button>
   </form>

</template>


<style scoped>

</style>


