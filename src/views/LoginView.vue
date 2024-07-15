<script setup>
import { ref,reactive,computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appstore'
import reqInit from '../utilities/requestInit/RequestInit'

//
// LoginView
//

// to do : handle login invalid attempts 
// - empty strings
// - invalid values

// to do : handle if server not available


const router = useRouter()
const app_store = useAppStore()
const email = ref('')
const password = ref('')
const login_error = reactive({is_error:false})     // to do : 'login_success' better?

const has_login_error = computed(() => {
  return login_error.is_error === true ? true : false
})

const authenticate = (credentials,cb_fail,cb_success,cb_restart) => {

   let myRequest = new Request(
      `${app_store.app_api}/login`,
      reqInit('POST','',JSON.stringify(credentials))
   )
   fetch(myRequest)
      .then(response => response.json())
      .then(jsonDataSet => {
         app_store.bearer_token = jsonDataSet.token
         app_store.username = jsonDataSet.user.name
         login_error.is_error = false         
         router.push('/songs')
      })
      .catch(error => {
         login_error.is_error = true
      })
}

const login = () => {
   authenticate({email:email.value,password:password.value},() => failed(),() => succeeded(),() => restart())
}
</script>


<template>
   <div class="">

      <div class="">
            <h3 class="text-2xl">Login</h3>
      </div>
      
      <form class="grid form_grid flex_col" @submit.prevent="login">

         <label for="email">Email</label>
         <input 
            v-model="email" 
            id="email"
            name="email" 
            type="text" 
            class="border border-slate-200"
            maxLength="120"/>
         <label for="password">Password</label>

         <input 
            v-model="password"
            name="password" 
            id="password"
            type="text" 
            class="border border-slate-200"
            maxLength="36"/>
         <div></div>
         <button type="submit">Login</button>

      </form>


      <div v-if="has_login_error">
         We were unable to login.
      </div>
      <div v-else>
         token: {{ app_store.bearer_token }}
      </div>

   </div>
</template>


<style scoped>

/* to do : duplicates form layout in SongMetaView */

.grid {
   display:grid;
   gap:1rem;
}
form {
   max-width:600px;
   margin:1rem;
   margin-left:auto;
   margin-right:auto;
   text-align:right;
}
.form_grid {
   -ms-grid-columns: 1fr 4fr;
   grid-template-columns: 1fr 4fr;
}
.form_ctrls {
   width:100%;
   background:yellow;
}
input {
   padding:.25rem;
}
.readonly_input {
   border:solid 1px lightgrey;
}
button {
   max-width:fit-content;
   border:solid 1px grey;
   padding:.5rem;
   margin-left:auto;
   margin-right:auto;
}
</style>
