<script setup>
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useSongStore } from '@/stores/songStore'
import SongCtrls from '../components/Songs/Song/SongCtrls/SongCtrls.vue'


// SongMetaView
// to do : updating 'slug' needs redirect to new slug in url

// pass route params as props
defineProps({
   slug: String
})

const router = useRouter()
const songStore = useSongStore()
const song = songStore.song
const notify_msg = ref('')


// local state - we don't want to mutate props child properties
const title = ref(songStore.song.title)
const slug = ref(songStore.song.slug)


onBeforeMount(() => {
   // if user refreshes page, we lose current song, so return to songslist view
   if(!song) {
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
}
</script>

<template>
    
   <SongCtrls  />

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
         :value="songStore.song.id"
         id="id"
         name="id"
         readonly
         class="readonly_input"
      />
      
      <label for="created_at">Created At</label>
      <input 
         :value="songStore.song.created_at"
         id="created_at"
         name="created_at"
         readonly
         class="readonly_input"
      />
      
      <label for="updated_at">Updated At</label>
      <input 
         :value="songStore.song.updated_at"
         id="updated_at"
         name="updated_at"
         readonly
         class="readonly_input"
      />
      
      <div></div>
      <button type="submit">Apply</button>

   </form>

   <AppStatus v-model="notify_msg" />

</template>

<style scoped>
button {
   max-width:fit-content;
   border:solid 1px grey;
   padding:.5rem;
   margin-left:auto;
   margin-right:auto;
}
</style>
