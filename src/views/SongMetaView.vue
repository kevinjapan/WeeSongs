<script setup>
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSongStore } from '@/stores/songStore'
import SongCtrls from '../components/Songs/Song/SongCtrls/SongCtrls.vue'


// SongMetaView

// pass route params as props
defineProps({
   slug: String
})

const router = useRouter()
const route = useRoute()
const songStore = useSongStore()
const notify_msg = ref('')


// local state - we don't want to mutate props child properties
// we also don't populate immediately, since eg on page refesh, we may not have store
// we will hydrate onBeforeMount, where, if necessary, we will load_song into store
const title = ref('')
const slug = ref('')
const id = ref(null)
const created_at = ref('')
const updated_at = ref('')


onBeforeMount(async() => {

   // ensure song is loaded
   if(!songStore.song) {
      // there is an issue w/ server's handling of unknown slug - not clean, garbage returned (error reporting in php)
      // so, for now, we will simply report first line of error in AppStatus notification until fix on server-side
      const result = await songStore.load_song(route.params.slug)
      if(result && result.outcome === 'fail') notify_msg.value = result.message      
   }
   // hydrate local state
   title.value = songStore.song.title
   slug.value = songStore.song.slug
   id.value = songStore.song.id
   created_at.value = songStore.song.created_at
   updated_at.value = songStore.song.updated_at

   // failsafe
   if(!songStore) {
      router.push('/songs')
   }
})



const change_title = () => {
   slug.value = title.value.replaceAll(' ','-')
}

const apply = async() => {

   // apply local changes
   const modified_song = JSON.parse(JSON.stringify(songStore.song))
   modified_song.title = title.value
   modified_song.slug = slug.value
   
   const result = await songStore.save_song(modified_song)
   if(result && result.message) notify_msg.value = result.message
   
   // reload w/ new slug in url
   if(result.outcome === 'success') router.push(`/songs/${slug.value}/meta`)
}


// delete current songStore.song
//
const delete_song = async() => {
   
   if (window.confirm("Do you really want to delete this song?")) {
      const result = await songStore.delete_song(songStore.song.id)
      if(result) {
         if(result.message) notify_msg.value = result.message
         if(result.outcome === 'success') setTimeout(() => router.push('/songs'),3000)
      }
   }
}
</script>

<template>
    
   <section class="meta_wrapper">
   <SongCtrls />

   <form class="grid form_grid flex_col" @submit.prevent="apply">

      <label for="title">Title</label>
      <input 
         v-model="title"
         id="title"
         name="title"
         @input="change_title"
      />

      <label for="slug">Slug</label>
      <input 
         v-model="slug"
         id="slug"
         name="slug"
         readonly
      />
      
      <label for="id">id</label>
      <input 
         :value="id"
         id="id"
         name="id"
         readonly
         class="readonly_input"
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
      
      <div></div>
      <button type="submit">Apply</button>

      <div></div>
      <button type="button" @click="delete_song">Delete this Song</button>

   </form>

   </section>
   

   <AppStatus v-model="notify_msg" />

</template>

<style scoped>
section {
   width:100%;
}
.meta_wrapper {
   margin-top:10rem;
   margin-bottom:10rem;
}
button {
   max-width:fit-content;
   border:solid 1px grey;
   padding:.5rem;
   margin-left:auto;
   margin-right:auto;
}
</style>
