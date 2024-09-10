<script setup>
import { ref, watch } from 'vue'
import reqInit from '../../../utilities/requestInit/RequestInit'
import { useAppStore } from '@/stores/appStore'


const app_store = useAppStore()
const props = defineProps(['search_term'])
const local_search_term = ref('')

const results_list = ref(null)

const loading = ref(false)

const no_matches = ref(false)

// we use a 'getter' to access the prop
// The get syntax binds an object property to a function that will be called when that property is looked up.
watch(() => props.search_term, async(newValue, oldValue) => {

   if(!newValue || newValue === '') return

   local_search_term.value = newValue

   results_list.value = null
   no_matches.value = false
   loading.value = true

   // delay for perceived 'workings'
   setTimeout(async() => {
      const result = await get_search_results()
   },500)
})


// get search results from server
const get_search_results = async() => {

   try {
      await fetch(`${app_store.app_api}/songs/search/${local_search_term.value}`,reqInit())
         .then(response => response.json())
         .then(data => {           
            // handle response : 401
            if(data.message) {
               if(data.message === 'Unauthenticated.') throw 'You need to login to perform this action'
            }
            if(data.songs_list.length === 0) {               
               results_list.value = null
               loading.value = false
               no_matches.value = true
               return
            }
            results_list.value = data
            loading.value = false 
         })
         .catch((error) => {
            throw error
         })
   }
   catch(error) {
      return {
         outcome: 'fail',
         message: error
      }
   }
   return {
      outcome: 'success',
      message: 'The search was completed successfully'
   }
}
</script>


<template>

   <ul v-if="results_list">      
      <li v-for="song in results_list.songs_list" :key="song.id">
         <RouterLink :to="{name:'songcontainer',params: {slug:song.slug}}">
            {{ song.title }}
         </RouterLink>
      </li>
   </ul>
   <div v-else-if="no_matches" class="mt_1">no matches were found</div>
   <div v-else-if="loading" class="loading mt_1"></div>

</template>


<style scoped>

</style>

