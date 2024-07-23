<script setup>
import { ref } from 'vue'
import SearchForm from '../components/Search/SearchForm/SearchForm.vue'
import SearchResults from '../components/Search/SearchResults/SearchResults.vue'


// SearchView

const search_term = ref('')

const submit_search_term = () => {
   console.log('will search with',search_term.value)
}

</script>

<template>
  <h1>Search</h1>

   <SearchForm v-model="search_term" @submit-search-term="submit_search_term" />

   <SearchResults :search_term="search_term"/>
</template>

<style scoped>

</style>
