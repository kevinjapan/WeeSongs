<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAlbumStore } from '@/stores/albumStore'
import AlbumTracksList from '../../AlbumTracksList/AlbumTracksList.vue';


// Album

const album_store = useAlbumStore()
const props = defineProps(['album'])
const notify_msg = ref('')

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

onBeforeMount(async() => {

   // ensure album is loaded
   if(!album_store.album) {
      // there is an issue w/ server's handling of unknown slug - not clean, garbage returned (error reporting in php)
      // so, for now, we will simply report first line of error in AppStatus notification until fix on server-side
      const result = await album_store.load_album(route.params.slug)
      if(result && result.outcome === 'fail') notify_msg.value = result.message      
   }

   // hydrate local state
   id.value = album_store.album.id
   title.value = album_store.album.title
   slug.value = album_store.album.slug
   outline.value = album_store.album.outline
   created_at.value = album_store.album.created_at
   updated_at.value = album_store.album.updated_at
   deleted_at.value = album_store.album.deleted_at

   // failsafe
   if(!album_store) {
      router.push('/albums')
   }
})

const change_title = () => {
   slug.value = title.value.replaceAll(' ','-')
}


// apply local changes
const apply = async() => {

   const modified_album = JSON.parse(JSON.stringify(album_store.album))
   modified_album.title = title.value
   modified_album.slug = slug.value

   const result = await album_store.save_album(modified_album)
   if(result && result.message) notify_msg.value = result.message

   // reload w/ new slug in url
   if(result.outcome === 'success') router.push(`/albums/${slug.value}`)
}


</script>

<template>

   <section class="album_wrapper">

      <form class="grid form_grid flex_col border rounded m_1" @submit.prevent="apply">

         <label for="id">id</label>
         <input 
            :value="id"
            id="id"
            name="id"
            readonly
            class="readonly_input"
            @input="change_title"
         />

         <label for="title album_title">Title</label>
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
         <button type="submit">Apply</button>

         <div></div>
         <button type="button" @click="delete_song">Delete this Album</button>

      </form>

      <AlbumTracksList :album_id="id" :songs="album_store.album.songs"/>

      <AppStatus v-model="notify_msg" />

   </section>

</template>

<style scoped>
.album_wrapper {
   display:-ms-grid;
   display:grid;

   -ms-grid-columns: 1fr;
   grid-template-columns:1fr;

   max-width:100%;
   margin-top:5rem;
   margin-bottom:10rem;
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

</style>
