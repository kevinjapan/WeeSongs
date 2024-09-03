import { ref, computed, watch } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'



// SearchStore
// separate store for Search so we can extend w/ history etc
// currently re-hydrates on 'back', to last search results set

export const useSearchStore = defineStore('search_store', () => {

   // state props
   const last_search_term = ref('')


   // actions
   function set_last_search_term(search_term) {
      last_search_term.value = search_term
   }

   return { 
      set_last_search_term,
      last_search_term
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}