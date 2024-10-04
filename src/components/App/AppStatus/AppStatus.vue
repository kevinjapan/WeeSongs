<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/appStore'


// AppStatus

// app-level flash notification utility component
// we don't use v-if in parent component, since we want to use transitions (v-if just toggles display)

const app_store = useAppStore()
const { notify_msg_list } = storeToRefs(app_store)

// since msg is our toggle flag, transitions take effect after the msg is emptied,
// we linger the text to allow transition effects to act on the text-filled component
const lingering_texts = ref([])

// Notification messages are held in an array (list) of strings
// assign msg then set to clear
watch(notify_msg_list, () => {
   let msg_key = 0
   if(notify_msg_list.value.length > 0) lingering_texts.value = notify_msg_list.value.map(msg => {
      return {
         key:msg_key++,
         text:msg
      }
   })

   
   // watch is called twice - our initial clear will trigger again - so we ignore second w/ empty msg list
   if(notify_msg_list.value.length > 0) {

      // we determine delay by no. of msgs in list
      const delay_before_clear = 1000 + (notify_msg_list.value.length * 2000 )
      setTimeout(() => {app_store.set_notify_msg_list([])},delay_before_clear)
   
   }
})

const close = () => {
   app_store.set_notify_msg_list([])
}

</script>

<template>
   <div class="app_status" :class="{app_status_bg:notify_msg_list.length > 0}" @click="close">
      <ul>
         <li v-for="text in lingering_texts" :key="text.key">
            {{ text.text }}
         </li>
      </ul>
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
   text-align:left;

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

ul, li {
   margin:0;
   padding:0;
}
li {
   border:solid 1px white;
   margin-top:.25rem;
   padding:.25rem;
   border-radius:.25rem;
}
</style>
