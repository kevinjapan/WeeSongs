<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { useAlbumStore } from '@/stores/albumStore'
import reqInit from '../utilities/requestInit/RequestInit'
import PaginationNav from '../components/PaginationNav/PaginationNav.vue'
import get_ui_ready_date from '../utilities/dates/dates'


// AlbumsView

const router = useRouter()

const app_store = useAppStore()
const album_store = useAlbumStore()

const albums_list = ref(null)

// custom suspense flag
const loading = ref(true)
const loading_error = reactive({is_error:false})
const has_error = computed(() => {
  return loading_error.is_error === true ? true : false
})

// pagination
const page = ref(app_store.current_songs_page)

// order
const order_by = ref(app_store.current_order_by)   // 'made')

// asc
const asc = ref(app_store.current_asc)

// last page
const last_page = ref(1)

// page links
const page_links = ref([])


onBeforeMount(() => {
   get_list()
})

watch(order_by, async (new_page, old_page) => {
   get_list()
})

watch(asc, async (new_page, old_page) => {
   get_list()
})

const get_list =async() => {
   
   await fetch(`${app_store.app_api}/albums?order_by=${order_by.value}&asc=${asc.value}&page=${page.value}`,reqInit())
      .then(response => response.json())
      .then(data => {
         albums_list.value = data
         last_page.value = data.albums_list.last_page
         loading.value = false         
         page_links.value = data.albums_list.links.filter((element, index,array) => { 
            return index !== 0 && index !== array.length - 1 // we remove server-provided 'prev' and 'next' (unpredictable)
         })
      })
      .catch((error) => {
         loading_error.is_error = true
      })
}

const get_new_page_num = (step) => {
   const new_page_num = parseInt(page.value) + step
   if(new_page_num < 1) return 1
   // if(new_page_num > total_pages) return total_pages // future : check we don't exceed
   return new_page_num
} 

const step_to_page = (step) => {   
   const new_page_num = get_new_page_num(step)
   if(new_page_num) {
      album_store.current_albums_page = new_page_num
      page.value = new_page_num
      get_list()
   }
}

const navigate_to_page = (selected_page) => {
   album_store.current_albums_page = selected_page
   page.value = parseInt(selected_page)
   get_list()
}

const order_albums_by = (col_title) => {

   // start @ page 1
   page.value = 1

   // set order_by col
   order_by.value = col_title
   album_store.current_order_by = col_title

   // toggle asc
   if(asc.value) {
      asc.value = false
      album_store.current_asc = false
   }
   else {
      asc.value = true
      album_store.current_asc = true
   }
}


const clicked_title = (album_slug) => {
   // Navigate to a different location
   router.push(`/albums/${album_slug}`)
}

</script>

<template>

   <section class="grid_list">

      <div v-if="has_error">
         There was a problem loading data from the server, please try again later.
      </div>
      <div v-else>

         <div v-if="loading" class="loading"></div>
         <div v-else class="relative m_0 p_0">
         
            <PaginationNav title="PageNav for SongsList" class="mt_3"
               :page=page 
               :step_to_page="step_to_page" 
               :navigate_to_page="navigate_to_page" 
               :page_links="page_links" 
               long-property-name="this is a long property name's value"
            />

            <ul class="albums_list">
               <li>
                  <div @click="order_albums_by('title')" class="cursor_pointer">title</div>
                  <div @click="order_albums_by('created_at')" class="cursor_pointer text_right">made</div>
                  <div @click="order_albums_by('updated_at')" class="cursor_pointer text_right">updated</div>
               </li>
               <li v-for="album in albums_list.albums_list.data" :key="album.id">
                  <div class="cursor_pointer" @click="clicked_title(album.slug)">{{ album.title }}</div> 
                  <div class="text_right">{{ get_ui_ready_date(album.created_at) }}</div>
                  <div class="text_right">{{ get_ui_ready_date(album.updated_at) }}</div>
               </li>
            </ul>

         </div>

      </div>

   </section>

</template>

<style scoped>
.grid_list {
   width:100%;
}
.grid_list li{

   display:-ms-grid;
   display:grid;

   -ms-grid-columns: 1fr 1fr 1fr;
   grid-template-columns: 1fr 1fr 1fr;

   gap:.7rem;
   
   text-align:left;
}
.songs_list {
   max-width:100%;
   padding-right:2rem;
}
.text_right {
   text-align:right;
}
</style>
