import { ref, computed, watch } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'


// AppStore

export const useAppStore = defineStore('app_store', () => {

   // toggle web_api/static
   const is_static = false

   // we use presence/absence as web_api/static toggle flag
   const app_api = is_static ? ref('') : ref('http://songs-api-laravel/api')

   // synch AppNav w/ current view 
   const curr_view_route = ref('')

   // we use presence/absence as logged-in flag
   const bearer_token = ref('')
   const username = ref('')

   // list_view_types
   const list_view_types = ['card','teaser_card','list']
   const list_view_type = ref('card')
   
   // we have a single AppNotifications app_notifications
   const app_notifications = ref([])

   // getters
   const get_api = computed(() => app_api.value)

   

   //
   const items_per_page = ref(20) 


   // future : persist login / bearer_token for limited time
   // - do post-static separation - we don't use login in static deployment.
   //   our server is a stateless rest model, so we need to save client-side
   //   and attempt to re-hydrate session...
   //   server-side, we need to verify correctly expiring tokens


   // set_app_notifications
   // accepts string or array of strings
   const set_app_notifications = (msg) => {
      let arr = Array.isArray(msg) ? [...msg] : [msg]
      app_notifications.value = arr
   }

   const user = ref({
      name:"kev",
      email:"kev@weesongsvuebuild.com"
   })
   watch(user,
      (user_value) => {
         localStorage.setItem("user",JSON.stringify(user_value))
      },
      {deep:true}
   )
   if(localStorage.getItem("user")) {
      user.value = JSON.parse(localStorage.getItem("user"))
   }

   // actions
   function set_api(new_api) {
      app_api.value = new_api
   }

   const is_logged_in = () => {
      return bearer_token.value !== '' ? true : false
   }

   function switch_list_view_type() {
      const curr_index = list_view_types.indexOf(list_view_type.value)
      const new_index = curr_index < list_view_types.length - 1   ?  curr_index + 1  :  0
      list_view_type.value = list_view_types[new_index]
   }

   return { 
      app_api, 
      curr_view_route,
      list_view_type,
      items_per_page,

      get_api, 
      set_api,
      bearer_token,
      username,
      app_notifications,
      set_app_notifications,
      is_logged_in,
      switch_list_view_type
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}