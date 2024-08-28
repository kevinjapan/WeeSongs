<script setup>
import { useSongStore } from '@/stores/songStore'
import SongCtrlsTitle from './SongCtrlsTitle/SongCtrlsTitle.vue'
import SongCtrlsNav from './SongCtrlsNav/SongCtrlsNav.vue'
import SongOutline from './SongOutline/SongOutline.vue'

const song_store = useSongStore()
const props = defineProps(['apply_changes'])

</script>

<template>
   <Transition>
      <section v-if="song_store.song" class="song_ctrls">


         <SongCtrlsTitle :title="song_store.song.title" />

         <SongOutline :song="song_store.song" />

         <SongCtrlsNav :song="song_store.song" :apply_changes="props.apply_changes" />
                    

      </section>
   </Transition>
</template>

<style scoped>

.song_ctrls {
   position:fixed;
   top:var(--app_nav_height);
   right:0px;
   z-index:var(--nav_layer);
   
   display:grid;
   grid-template-columns: 2fr 1fr;

   /*display:-webkit-box;
   display:-ms-flexbox;
   display:flex;

   -webkit-box-pack:justify;
   -ms-flex-pack:justify;
   justify-content:space-between;

   -webkit-box-align:center;
   -ms-flex-align:center;
   align-items:center;*/

   max-width:100%;
   padding-left:1rem;
   padding-right:1rem;

   background:white;
}

@media (min-width: 1110px) {
   .song_ctrls {
      display:grid;
      grid-template-columns: 1fr 1fr 1fr;
   }
}

h1 {
   font-size:2.5rem;
   font-weight:400;
   margin:0;
   padding-left:1rem;
   padding-bottom:.35rem;
   text-align:left;
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
   margin:0;
   border:solid 1px navy;
   padding:0;
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
