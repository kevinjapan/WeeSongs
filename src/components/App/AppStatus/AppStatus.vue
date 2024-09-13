<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/appStore'


// AppStatus

// app-level flash notification utility component
// we don't use v-if in parent component, since we want to use transitions (v-if just toggles display)

const app_store = useAppStore()
const { notify_msg } = storeToRefs(app_store)

// since msg is our toggle flag, transitions take effect after the msg is emptied,
// we linger the text to allow transition effects to act on the text-filled component
const lingering_text = ref('')

// assign msg then setTimeout to clear
watch(notify_msg, () => {

   // to do : style UI better to present multiple msgs in notify_msg
   // to do : rename notify_msg -> notify_msg_list - it's now an array of strings (can be single)
   //         may need to revisit lingering_text and provide a func to break up the array nicely.
   // to do : there are still some timing issues w/ this mechanism - review thoroughly
   if(notify_msg.value.length > 0) lingering_text.value = notify_msg.value.join(' | ')
   setTimeout(() => {app_store.set_notify_msg([])},5000)
})


</script>

<template>
   <div class="app_status" :class="{app_status_bg:notify_msg.length > 0}">
      {{ lingering_text }}
   </div>
</template>

<style scoped>
.app_status {
   
   position:fixed;
   top:var(--status-msg-top);
   left:0;
   right:0;
   z-index:var(--app_status_z-index);
   width:fit-content;
   margin-left:auto;
   margin-right:auto;
   padding:1rem;
   background:lightgrey;
   border:solid 1px lightgrey;
   border-radius:.5rem;

   /* transitions */
   -webkit-transform: translateY(-400%);
   -ms-transform: translateY(-400%);
   transform: translateY(-400%);
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
