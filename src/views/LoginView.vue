<script setup>
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import reqInit from '../utilities/requestInit/RequestInit'


// LoginView

// const router = useRouter()
const app_store = useAppStore()
const email = ref('')
const password = ref('')

const login_error = ref(false)
const has_success = ref(false)

const loading = ref(false)

onMounted(() => {
   window.scroll(0,0)
})

const authenticate = (credentials,cb_fail,cb_success) => {

   let myRequest = new Request(
      `${app_store.app_api}/login`,
      reqInit('POST','',JSON.stringify(credentials))
   )
   fetch(myRequest)
      .then(response => response.json())
      .then(jsonDataSet => {
         app_store.bearer_token = jsonDataSet.token
         app_store.username = jsonDataSet.user.name
         cb_success()
         loading.value = false 
      })
      .catch(error => {
         cb_fail()
      })
}

const login = () => {
   login_error.value = false
   loading.value = true 
   authenticate({email:email.value,password:password.value},() => failed(),() => succeeded())
}

const failed = () => {
   // we set a short delay to clearly empty and fill notification btwn attempts
   setTimeout(() => {
      login_error.value = true
      loading.value = false 
   },500)
      
}
const succeeded = () => {
   // we set a short delay to notify attempt succeeded
   has_success.value = true
   // setTimeout(() => router.push('/songs'),1200)    // to do : temp disabled while fixing Albums navigation - single destination ok?
}

// to do : loading spinner while waiting for server response..
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

         <div class="btn_row">
            <button type="submit">Login</button>
         </div>

      </form>

      <div v-if="loading" class="loading mt_1"></div>

      <div v-if="login_error">We were unable to login.</div>

      <div v-if="has_success">
         <p>You were logged in successfully.</p>
         <p>Redirecting you to Songs.</p>
      </div>

   </div>
</template>


<style scoped>
button {
   max-width:fit-content;
   border:solid 1px grey;
   padding:.5rem;
   margin-left:auto;
   margin-right:auto;
}
.btn_row {
   grid-column: 1 / 3;
   text-align:center;
}
</style>
