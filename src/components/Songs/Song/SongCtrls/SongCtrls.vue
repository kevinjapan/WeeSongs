<script setup>
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'
import SongOutline from './SongOutline/SongOutline.vue'

const app_store = useAppStore()
const song_store = useSongStore()

const props = defineProps(['apply_changes'])
</script>

<template>
   <section v-if="song_store.song" class="song_ctrls flex space_between ">

      <div class="song_ctrls_bar">

         <h1 class="m_1">{{ song_store.song.title }}</h1>

         <ul class="flex gap_1 align_items_center m_0 p_0 mr_2 border ">
            <li>
               <button v-if="app_store.bearer_token && !song_store.synched" @click="apply_changes">
                  Apply Changes</button>
               <button v-else disabled>
                  Apply Changes</button>
            </li>
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

         <div>
            menu
         </div>
      </div>
         
      <SongOutline :song="song_store.song" />

   </section>
</template>

<style scoped>
.song_ctrls {
   position:fixed;
   top:25px;
   right:0px;
   max-width:100%;
   display:flex;
   flex-direction:column;
   justify-content:space-around;
   padding:0;
   padding-bottom:0.5rem;
   z-index:9999;
   background:white;
}
.song_ctrls_bar {
   display:flex;
   justify-content:space-between;
   align-items:center;
   margin-right:5rem;
   max-width:100%;
}
h1 {
   font-size:3rem;
   font-weight:400;
   /*color:lightgrey;*/
   margin:0;
   padding-left:1rem;
   padding-bottom:.35rem;
}
.selected_tab {
   background:hsl(0, 0%, 83%);
}

button {
   background:white;
   border:solid 1px hsl(0, 0%, 83%);
   margin:0;
   padding:0;
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
ul {
   margin:0;
   padding:0;
}
li {
   margin:0;border:solid 1px navy;
   padding:0;
}


</style>
