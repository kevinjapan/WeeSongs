<script setup>
import { ref, watch } from 'vue'

// use Component v-model - v-model can be used on a component to implement a two-way binding
// to do : research - naming 'model' ? multiple 'models' ?

const model = defineModel()


// AppStatus 
// app-level flash notification utility component
// we don't use v-if in parent component, since we want to use transitions (v-if just toggles display)
// wrapper around AppStatusPopup to allow us to empty the notification message and transition

// to do : text still disappears just before transition completes - awkward

const props = defineProps(['message'])

// create local prop we can empty after timeout
const status_msg = ref('');

// linger to allow transition effect on text
const linger_status_msg = ref(model)
watch(model, () => {
      setTimeout(() => {model.value = ''},3000)
})

// watch prop.messages - get local ref using toRef()
// this method works but does not empty the parent's prop
// future : review Component v-model - recommended method for this type of binding
// const prop_status_msg = toRef(props,'message')
// watch(prop_status_msg,  () => {
//    status_msg.value = prop_status_msg.value
//    linger_status_msg.value = prop_status_msg.value
//    setTimeout(() => {status_msg.value = ''},3000)
// })
</script>

<template>
   <div class="app_status" :class="{app_status_bg: model !== ''}">{{ linger_status_msg }}
   </div>
</template>

<style scoped>
 
/* 
    AppStatus
    rqrd behavioural styling here - 'styling only' is w/ tailwind in component
*/
.app_status {

   position:fixed;
   top:var(--status-msg-top);
   left:0;
   right:0;
   z-index:var(--app-status-z-index);
   width:fit-content;
   margin-left:auto;
   margin-right:auto;
   padding:1rem;
   background:lightgrey;
   border:solid 1px lightgrey;
   border-radius:.5rem;

   /* transitions */
   -webkit-transform: translateY(-200%);
   -ms-transform: translateY(-200%);
   transform: translateY(-200%);

   opacity:0;

   -webkit-transition:opacity .35s ease-in-out,-webkit-transform .75s ease-in-out;
   transition:opacity .35s ease-in-out,-webkit-transform .75s ease-in-out;
   -o-transition:opacity .35s ease-in-out,transform .75s ease-in-out;
   transition:opacity .35s ease-in-out,transform .75s ease-in-out;
   transition:opacity .35s ease-in-out,transform .75s ease-in-out,-webkit-transform .75s ease-in-out;
}
.app_status_bg {

   /* transitions */
   -webkit-transform: translateY(0);
   -ms-transform: translateY(0);
   transform: translateY(0);

   opacity:1;

   -webkit-transition:opacity 1s ease-in-out,-webkit-transform .75s ease-in-out;
   transition:opacity 1s ease-in-out,-webkit-transform .75s ease-in-out;
   -o-transition:opacity 1s ease-in-out,transform .75s ease-in-out;
   transition:opacity 1s ease-in-out,transform .75s ease-in-out;
   transition:opacity 1s ease-in-out,transform .75s ease-in-out,-webkit-transform .75s ease-in-out;
}
</style>
