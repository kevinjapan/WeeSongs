<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSearchStore } from '@/stores/searchStore'
import SearchForm from '../components/Search/SearchForm/SearchForm.vue'
import SearchResults from '../components/Search/SearchResults/SearchResults.vue'


// SearchView

const search_store = useSearchStore()

// building search_term w/ SearchForm
const search_term = ref(search_store.last_search_term)

// assigning search_term to SearchResults and execute search
const real_search_term = ref('')

const submit_search_term = () => {
   real_search_term.value = search_term.value 
}

// crude, we re-instate any existing last_search_term,
// future : distinguish from 'back' and navigation to Search page
onMounted(() => {
   real_search_term.value = search_store.last_search_term
})

// to do : review - this work in all reasonable scenarios?
onUnmounted(() => {
   search_store.set_last_search_term(real_search_term.value)
})

</script>

<template>
   <h1>Search</h1>
   <SearchForm v-model="search_term" @submit-search-term="submit_search_term" />
   <SearchResults :search_term="real_search_term"/>
</template>

<style scoped>

</style>
