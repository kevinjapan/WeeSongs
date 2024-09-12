<script setup>
import { ref, onBeforeMount } from 'vue'
import useData from '../../../utilities/useData/useData'
import init_infinite_scroll from '../../../utilities/intersections/intersections'



// AllTracksSelector

// 'infinite_scroll_trigger' has potential to spam server, so we provide failsafes
// we rely on 'last_page' to remove 'infinite_scroll_trigger' and hence stop requests
// this should always work, but there are two failsafes to prevent endless loop if
// server fails to return this parameter


const props = defineProps({
  client_track_list: Array
})
const emit = defineEmits(
   ['update-track-list']
)

// augment this array as more 'pages' arrive
const all_tracks_list = ref([])
 
// 'abs_pages_failsafe' : stops endless loop but limits total songs to (max_last_page x records_per_page)
const max_last_page = 100

// list slugs of checked tracks
const selected_tracks = ref([])

// list of slugs for existing track list (we should 'check' checkbox for these)
const slugs_only = ref([])

// manage 'page' arrivals / intersection observer
const curr_page = ref(0)
const last_page = ref(1)
const is_last_page = ref(false)

onBeforeMount(() => {
   get_list()
   slugs_only.value = props.client_track_list.map(track => track)
   init_checked_tracks()
   init_infinite_scroll()
})

const get_list = async() => {

   const next_page = curr_page.value + 1

   if(next_page > last_page.value) return
   if(next_page > max_last_page) return
   
   const query_params = {
      order_by:'title',
      asc:true,
      page:next_page
   }
   const { data, error } = await useData('songs_list',[],{})
   if(data) {

      curr_page.value = next_page
      last_page.value = data.songs_list.last_page
      is_last_page.value = curr_page.value >= last_page.value ? true : false
         
      // 'no_data_failsafe' : if we have gone too far w/ page num and no data is returned
      // this failsafe enforces no limit on the num of songs
      if(data.songs_list.data.length === 0) { is_last_page.value = true
         console.log('no data failsafe')
      }

      all_tracks_list.value = [...all_tracks_list.value,...data.songs_list.data]

      // only reset intersection observer upon loading new page
      init_infinite_scroll(get_list)
   }
   else {
      console.log('ERR',error)
      // to do : loading_error.is_error = true
   }
}

const init_checked_tracks = () => {
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