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
   await song_store.load_song(route.params.slug)   // to do : use return from load_song() - see song_store.save()'s return..
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

         <div class="relative" v-else>

            <!-- to do : enable Apply btn - we use two methods to practice them -->
            <div v-if="!song_store.synched">
               <button :class="{ active_button: !song_store.synched}" @click="apply_changes">Apply</button>
            </div>

            <SongCtrls />

            <Song :song="song_store.song" />
         </div>
      </div>
      
   </section>
   
   <AppStatus v-model="notify_msg" />

</template>

<style scoped>
.active_button {
   background:yellow;/* to do : */
}
</style>
