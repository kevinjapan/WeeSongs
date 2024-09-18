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
      
      <div class="btn_row">
         <button v-if="search_term.length > 0" @click="$emit('submit-search-term')">Search</button>
         <button v-else disabled>Search</button>
      </div>
      
   </form>

</template>


<style scoped>
.btn_row {
   grid-column: 1 / 3;
   text-align:center;
}
</style>


