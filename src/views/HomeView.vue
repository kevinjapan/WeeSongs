<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/appStore'



// HomeView

const app_store = useAppStore()

onMounted(() => {
   window.scroll(0,0)
})

</script>

<template>
   
   <section class="m_1 mt_3">
      <h1 class="text_left ml_1">WeeSongs</h1>
   
      <section v-if="app_store.app_api === ''" class="bg_info rounded m_2 p_1 text_left fit_content">

         <p>
            Hello, this is a static-site demo
            and not all features of the full application are available.
         </p>

      </section>
   </section>

</template>


