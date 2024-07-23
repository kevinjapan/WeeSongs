<script setup>
import { ref, onUpdated } from 'vue'

const props = defineProps(['search_term'])
const local_search_term = ref('')

// capture changing search_term props
onUpdated(() => {
   local_search_term.value = props.search_term
})

// get search results from server
const get_search_results = async() => {

   try {
      await fetch(`${app_store.app_api}/songs/search/${local_search_term}`,reqInit())
         .then(response => response.json())
         .then(data => {           
            // handle response : 401
            if(data.message) {
               if(data.message === 'Unauthenticated.') throw 'You need to login to perform this action'
            }
            // note, there is inconsistency in packaging from server - cf w/ load_song api response
            // song.value = data
            console.log('got list - do something to do : ')
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
   
   search results : {{ local_search_term }}

</template>


<style scoped>

</style>

