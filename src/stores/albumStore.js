
import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useSongStore } from '@/stores/songStore'
import useData from '../utilities/useData/useData'
import { get_new_album_template } from '../utilities/newAlbumTemplate/newAlbumTemplate'



// AlbumStore


export const useAlbumStore = defineStore('album_store', () => {


   // The current album
   const album = ref(null)


   // Albums List page
   const curr_albums_page = ref(1)
   const curr_albums_order_by = ref('made')
   const curr_albums_asc = ref(false)


   // We follow state of local copy to server copy
   // Components can enable their 'apply' ctrls on this flag
   const synched = ref(true)

   async function create_album(title) {

      const new_album = get_new_album_template()
      new_album.title = title
      new_album.slug = title.replace(/ /g, '-')

      try {
         const { data, error } = await useData('create_album',[],{},JSON.stringify(new_album))
         if(data) {
            if(data.outcome === 'success') album.value = data.album
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
         message: ''   // we don't need notification, the album will appear
      }
   }

   async function load_album(slug) {

      try {
         const { data, error } = await useData('load_album',[slug],{})
         if(data) {
            if(data.outcome === 'success') album.value = data.album
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
         message: ''   // we don't need notification, the album will appear
      }
   }


   // to do : not saving 'title' correctly to database (suspect prev. issue not related to useData switch)

   // save a modified copy of the song to the server (and replace copy in this store)
   async function save_album(modified_album) {

      try {
         const { data, error } = await useData('save_album',[modified_album.id],{},JSON.stringify(modified_album))
         if(data) {           
            // handle response : 401
            // PUT http://songs-api-laravel/api/albums/431 401 (Unauthorized)
            if(data.message) {
               if(data.message === 'Unauthenticated.') throw 'You need to login to perform this action'
            }
            // refresh the local copy of song ('updated_at' will have changed)
            album.value = data
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
         message: 'The album was updated successfully'
      }
   }

   
   // save this store local copy to server (after we have updated_sections etc)
   async function save() {

      try {         
         const { data, error } = await useData('save_album',[song.value.id],{},JSON.stringify(album.value))
         if(data) {
            // handle response : 401
            // PUT http://songs-api-laravel/api/albums/431 401 (Unauthorized)
            if(data.message) {
               if(data.message === 'Unauthenticated.') throw 'You need to login to perform this action'
            }
            // note, there is inconsistency in packaging from server - cf w/ load_song api response
            album.value = data
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
         message: 'The album was updated successfully'
      }
   }

   async function update_album(modified_album) {

      try {         
         const { data, error } = await useData('update_album',[modified_song.id],{},JSON.stringify(modified_album))
         if(data) {         
            // handle response : 401
            // PUT http://songs-api-laravel/api/albums/431 401 (Unauthorized)
            if(data.message) {
               if(data.message === 'Unauthenticated.') throw 'You need to login to perform this action'
            }
            album.value = data.album
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
         message: 'The album was updated successfully'
      }
   }


   async function add_album_tracks(album_id,tracks_slugs_list) {

      if(!album_id || typeof album_id === 'undefined') return {error:' Failed to find album - the album id provided was invalid. '}
      if(!Array.isArray(tracks_slugs_list)) return {error:' The provided list of tracks to add was invalid. '}

      const song_store = useSongStore()
      let error = []

      for (const song_slug of tracks_slugs_list) {

         const song_obj = await song_store.get_song(song_slug)
         if(song_obj.outcome === 'success') {
            const modified_song = song_obj.song
            if(modified_song.song && modified_song.song.album) delete modified_song.song.album
            modified_song.album_id = album_id

            // to do : check we are logged in way *before* attempting this operation - rollout all similar calls to stores.

            const updated_result = await song_store.update_song(modified_song)
            if(updated_result.outcome === 'success') {
               // will pass updated data
            }
            else {
               // failed to update_song
               tracks_slugs_list = null
               error.push(updated_result.message)
            }
         }
         else {
            // failed to get_song
            tracks_slugs_list = null
            error.push(song_obj.message)
         }
      }
      return {
         data: tracks_slugs_list,
         error: error.join('|')
      }
   }

   async function remove_album_tracks(tracks_slugs_list) {

      if(!Array.isArray(tracks_slugs_list)) return {error:' The provided list of tracks to remove was invalid. '}

      const song_store = useSongStore()
      let error = []

      for (const song_slug of tracks_slugs_list) {

         const song_obj = await song_store.get_song(song_slug)
         if(song_obj.outcome === 'success') {
            const modified_song = song_obj.song
            if(modified_song.song && modified_song.song.album) delete modified_song.song.album
            modified_song.album_id = null
            
            const updated_result = await song_store.update_song(modified_song)
            if(updated_result.outcome === 'success') {
               // will pass updated data
            }
            else {
               // failed to update_song
               tracks_slugs_list = null
               error.push(updated_result.message)
            }
         }
         else {
            // failed to get_song
            tracks_slugs_list = null
            error.push(song_obj.message)
         }
      }
      return {
         data: tracks_slugs_list,
         error: error.join('|')
      }
   }

   
   async function delete_album(album_id) {
   
      try {
         const { data, error } = await useData('delete_album',[album_id],{})
         
         if(data) {      
            // handle response : 401
            // PUT http://songs-api-laravel/api/albums/431 401 (Unauthorized)
            if(data.message) {
               if(data.message === 'Unauthenticated.') throw 'You need to login to perform this action'
            }
            if(data.outcome === 'success') {
               album.value = null
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
         message: 'The album was successfully deleted'
      }
   }


   // User has left page w/out applying changes - we revert to last saved
   function discard_changes() {
      load_album(album.value.slug)
   }

   return {
      album,
      create_album,
      load_album,
      save_album,
      save,
      update_album,
      delete_album,
      add_album_tracks,
      remove_album_tracks,
      discard_changes,
      curr_albums_page,
      curr_albums_order_by,
      curr_albums_asc
   }

})


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useAlbumStore, import.meta.hot))
}