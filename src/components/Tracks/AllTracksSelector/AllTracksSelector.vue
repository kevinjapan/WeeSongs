<script setup>
import { ref, onBeforeMount, onUpdated } from 'vue'
import { useAppStore } from '@/stores/appStore'
import useData from '../../../utilities/useData/useData'
import reqInit from '../../../utilities/requestInit/RequestInit'
import init_infinite_scroll from '../../../utilities/intersections/intersections'



// AllTracksSelector


const props = defineProps({
  client_track_list: Array
})

console.log('client_track_list:',props.client_track_list)
const emit = defineEmits(['update-track-list'])

const app_store = useAppStore()

// augment this array as more 'pages' arrive
const all_tracks_list = ref([])

// list slugs of checked tracks
const selected_tracks = ref([])

// list of slugs for existing track list (we should check these)
const slugs_only = ref([])

// manage 'page' arrivals / intersection observer
const curr_page = ref(0)
const last_page = ref(1)
const is_last_page = ref(false)


// to do : set a fail-safe - so we stop after x pages


onBeforeMount(() => {
   get_list()
   slugs_only.value = props.client_track_list.map(track => {
      return track
   })
})

onUpdated(() => {
   init_infinite_scroll(get_list)
})

const get_list = async() => {

   if(curr_page.value + 1 > last_page.value) return
   
   const query_params = {
      order_by:'title',
      asc:true,
      page:curr_page.value + 1
   }
      
   const { data, error } = await useData('songs_list',query_params,reqInit())

   if(data) {
      curr_page.value = curr_page.value + 1
      last_page.value = data.songs_list.last_page
      is_last_page.value = curr_page.value >= last_page.value ? true : false         
      all_tracks_list.value = [...all_tracks_list.value,...data.songs_list.data]

      check_curr_tracks_list()

      // to do : loading.value = false
   }
   else {
      console.log('ERR',error)
      // to do : loading_error.is_error = true
   }
}

const check_curr_tracks_list = () => {
   selected_tracks.value = [...slugs_only.value]
}

const apply = () => {

   selected_tracks.value.sort()

   // we pass a copy of the list, not a ref
   emit('update-track-list',[...selected_tracks.value])
}

</script>

<template>

   <section class="all_tracks_selector">
   
      <ul>
         <li v-for="track in all_tracks_list" :key="track.id">            
            <input type="checkbox" :id="track.id" :name="track.slug" v-model="selected_tracks" 
               :value="track.slug"

            />
            <label :for="track.slug">{{ track.title }}</label>
         </li>
         <li v-if="is_last_page === false" class="infinite_scroll_trigger loading"></li>
      </ul>

      <button @click="apply">apply</button>

   </section>
   
</template>


<style scoped>
section.all_tracks_selector {
   position:absolute;
   top:30px;
   left:60px;
   width:340px;
   height:260px;
   padding:1rem 1rem .5rem 1rem;
   overflow-y:hidden;
   background:white;
   border:solid 1px grey;
   border-radius:.25rem;
}
ul {
   height:80%;
   margin:0;
   padding:0;
   overflow-y:scroll;
   overscroll-behavior: contain;
}
li.loading {
   margin-top:2rem;
   margin-bottom:2rem;
}
</style>