<script setup>
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'

const app_store = useAppStore()
const song_store = useSongStore()

const props = defineProps(['apply_changes'])

// to do : flickers btwn 'edit' and 'meta' pages, since on ContainerView we don't have Song immediately -
//         solution options: 
//         - display disabled links and watch Song and hydrate/enable once it is populated
//         - load song into store in SongsListView (call load_song in store)
//           so that ContainerView has Song in store ready to use immediately
</script>

<template>
   <div v-if="song_store.song" class="flex space_between gap_1">

      <h3 class="m_1">{{  song_store.song.title }}</h3>

      <ul class="flex gap_1 align_items_center">
         <li>
            <RouterLink :to="{ name: 'songcontainer', params: { slug: song_store.song.slug }}"
               activeClass="selected_tab" exactActiveClass="selected_tab">edit</RouterLink>
         </li>
         <li>
            <RouterLink :to="{ name: 'songmeta', params: { slug: song_store.song.slug }}"
               activeClass="selected_tab" exactActiveClass="selected_tab">meta</RouterLink>
         </li>
         <li>
            <RouterLink :to="{ name: 'songlyrics', params: { slug: song_store.song.slug }}"
               activeClass="selected_tab" exactActiveClass="selected_tab">lyrics</RouterLink>
         </li>
         <li>
            <RouterLink :to="{ name: 'songprint', params: { slug: song_store.song.slug }}"
               activeClass="selected_tab" exactActiveClass="selected_tab">print</RouterLink>
         </li>
         <li>
            <button v-if="app_store.bearer_token && !song_store.synched" @click="apply_changes">
               <img src="../../../../assets/icons/cloud-upload.svg"/></button>
            <button v-else disabled>
               <img src="../../../../assets/icons/cloud-upload.svg"/></button>
         </li>
      </ul>
   </div>
</template>

<style scoped>
.selected_tab {
   background:hsl(0, 0%, 83%);
}

/* to do : duplicates code in SongSection */
button {
   background:white;
}
button:disabled {
   position:relative;
}
button:disabled:hover {
   border:solid 1px transparent;
   cursor:auto;
}
/* grey out disabled btn */
button:disabled::before {
   content:'';
   position:absolute;
   width:100%;
   height:100%;
   top:0;
   left:0;
   background:white;
   opacity:.7;
}


</style>
