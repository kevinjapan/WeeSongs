<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { useAlbumStore } from '@/stores/albumStore'
import useData from '../utilities/useData/useData'
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
const page = ref(album_store.curr_albums_page)

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
   
   const query_params = {
      order_by:order_by.value,
      asc:asc.value,
      page:page.value
   }

   const { data, error } = await useData('albums_list',[],query_params)

   if(data) {
      albums_list.value = data
      last_page.value = data.albums_list.last_page
      loading.value = false         
      page_links.value = data.albums_list.links.filter((element, index,array) => { 
         return index !== 0 && index !== array.length - 1 // we remove server-provided 'prev' and 'next' (unpredictable)
      })
   }
   else {
      loading_error.is_error = true
   }
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
      window.scroll(0,0)
   }
}

const navigate_to_page = (selected_page) => {
   album_store.current_albums_page = selected_page
   page.value = parseInt(selected_page)
   get_list()
   window.scroll(0,0)
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
         There was a problem connecting to the server.
      </div>
      <div v-else>

         <div v-if="loading" class="loading"></div>

         <div v-else>
         
            <PaginationNav 
               title="PageNav for AlbumsList"
               :page=page
               :page_links="page_links" 
               @step-to-page="step_to_page" 
               @navigate-to-page="navigate_to_page"
               class="mt_3"
            />

            <ul class="albums_list">
               <li class="grid_list_row">
                  <div @click="order_albums_by('title')" class="cursor_pointer col_title">title</div>
                  <div @click="order_albums_by('created_at')" class="cursor_pointer col_title text_right">made</div>
                  <div @click="order_albums_by('updated_at')" class="cursor_pointer col_title text_right">updated</div>
               </li>
               <li  class="grid_list_row" v-for="album in albums_list.albums_list.data" :key="album.id">
                  <div class="cursor_pointer title" @click="clicked_title(album.slug)">{{ album.title }}</div> 
                  <div class="text_right">{{ get_ui_ready_date(album.created_at) }}</div>
                  <div class="text_right">{{ get_ui_ready_date(album.updated_at) }}</div>
               </li>
            </ul>

            <PaginationNav 
               title="PageNav for AlbumsList"
               :page=page
               :page_links="page_links" 
               @step-to-page="step_to_page" 
               @navigate-to-page="navigate_to_page"
               class="mt_3"
            />

         </div>

      </div>

   </section>

</template>

<style scoped>
.albums_list {
   max-width:100%;
   padding-right:2rem;
}
.col_title {
   color:hsl(0, 0%, 73%);
   font-style:italic;
}
</style>
