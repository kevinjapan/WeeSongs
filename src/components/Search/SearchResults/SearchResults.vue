<script setup>
import { ref, watch } from 'vue'
import reqInit from '../../../utilities/requestInit/RequestInit'
import { useAppStore } from '@/stores/appStore'


const app_store = useAppStore()
const props = defineProps(['search_term'])
const local_search_term = ref('')
const results_list = ref(null)


watch(() => props.search_term, async(newValue, oldValue) => {
   local_search_term.value = newValue
   const result = await get_search_results()
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
            results_list.value = data
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
      message: 'The song was updated successfully'
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

</template>


<style scoped>

</style>

