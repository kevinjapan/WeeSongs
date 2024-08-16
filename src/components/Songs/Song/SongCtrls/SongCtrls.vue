<script setup>
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'
import SongCtrlsTitle from './SongCtrlsTitle/SongCtrlsTitle.vue'
import SongCtrlsNav from './SongCtrlsNav/SongCtrlsNav.vue'
import SongOutline from './SongOutline/SongOutline.vue'

const app_store = useAppStore()
const song_store = useSongStore()
const props = defineProps(['apply_changes'])



</script>

<template>
   <Transition>
   <section v-if="song_store.song" class="song_ctrls flex space_between ">

      <div class="song_ctrls_bar">

         <SongCtrlsTitle :title="song_store.song.title" />

         <SongCtrlsNav :song="song_store.song" :apply_changes="props.apply_changes" />

         
      </div>
         
      <SongOutline :song="song_store.song" />

   </section>
</Transition>
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

/* configure Vue Transition component for app_nav slide-in*/
.v-enter-active,.v-leave-active {
   transition: opacity .5s ease-in-out;
   
}
.v-enter-from,.v-leave-to {
   opacity: 0;
}
</style>
