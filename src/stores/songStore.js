
import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import useData from '../utilities/useData/useData'
import { get_new_song_template } from '../utilities/newSongTemplate/newSongTemplate'
import { get_new_section_template } from '../utilities/newSectionTemplate/newSectionTemplate'
import { get_db_ready_datetime } from '../utilities/dates/dates'


// SongStore

// Separate views will modify the store 'song' during user inputs, and these are 
// only commited on songStore.save() being called. Synch issues are negated by views 
// always fetching from db on startup. Any differences caused by interruption 
// (cancel,refresh etc) will be discarded on view opening.

export const useSongStore = defineStore('song_store', () => {

   // The current song
   const song = ref(null)

   // Songs List page
   const current_songs_page = ref(1)
   const current_order_by = ref('made')
   const current_asc = ref(false)

   // We follow state of local copy to server copy
   // Components can enable their 'apply' ctrls on this flag
   const synched = ref(true)

   // getters
   // const load_song = computed(() => app_api)

   // actions
   // change and rely on reactivity to update components


   // load_song
   // we load the song into the store's Song slot
   async function load_song(slug) {
      
      flush_prev_song() 

      const result = await get_song(slug)
      if(result.outcome === 'success') {

         // reset ids (for legacy songs w/ no 'id')
         // for simplicity, we just overwrite on each load since only uniqueness is important
         let reset_sec_id = 100
         for (const section of result.song.songsheet.aSections) {
            section.id = reset_sec_id
            let reset_bar_id = 1
            for (const bar of section.aBars) {
               bar.id = reset_sec_id + reset_bar_id++
            }
            reset_sec_id += 100
         }

         song.value = result.song
         // result.message = 'song successfully loaded into store'
      }
      synched.value = true
      return result
   }

   const flush_prev_song = () => {
      song.value = null
   }


   // get_song
   // utility function, we get the song, but don't 'store' it
   async function get_song(slug) {

      if(!slug || slug === '') return {outcome: 'fail',message: 'No valid resource slug was provided.'}
      
      let retrieved_song = null
      try {
         const { data, error } = await useData('get_single_song',[slug],{})
         if(data) {
            if(data.outcome === 'success') retrieved_song = data.song
         }
         else {
            throw error
         }
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
         song: retrieved_song
      }
   }

   async function create_song(title) {

      const new_song = get_new_song_template()
      const datetime = get_db_ready_datetime()
      new_song.title = title
      new_song.slug = title.replace(/ /g, '-')
      new_song.songsheet.title = title
      new_song.songsheet.made = datetime
      new_song.songsheet.updated = datetime

      try {
         const { data, error } = await useData('create_song',[],{},JSON.stringify(new_song))
         if(data) {
            if(data.outcome === 'success') song.value = data.song
         }
         else {
            throw error
         }
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
         message: '' // no notification, the song appears
      }
   }

   async function delete_song(song_id) {
   
      try {
         const { data, error } = await useData('delete_song',[song_id],{})
         if(data) {       
            // handle response : 401
            // PUT http://songs-api-laravel/api/songs/431 401 (Unauthorized)
            if(data.message) {
               if(data.message === 'Unauthenticated.') throw 'You need to login to perform this action'
            }
            if(data.outcome === 'success') {
               song.value = null
               // any redirection is carried out by client component (some eg lists may not want to)
            }
         }
         else {
            throw error
         }
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
         message: 'The song was successfully deleted'
      }
   }

   // future : non-static only - prevent client-side submit if writers field is not populated

   // save_song
   // save a modified copy of the song to the server (and replace copy in this store)
   async function save_song(modified_song) {
      
      // we have some duplication inside songsheet for convenience
      modified_song.songsheet.title = modified_song.title

      // future : legacy - we also have 'songsheet.updated'/'songsheet.url' which we are not maintaining
      //           any requirement for these in we will inject from db table fields
      //           remove from existing data songsheets

      // future : 'lyrics' field is deprecated - remove from data songsheets 

      try {

         const { data, error } = await useData('save_song',[modified_song.id],{},JSON.stringify(modified_song))
         if(data) {
            // handle response : 401
            // PUT http://songs-api-laravel/api/songs/431 401 (Unauthorized)
            if(data.message) {
               if(data.message === 'Unauthenticated.') throw 'You need to login to perform this action'
            }
            // refresh the local copy of song ('updated_at' will have changed)
            song.value = data
         }
         else {
            throw error
         }
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

   // save
   // save this store local copy to server (after we have updated_sections etc)
   async function save() {    

      try {
         const { data, error } = await useData('save_song',[song.value.id],{},JSON.stringify(song.value))
         if(data) {
            // handle response : 401
            // PUT http://songs-api-laravel/api/songs/431 401 (Unauthorized)
            if(data.message) {
               if(data.message === 'Unauthenticated.') throw 'You need to login to perform this action'
            }
            // note, there is inconsistency in packaging from server - cf w/ load_song api response
            song.value = data
         }
         else {
            throw error
         }
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

   async function update_song(modified_song) {
      try {
         const { data, error } = await useData('update_song',[modified_song.id],{},JSON.stringify(modified_song))
         if(data) {               
            // handle response : 401
            // PUT http://songs-api-laravel/api/songs/431 401 (Unauthorized)
            if(data.message) {
               if(data.message === 'Unauthenticated.') throw 'You need to login to perform this action'
            }
            song.value = data.song
         }
         else {
            throw error
         }
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

   // Song.Section operations

   function del_section(section_id) {
      
      // note using spread will only clone first level, all nested are still refs
      // for deeper unwrapping, use JSON.parse(JSON.stringify(song.value.songsheet))
      try {
         let modified = {...song.value.songsheet}
      
         const modified_sections = modified.aSections.filter(section => {
            return section.id !== section_id
         })
         modified.aSections = modified_sections

         song.value.songsheet = modified
         synched.value = false
      }
      catch(error) {
         return {
            outcome: 'fail',
            message: error
         }
      }
      return {
         outcome: 'success',
         message: 'The section was deleted successfully'
      }
   }

   function clone_section(section_id) {

      if(!section_id) {
         return {
            outcome: 'fail',
            message: "Corrupt SongSection -  missing 'id'."
         }
      }

      let next_daw = 'Z'

      try {
         let modified = {...song.value.songsheet}
         const target_section = modified.aSections.find(section => {
            return section.id === section_id
         })
         let copy_section = {...target_section}

         // calc id by incrementing current highest
         const ids = modified.aSections.map(section => section.id)
         ids.sort()
         copy_section.id = ids[ids.length - 1] + 1

         // calc next DAW char
         let daws = modified.aSections.map(section => section.daw)
         daws.sort()
         next_daw = String.fromCharCode(daws[daws.length -1].charCodeAt(0) + 1)
         if(next_daw > 'Z'.charCodeAt(0)) next_daw = 'Z'.charCodeAt(0)
         copy_section.daw = next_daw
         // we retain title since section type most likely remains the same
         modified.aSections.push(copy_section)
         song.value.songsheet = modified
         synched.value = false
      }
      catch(error){
         return {
            outcome: 'fail',
            message: error
         }
      }
      return {
         outcome: 'success',
         message: 'The section was cloned successfully',
         daw: next_daw
      }
   }

   function add_section() {
      
      let new_section = get_new_section_template()

      try {
         let modified = {...song.value.songsheet}

         // calc id by incrementing current highest
         const ids = modified.aSections.map(section => parseInt(section.id))

         // we sort numerically
         ids.sort((a, b) => a - b)

         // assign new id
         const last_id = parseInt(ids[ids.length - 1])
         new_section.id = last_id + 1

         // calc next DAW char
         const daws = modified.aSections.map(section => section.daw)
         daws.sort()
         const next_daw = String.fromCharCode(daws[daws.length -1].charCodeAt(0) + 1)
         if(next_daw > 'Z'.charCodeAt(0)) next_daw = 'Z'.charCodeAt(0)
         new_section.daw = next_daw

         modified.aSections.push(new_section)
         song.value.songsheet = modified
         synched.value = false
      }
      catch(error){
         return {
            outcome: 'fail',
            message: error
         }
      }
      return {
         outcome: 'success',
         message: 'The section was cloned successfully'
      }

   }

   function move_section(section_id,direction) {
         
      let moved_daw = 'Z'

      try {
         let modified = {...song.value.songsheet}

         const target_index = modified.aSections.findIndex(section => {
            return section.id === section_id
         })

         const swap_to_index = direction === "down" ? target_index + 1 :  target_index - 1
         if(swap_to_index > -1 && swap_to_index < modified.aSections.length) {
            const target_section = modified.aSections[target_index]
            moved_daw = target_section.daw
            const swap_section = modified.aSections[swap_to_index]
            if(swap_section) {
                  modified.aSections[swap_to_index] = target_section
                  modified.aSections[target_index] = swap_section
            }
         }
         song.value.songsheet = modified
      }
      catch(error) {
         return {
            outcome: 'fail',
            message: error
         }
      }
      synched.value = false
      return {
         outcome: 'success',
         message: 'The section was moved successfully',
         daw: moved_daw
      }
   }

   function update_section(section_id,modified_section) {

      try {
         let modified = {...song.value.songsheet}
         const target_index = modified.aSections.findIndex(section => {
            return section.id === section_id
         })
         modified.aSections[target_index] = modified_section
         song.value.songsheet = modified

         // apply is enabled in the SongSection component
         // synched.value = false
      }
      catch(error) {
         return {
            outcome: 'fail',
            message: error
         }
      }
      return {
         outcome: 'success',
         message: 'The section was updated successfully'
      }
   }

   // User has left page w/out applying changes - we revert to last saved
   function discard_changes() {
      load_song(song.value.slug)
   }


   return {
      song, 
      synched, 
      current_songs_page,
      current_order_by,
      current_asc,
      load_song, 
      get_song,
      create_song, 
      delete_song, 
      update_song, 
      save, 
      save_song,
      del_section, 
      clone_section, 
      add_section,
      move_section, 
      update_section,
      discard_changes,
   }

})


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useSongStore, import.meta.hot))
}