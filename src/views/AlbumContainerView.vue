<script setup>
import { ref, computed, reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useAlbumStore } from '@/stores/albumStore'
import Album from '../components/Albums/Album/Album/Album.vue'


// AlbumContainerView

const route = useRoute()
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
   if(result && result.message) notify_msg_list.value = result.message
   loading.value = false   
})


</script>


<template>
   <Transition>
      <section>
         
         <div v-if="has_error">
            There was a problem connecting to the server.
         </div>
         <div v-else>

            <div v-if="loading" class="loading"></div>

            <div v-else class="relative m_0 p_0">
               <Album :song="album_store.album" />
            </div>
         </div>
         
      </section>      
   </Transition>

</template>

<style scoped>
section {
   width:100%;
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
