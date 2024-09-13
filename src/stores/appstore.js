import { ref, computed, watch } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'


//
// AppStore
//

export const useAppStore = defineStore('app_store', () => {

   // state props
   const app_api = ref('http://songs-api-laravel/api')

   // we use presence/absence as logged in flag
   const bearer_token = ref('')
   const username = ref('')

   // we have a single AppStatus notify_msg
   const notify_msg = ref([])

   // getters
   const get_api = computed(() => app_api.value)


   // to do : persist login / bearer_token for limited time
   //   our server is a stateless rest model, so we need to save client-side
   //   and attempt to re-hydrate session...
   //   server-side, we need to verify correctly expiring tokens


   // set_notify_msg
   // accepts string or array of strings
   const set_notify_msg = (msg) => {
      let arr = Array.isArray(msg) ? [...msg] : [msg]
      notify_msg.value = arr
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

   return { 
      app_api, 
      get_api, 
      set_api,
      bearer_token,
      username,
      notify_msg,
      set_notify_msg
   }
 })


// hot module replacement for pinia
if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}