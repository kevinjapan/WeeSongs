import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'


//
// AppStore
//

export const useAppStore = defineStore('app_store', () => {

   // state props
   const app_api = ref('http://songs-api-laravel/api')

   // we use presence/absence as logged in flag
   const bearer_token = ref('')
   const username = ref('')

   // getters
   const get_api = computed(() => app_api.value)

   // to do : expand on using patterns,  persist some data
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
      app_api, get_api, set_api,
      bearer_token,
      username
   }
 })

