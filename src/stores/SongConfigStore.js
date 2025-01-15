import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'




// SongConfigStore
// config properties for Songs

export const useSongConfigStore = defineStore('song_config_store', () => {


   // max no. sections per song. future : may be server-side, so use ref to propogate any future udpates
   const max_sections = ref(12)




   return {
      max_sections
   }

})

// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useSongConfigStore, import.meta.hot))
}