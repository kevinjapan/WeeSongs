<script setup>
import { ref, computed, reactive, onBeforeMount, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { useAlbumStore } from '@/stores/albumStore'
import AlbumCtrls from '../components/Albums/AlbumCtrls/AlbumCtrls.vue'
import Album from '../components/Albums/Album/Album/Album.vue'


// AlbumContainerView

const router = useRouter()
const route = useRoute()
const app_store = useAppStore()
const album_store = useAlbumStore()

// custom suspense flag
const loading = ref(true)
const loading_error = reactive({is_error:false})
const has_error = computed(() => {
  return loading_error.is_error === true ? true : false
})

onBeforeMount(async() => {
   // load selected song into store (from 'slug' route param)
   const result = await album_store.load_album(route.params.slug)
   if(result && result.message) app_store.set_app_notifications(result.message)
   if(result.outcome === 'fail') {
      app_store.set_app_notifications(result.message)
      setTimeout(() => router.push(`/NotFound`),500)
   }
   loading.value = false   
})
onMounted(() => {
   window.scroll(0,0)
})

</script>

<template>
   <Transition>
      <section class="album_container_view">
         
         <div v-if="has_error">
            There was a problem connecting to the server.
         </div>
         <div v-else>

            <div v-if="loading" class="loading"></div>

            <div v-else class="relative m_0 p_0">


                  <AlbumCtrls />

                  <Album :song="album_store.album" />

               
            </div>
         </div>
         
      </section>      
   </Transition>
</template>

<style scoped>

section.album_container_view {
   background:var(--primary_color);;
   height:1200px;
}
/* configure Vue Transition component for app_nav slide-in*/
.v-enter-active,.v-leave-active {
   -webkit-transition: opacity 2.5s ease-in-out;  
   -o-transition: opacity 2.5s ease-in-out;
   transition: opacity 2.5s ease-in-out;
   
}
.v-enter-from,.v-leave-to {
   opacity: 0;
}
</style>
