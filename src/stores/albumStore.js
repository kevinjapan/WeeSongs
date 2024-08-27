
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAppStore } from './appStore'
import reqInit from "../utilities/requestInit/RequestInit"
import { get_new_song_template } from '../utilities/newSongTemplate/newSongTemplate'
import { get_db_ready_datetime } from '../utilities/dates/dates'



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

   // ----
   async function load_album(slug) {
   
      const app_store = useAppStore()
      try {
         await fetch(`${app_store.app_api}/albums/${slug}`,reqInit())
            .then(response => response.json())
            .then(data => {
               if(data.outcome === 'success') {
                  album.value = data.album
               }
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
         message: ''   // we don't need notification, the album will appear
      }
   }


   return {
      album,
      curr_albums_page,
      curr_albums_order_by,
      curr_albums_asc,
      load_album
   }

})