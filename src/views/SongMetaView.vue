<script setup>
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useSongStore } from '@/stores/songStore'
import SongCtrls from '../components/Songs/Song/SongCtrls/SongCtrls.vue'


// SongMetaView

// to do : changing slug
// updating 'slug' needs redirect to new slug in url; note changing 'title' should auto-change 'slug'

// to do : review accessing song properties - are we relying on accessing 
//         children of 'props' incorrectly (analogous to props?)

// pass route params as props
defineProps({
   slug: String
})

const router = useRouter()
const songStore = useSongStore()
const song = songStore.song
const notify_msg = ref('')

onBeforeMount(() => {
   // if user refreshes page, we lose current song, so return to songslist view
   if(!song) {
      router.push('/songs')
   }
})

const apply = async() => {
   const result = await songStore.save()
   notify_msg.value = result.message
}

const patch_test = () => {
   songStore.$patch({
      // count: songStore.count + 1,
      // age: 20,
      my_object: {
         name:'my_object_name_2',
         code:'my_object_code_key_3'
      }
   })
}
</script>

<template>
    
   <SongCtrls  />

   <form class="grid form_grid flex_col" @submit.prevent="apply">

      <label for="title">Title</label>
      <input id="title" name="title" v-model="songStore.song.title" />
      
      <label for="slug">Slug</label>
      <input id="slug" name="slug" v-model="songStore.song.slug" />
      
      <label for="id">id</label>
      <input id="id" name="id" v-model="songStore.song.id" readonly 
         class="readonly_input"/>
      
      <label for="created_at">Created At</label>
      <input id="created_at" name="created_at" v-model="songStore.song.created_at" readonly 
         class="readonly_input"/>
      
      <label for="updated_at">Updated At</label>
      <input id="updated_at" name="updated_at" v-model="songStore.song.updated_at" readonly 
         class="readonly_input"/>
      
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
