<script setup>
import { ref, computed, reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useSongStore } from '@/stores/songStore'
import SongCtrls from '../components/Songs/Song/SongCtrls/SongCtrls.vue'
import Song from '../components/Songs/Song/Song/Song.vue'


// SongContainerView

const route = useRoute()
const song_store = useSongStore()
const notify_msg = ref('')

// custom suspense flag
const loading = ref(true)
const loading_error = reactive({is_error:false})
const has_error = computed(() => {
  return loading_error.is_error === true ? true : false
})

// future : access slug from params
// console.log( 'params', route.params )

onBeforeMount(async() => {
   // load selected song into store (from 'slug' route param)
   const result = await song_store.load_song(route.params.slug)
   notify_msg.value = result.message
   loading.value = false
})

const apply_changes = async() => {
   const result = await song_store.save()
   notify_msg.value = result.message
}
</script>

<template>

   <section>
      
      <div v-if="has_error">
         There was a problem loading data, please try again later.
      </div>
      <div v-else>

         <div v-if="loading">
            Loading data...
         </div>

         <div v-else class="relative">

            <SongCtrls :apply_changes="apply_changes"/>

            <Song :song="song_store.song" />

         </div>
      </div>
      
   </section>
   
   <AppStatus v-model="notify_msg" />

</template>

<style scoped>

</style>
