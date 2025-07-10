<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/appStore'



// HomeView

// to do : complete this improved UI snapshot demo - upload to Netlify
//         then create backup folder on www folder (for future changes to Netlify static version)
//         then continue work on server-supported version

const app_store = useAppStore()

onMounted(() => {
   window.scroll(0,0)
})

</script>

<template>
   
   <section class="m_1 mt_3">
      <h1 class="text_left ml_1">WeeSongs</h1>
   
      <section v-if="app_store.app_api === ''" class="bg_info rounded m_2 p_1 text_left fit_content" style="width:500px;">

         <h2>Hello</h2>
         <p>
            This is demo of a personal tool I use for managing my own songwriting catalog.
         </p>
         <p>
            This is a static-site demo and not all features of the full application are available.
            Notably, this version has no server backend, so you can't update content.
         </p>
         <p>
            
         </p>
         <p>
            Furthermore, this demo has not been optimized for all platforms. I develop on Windows,
            so I may not get round to testing this snapshot on IOS.
         </p>

      </section>
   </section>

</template>


