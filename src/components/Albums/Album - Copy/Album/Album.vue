<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { useAlbumStore } from '@/stores/albumStore'
import AlbumTracksList from '../../AlbumTracksList/AlbumTracksList.vue'
import get_ui_ready_date from '../../../../utilities/dates/dates'



// Album

// future : allow user to add img (we use slug to name .jpg file)

const route = useRoute()
const router = useRouter()
const app_store = useAppStore()
const album_store = useAlbumStore()
const props = defineProps(['album'])

// local state - we don't want to mutate props child properties
// we also don't populate immediately, since eg on page refesh, we may not have store
// we will hydrate onBeforeMount, where, if necessary, we will load_song into store
const id = ref(null)
const title = ref('')
const slug = ref('')
const outline = ref('')
const created_at = ref('')
const updated_at = ref('')
const deleted_at = ref('')
// future : try above as single ref object?

onBeforeMount(async() => {

   // ensure album is loaded
   if(!album_store.album) {
      // there is an issue w/ server's handling of unknown slug - not clean, garbage returned (error reporting in php)
      // so, for now, we will simply report first line of error in AppNotifications notification until fix on server-side
      const result = await album_store.load_album(route.params.slug)
      if(result && result.outcome === 'fail') app_store.set_app_notifications(result.message)    
   }

   // hydrate local state
   if(album_store.album) {
      id.value = album_store.album.id
      title.value = album_store.album.title
      slug.value = album_store.album.slug
      outline.value = album_store.album.outline
      created_at.value = get_ui_ready_date(album_store.album.created_at)
      updated_at.value = get_ui_ready_date(album_store.album.updated_at)
      deleted_at.value = get_ui_ready_date(album_store.album.deleted_at)
   }
   

   // failsafe
   if(!album_store) {
      router.push('/albums')
   }
})

// autogen slug from title
const change_title = () => {
   slug.value = title.value.replaceAll(' ','-').replaceAll('\'','')
}

// apply local changes
const apply = async() => {

   const modified_album = JSON.parse(JSON.stringify(album_store.album))
   modified_album.title = title.value
   modified_album.slug = slug.value

   const result = await album_store.save_album(modified_album)
   if(result && result.message) {
      app_store.set_app_notifications(result.message)
   }

   // reload w/ new slug in url
   if(result.outcome === 'success') router.push(`/albums/${slug.value}`)
}

const delete_album = async() => {
   if (window.confirm("Do you really want to delete this album?")) {
      const result = await album_store.delete_album(album_store.album.id)
      if(result) {
         if(result.message) app_store.set_app_notifications(result.message)
         if(result.outcome === 'success') setTimeout(() => router.push('/albums'),3000)
      }
   }
}

const get_album_img = computed(() => {
   return `/data/imgs/albums/${album_store.album.slug.toLowerCase()}.jpg`
})

</script>

<template>

   <section v-if="album_store.album" class="album_wrapper">


      <form class="grid form_grid flex_col border rounded m_1" @submit.prevent="apply">

         <!--section>
            <img :src="get_album_img" />
         </section-->

            <label for="title">Title</label>
            <input 
               v-model="title"
               id="title"
               name="title"
               class="album_title"
               @input="change_title"
            />

            <label for="slug">Slug</label>
            <input 
               v-model="slug"
               id="slug"
               name="slug"
               readonly
            />

            <label for="outline">Outline</label>
            <input 
               v-model="outline"
               id="outline"
               name="outline"
            />

            <label for="id">id</label>
            <input 
               :value="id"
               id="id"
               name="id"
               readonly
               class="readonly_input"
               @input="change_title"
            />
            
            <label for="created_at">Created At</label>
            <input 
               :value="created_at"
               id="created_at"
               name="created_at"
               readonly
               class="readonly_input"
            />

            <label for="updated_at">Updated At</label>
            <input 
               :value="updated_at"
               id="updated_at"
               name="updated_at"
               readonly
               class="readonly_input"
            />

            <label for="deleted_at">Deleted At</label>
            <input 
               :value="deleted_at"
               id="deleted_at"
               name="deleted_at"
               readonly
               class="readonly_input"
            />

            <div></div>
            <button type="submit" v-if="app_store.is_logged_in()">Apply</button>
            <button v-else disabled>Apply</button>
        

         <section class="mt_3 p_2 border">         
            <button type="button" v-if="app_store.is_logged_in()" @click="delete_album">Delete this Album</button>
            <button v-else disabled>Delete this Album</button>
         </section>

      </form>

      <AlbumTracksList 
         :album_id="id" 
         :songs="album_store.album.songs"
      />

   </section>

</template>

<style scoped>
.album_wrapper {
   display:-ms-grid;
   display:grid;

   -ms-grid-columns: 1fr;
   grid-template-columns:1fr;

   max-width:100%;
   margin-top:1rem;
   margin-bottom:10rem;
}
img {
   grid-column-start: 2;
   grid-column-end: 3;
   width:50%;
}
@media (min-width: 768px) {
   .album_wrapper {
      -ms-grid-columns: 1fr 1fr;
      grid-template-columns:1fr 1fr;
   }
}
.album_title {
   font-size:1.5rem;
}
label {
   font-style:italic;
   color:hsl(0, 0%, 60%);
   margin-top:.25rem;
}
</style>
