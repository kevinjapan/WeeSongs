<script setup>
import { ref, reactive, computed, watch, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSongStore } from '@/stores/songStore'
import useData from '../utilities/useData/useData'
import PaginationNav from '../components/PaginationNav/PaginationNav.vue'
import ResourceLinks from '../components/ResourceLinks/ResourceLinks.vue'
import get_ui_ready_date from '../utilities/dates/dates'



// SongsListView

// note : future :
// inconsistency btwn 'created_at' on titles and 'made' on row value
// we are using non-json 'created_at' col server-side to order results,
// while we are accessing json field inside Song in the row to display.

// to do : default no-image when img not found


const router = useRouter()
const song_store = useSongStore()

const songs_list = ref(null)

const loading_error = reactive({is_error:false})

const has_error = computed(() => {
  return loading_error.is_error === true ? true : false
})

// custom suspense flag
const loading = ref(true)

// pagination
const page = ref(song_store.current_songs_page)

// order
const order_by = ref(song_store.current_order_by)

// asc
const asc = ref(song_store.current_asc)

// last page
const last_page = ref(1)

// page links
const page_links = ref([])

onBeforeMount( () => {
   get_list()
})

onMounted(() => {
   window.scroll(0,0)
})

// watch works directly on a ref
watch(order_by, async (new_page, old_page) => {
   get_list()
})

watch(asc, async (new_page, old_page) => {
   get_list()
})

const get_list = async() => {

   const query_params = {
      order_by:order_by.value,
      asc:asc.value,
      page:page.value
   }
      
   const { data, error } = await useData('songs_list',[],query_params)
   if(data) {
      songs_list.value = data
      last_page.value = parseInt(data.songs_list.last_page)
      loading.value = false         
      page_links.value = data.songs_list.links.filter((element, index,array) => { 
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
      song_store.current_songs_page = parseInt(new_page_num)
      page.value = new_page_num
      get_list()
      window.scroll(0,0)
   }
}

const navigate_to_page = (selected_page) => {
   song_store.current_songs_page = parseInt(selected_page)
   page.value = parseInt(selected_page)
   get_list()
   window.scroll(0,0)
}

const clicked_title = (song_slug) => {
   // Navigate to a different location
   router.push(`/songs/${song_slug}`)
}

const order_songs_by = (col_title) => {

   // start @ page 1
   page.value = 1

   // set order_by col
   order_by.value = col_title
   song_store.current_order_by = col_title

   // toggle asc
   if(asc.value) {
      asc.value = false
      song_store.current_asc = false
   }
   else {
      asc.value = true
      song_store.current_asc = true
   }
}

// future : support other img types
const get_song_img = (slug) => {
   if(slug) return `/data/imgs/songs/${slug.toLowerCase()}.jpg`
}



</script>

<template>

   <section class="grid_list">

      <!-- The directive v-if is used to conditionally render a block.-->
      <div v-if="has_error" class="notify_error">
         There was a problem connecting to the server.
      </div>

      <!-- the v-else directive indicates an "else block" for v-if: -->
      <div v-else>
         
         <div v-if="loading" class="loading"></div>
      
         <div v-else>
         
            <PaginationNav 
               title="PageNav for SongsList" 
               :page=page 
               :page_links="page_links"
               @step-to-page="step_to_page" 
               @navigate-to-page="navigate_to_page" 
               class="mt_3"
            />
   
            <ul class="songs_list">           
               <li class="grid_list_row titles_row">
                  <div></div>
                  <div @click="order_songs_by('title')" class="cursor_pointer col col_title">title</div>
                  <div @click="order_songs_by('created_at')" class="cursor_pointer col col_title date_col">made</div>
                  <div @click="order_songs_by('updated_at')" class="cursor_pointer col col_title date_col">updated</div>
                  <div class=" date_col"></div>
               </li>
               <li v-for="song in songs_list.songs_list.data" :key="song.id"
                     class="grid_list_row cursor_pointer"  
                     @click="clicked_title(song.slug)">
                  <div class="col">
                     <img class="list_teaser_img" :src="get_song_img(song?.slug)" />
                     <!-- to do : handle if no img found (see AlubmsListView) <div v-else class="no_img"></div> -->
                  </div>
                  <div class="col cursor_pointer song_title" >{{ song.title }}</div> 
                  <div class="col date_col">{{ get_ui_ready_date(song.made) }}</div>
                  <div class="col date_col">{{ get_ui_ready_date(song.updated) }}</div>
                  <div class="col date_col">
                     <ResourceLinks :links="song.links" />
                  </div>
               </li>
            </ul>

            <PaginationNav 
               title="PageNav for SongsList" 
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
.songs_list {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   -webkit-box-orient:vertical;
   -webkit-box-direction:normal;
   -ms-flex-direction:column;
   flex-direction:column;
   gap:2rem;
   max-width:100%;
   padding-right:2rem;
}
.grid_list_row {
   padding-top:2rem;
}
.song_title {
   font-size:1.75rem;
}
li.titles_row {
   visibility:hidden;
}
.col_title {
   color:hsl(0, 0%, 73%);
   font-style:italic;
}
.col {
   text-align:center;
}
.date_col {
   text-align:center;
}
img.list_teaser_img {
   width:160px;
   margin-top:.25rem;
   height:100px;
   border-radius:1rem;
}
div.no_img {
   width:160px;
}
@media (min-width: 768px) {
   li.titles_row {
      /* toggling display will interfere w/ grid display */
      visibility:visible;
   }
   .songs_list {
      gap:1rem;
   }
   .song_title {
      font-size:1.05rem;
      font-weight:500;
   }
   .col {
      text-align:left;
   }
   .date_col {
      text-align:right;
   }
   img.list_teaser_img {
      width:80px;
      height:50px;
   }
   div.no_img {
      width:80px;
   }
}
</style>
