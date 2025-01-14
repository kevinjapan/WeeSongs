<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'
import SongCtrls from '../components/Songs/Song/SongCtrls/SongCtrls.vue'


// SongMetaView

// pass route params as props
defineProps({
   slug: String
})

const router = useRouter()
const route = useRoute()
const app_store = useAppStore()
const songStore = useSongStore()


// local state - we don't want to mutate props child properties
// we also don't populate immediately, since eg on page refesh, we may not have store
// we will hydrate onBeforeMount, where, if necessary, we will load_song into store
const id = ref(null)
const title = ref('')
const slug = ref('')
const writers = ref('')
const album_id = ref('')
const created_at = ref('')
const updated_at = ref('')


onBeforeMount(async() => {

   // ensure song is loaded
   if(!songStore.song) {
      // there is an issue w/ server's handling of unknown slug - not clean, garbage returned (error reporting in php)
      // so, for now, we will simply report first line of error in AppNotifications notification until fix on server-side
      const result = await songStore.load_song(route.params.slug)
      if(result && result.outcome === 'fail') app_store.set_app_notifications(result.message)     
   }
   // hydrate local state
   title.value = songStore.song.title
   slug.value = songStore.song.slug
   writers.value = songStore.song.writers
   id.value = songStore.song.id
   album_id.value = songStore.song.album_id
   created_at.value = songStore.song.created_at
   updated_at.value = songStore.song.updated_at

   // failsafe
   if(!songStore) {
      router.push('/songs')
   }
})

onMounted(() => {
   window.scroll(0,0)
})

const change_title = () => {
   slug.value = title.value.replaceAll(' ','-').replaceAll("'",'')
}

// apply local changes
const apply = async() => {

   const modified_song = JSON.parse(JSON.stringify(songStore.song))
   modified_song.title = title.value
   modified_song.slug = slug.value
   modified_song.writers = writers.value
   
   const result = await songStore.save_song(modified_song)
   if(result && result.message) app_store.set_app_notifications(result.message)
   
   // reload w/ new slug in url
   if(result.outcome === 'success') router.push(`/songs/${slug.value}/meta`)
}


const delete_song = async() => {
   if (window.confirm("Do you really want to delete this song?")) {
      const result = await songStore.delete_song(songStore.song.id)
      if(result) {
         if(result.message) app_store.set_app_notifications(result.message)
         if(result.outcome === 'success') setTimeout(() => router.push('/songs'),3000)
      }
   }
}

const open_album = () => {
   router.push(`/albums/${songStore.song.album.slug}`)
}

</script>

<template>    
   <Transition>
      <section class="meta_wrapper">

         <SongCtrls />

         <form class="grid form_grid flex_col" @submit.prevent="apply">
            
            <label for="id">ID</label>
            <input 
               :value="id"
               id="id"
               name="id"
               readonly
               class="readonly_input"
            />

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

            <label for="writers">Writers</label>
            <input 
               v-model="writers"
               id="writers"
               name="writers"
            />

            <label for="album_id">Album</label>
            <div class="combo_field">
               <input 
                  v-model="album_id"
                  id="album_id"
                  name="album_id"
                  readonly
               />               
               <a 
                  id="album_id"
                  name="album_id"
                  @click="open_album">{{ songStore.song?.album?.title }}</a>
            </div>
            
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
            <button type="submit" v-if="app_store.is_logged_in()">Apply</button>
            <button type="button" v-else disabled>Apply</button>

         </form>

         <section class="mt_3 p_2 border">
            <button type="button" v-if="app_store.is_logged_in()" @click="delete_song">Delete this Song</button>
            <button type="button" v-else disabled>Delete this Song</button>
         </section>

      </section>
   </Transition>

</template>

<style scoped>
section {
   width:100%;
}
.meta_wrapper {
   margin-top:10rem;
   margin-bottom:10rem;
}

.combo_field {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   -webkit-box-align:center;
   -ms-flex-align:center;
   align-items:center;
}
.combo_field > * {
   max-width:fit-content;
}
.combo_field > input[readonly] {
   max-width:60px;
   min-width:60px;
}
.combo_field > a {
   padding-top:0;
   padding-bottom:.25rem;
}


/* configure Vue Transition component for app_nav slide-in*/
.v-enter-active,.v-leave-active {
   -webkit-transition: opacity .5s ease-in-out;  
   -o-transition: opacity .5s ease-in-out;
   transition: opacity .5s ease-in-out;
   
}
.v-enter-from,.v-leave-to {
   opacity: 0;
}
</style>
