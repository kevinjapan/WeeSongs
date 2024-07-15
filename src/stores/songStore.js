
import { ref,computed,watch } from 'vue'
import { defineStore } from 'pinia'
import { useAppStore } from './appstore'
import reqInit from "../utilities/requestInit/RequestInit"


// SongStore

// Separate views will modify the store 'song' during user inputs, and these are 
// only commited on songStore.save() being called. Synch issues are negated by views 
// always fetching from db on startup. Any differences caused by interruption 
// (cancel,refresh etc) will be discarded on view opening.

export const useSongStore = defineStore('song_store', () => {

   //
   // state props
   //

   // The current song
   const song = ref(null)

   // We follow state of local copy to server copy
   // Components can enable their 'apply' ctrls on this flag
   const synched = ref(true)

   const my_object = ref({
      name:'my_object_name',
      code:'my_object_code_key'
   })

   //
   // getters
   //
   // const load_song = computed(() => app_api) - only for getting stuff!
   // to do : research - getters are cached (?), so any op inside will effectively only act once until state has changed again


   //
   // actions
   //
   // change and rely on reactivity to update components
   function change_my_object() {
      // store.$patch({
      //    count: store.count + 1,
      //    age: 120,
      //    name: 'DIO',
      //  })
       
   }

   watch(() => song.value,(new_song) => {
      if(new_song) {
         console.log('song changed in store')
      }
   })

   async function load_song(slug) {
   
      // to use another store, we 'use' it inside an action
      const app_store = useAppStore()

      await fetch(`${app_store.app_api}/songs/${slug}`,reqInit())
         .then(response => response.json())
         .then(data => {
            if(data.outcome === 'success') {
               song.value = data.song
            }
         })
         .catch((error) => {
            console.log('ERR',error)
         })
      synched.value = true
   }

   async function save() {

      const app_store = useAppStore()
      try {
         await fetch(`${app_store.app_api}/songs/${song.value.id}`,reqInit('PUT',app_store.bearer_token,JSON.stringify(song.value)))
            .then(response => response.json())
            .then(data => {           
               // handle response : 401
               // PUT http://songs-api-laravel/api/songs/431 401 (Unauthorized)
               if(data.message) {
                  if(data.message === 'Unauthenticated.') throw 'You need to login before you can perform this action'
               }
               // note, there is inconsistency in packaging from server - cf w/ load_song api response
               song.value = data
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
      synched.value = true
      return {
         outcome: 'success',
         message: 'The song was saved successfully'
      }
   }

   async function update_song(modified_song) {

      const app_store = useAppStore()
      try {
         await fetch(`${app_store.app_api}/songs/${modified_song.id}`,reqInit('PUT',app_store.bearer_token,JSON.stringify(modified_song)))
            .then(response => response.json())
            .then(data => {               
               // handle response : 401
               // PUT http://songs-api-laravel/api/songs/431 401 (Unauthorized)
               if(data.message) {
                  if(data.message === 'Unauthenticated.') throw 'You need to login before you can perform this action.'
               }
               song.value = data.song
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
      synched.value = true
      return {
         outcome: 'success',
         message: 'The song was updated successfully'
      }
   }

   async function del_section(section_id) {
      
      let modified = {...song.value.songsheet}
      const modified_sections = modified.aSections.filter(section => {
         return section.id !== section_id
      })
      modified.aSections = modified_sections
      song.value.songsheet = modified

      synched.value = false

      return {
         outcome: 'success',
         message: 'The section was deleted successfully'
      }
   }

   return {
      my_object, change_my_object,
      song, synched, load_song, update_song, save, del_section
   }

})