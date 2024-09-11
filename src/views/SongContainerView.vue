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

const selected_section_daw = ref('A')

// custom suspense flag
const loading = ref(true)
const loading_error = reactive({is_error:false})
const has_error = computed(() => {
  return loading_error.is_error === true ? true : false
})

onBeforeMount(async() => {
   // load selected song into store (from 'slug' route param)
   const result = await song_store.load_song(route.params.slug)
   if(result && result.message) notify_msg.value = result.message
   loading.value = false
})

const apply_changes = async() => {
   const result = await song_store.save()
   notify_msg.value = result.message
}

const test_this = (daw) => {
   selected_section_daw.value = daw
}

</script>

<template>

   <Transition>
      <section>
         
         <SongCtrls 
            :selected_section_daw="selected_section_daw"
            :apply_changes="apply_changes"
            @set-selected-section-daw="test_this"
         />

         <div v-if="has_error">
            There was a problem loading data from the server, please try again later.
         </div>
         <div v-else>

            <div v-if="loading" class="loading"></div>

            <div v-else class="relative m_0 p_0">
               <Song 
                  :song="song_store.song" 
                  :selected_section_daw="selected_section_daw"
               />
            </div>
         </div>
         
      </section>      
   </Transition>

   <AppStatus v-model="notify_msg" />

</template>

<style scoped>
section {
   width:100%;
}

/* configure Vue Transition component for app_nav slide-in*/
.v-enter-active,.v-leave-active {
   -webkit-transition: opacity 1s ease-in-out;  
   -o-transition: opacity 1s ease-in-out;
   transition: opacity 1s ease-in-out;
   
}
.v-enter-from,.v-leave-to {
   opacity: 0;
}
</style>
