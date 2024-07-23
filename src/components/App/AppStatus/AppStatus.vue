<script setup>
import { ref, watch } from 'vue'


// AppStatus 
// app-level flash notification utility component
// we don't use v-if in parent component, since we want to use transitions (v-if just toggles display)

// we use Component v-model to implement two-way binding
// empties the parent components notify_msg w/out any explicit call
const notification_msg = defineModel()

// since msg is our toggle flag, transitions take effect after the msg is emptied,
// we linger the text to allow transition effects to act on the text-filled component
const lingering_text = ref('')

// assign msg then setTimeout to clear
watch(notification_msg, () => {
   if(notification_msg.value !== '') lingering_text.value = notification_msg.value
   setTimeout(() => {notification_msg.value = ''},2600)
})
</script>

<template>
   <div class="app_status" :class="{app_status_bg: notification_msg !== ''}">
      {{ lingering_text }}
   </div>
</template>

<style scoped>
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
