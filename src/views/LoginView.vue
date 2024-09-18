<script setup>
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import useData from '../utilities/useData/useData'


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

const authenticate = async(credentials,cb_fail,cb_success) => {
   try {
      const { data, error } = await useData('login',[],{},JSON.stringify(credentials))
      if(data) {
         app_store.bearer_token = data.token
         app_store.username = data.user.name
         cb_success()
         loading.value = false 
      }
      else {
         console.log('ERR',error)
         throw error
      }
   }
   catch(error) {
      cb_fail(error)
   }
}

const login = () => {
   login_error.value = false
   loading.value = true 
   authenticate({email:email.value,password:password.value},(err) => failed(err),() => succeeded())
}

const failed = (error) => {
   // future : do we want to notify error to user?
   if(error) console.log(error)

   // we set a short delay to clearly empty and fill notification btwn attempts
   setTimeout(() => {
      login_error.value = true
      loading.value = false 
   },500)
      
}
const succeeded = () => {
   // we set a short delay to notify attempt succeeded
   has_success.value = true
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

         <div class="btn_row">
            <button type="submit">Login</button>
         </div>

      </form>

      <div v-if="loading" class="loading mt_1"></div>

      <div v-if="login_error">Sorry, we were unable to login.</div>

      <div v-if="has_success">
         <p>You were logged in successfully.</p>
      </div>

   </div>
</template>


<style scoped>
.btn_row {
   grid-column: 1 / 3;
   text-align:center;
}
</style>
