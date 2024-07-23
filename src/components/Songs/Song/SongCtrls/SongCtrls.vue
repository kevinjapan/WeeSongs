<script setup>
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'

const app_store = useAppStore()
const song_store = useSongStore()

const props = defineProps(['apply_changes'])
</script>

<template>
   <div v-if="song_store.song" class="song_ctrls flex space_between gap_1">

      <h3 class="m_1">{{  song_store.song.title }}</h3>

      <ul>
         <li>
            <button v-if="app_store.bearer_token && !song_store.synched" @click="apply_changes">
               Apply Changes</button>
            <button v-else disabled>
               Apply Changes</button>
         </li></ul>

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
      </ul>
   </div>
</template>

<style scoped>
.song_ctrls {
   position:fixed;
   top:30px;
   right:0px;
   width:100%;
   background:white;
   z-index:9999;
}
.selected_tab {
   background:hsl(0, 0%, 83%);
}

button {
   background:white;
   border:solid 1px hsl(0, 0%, 83%);
}
button:hover {
   background:hsl(0, 0%, 93%);
}
button:disabled {
   position:relative;
   border:solid 1px hsl(0, 0%, 93%);
}
button:disabled:hover {
   border:solid 1px transparent;
   cursor:auto;
   background:transparent;
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
