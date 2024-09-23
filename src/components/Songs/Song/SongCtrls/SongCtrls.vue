<script setup>
import { useSongStore } from '@/stores/songStore'
import SongCtrlsTitle from './SongCtrlsTitle/SongCtrlsTitle.vue'
import SongCtrlsNav from './SongCtrlsNav/SongCtrlsNav.vue'
import SongOutline from './SongOutline/SongOutline.vue'


// SongCtrls

const props = defineProps(
   ['apply_changes','selected_section_daw','show_outline']
)
const emit = defineEmits(
   ['set-selected-section-daw']
)

const song_store = useSongStore()

const set_selected_section_daw = (daw) => {
   emit('set-selected-section-daw',daw)
}

</script>

<template>
   <section v-if="song_store.song" class="song_ctrls">

      <SongCtrlsTitle 
         :title="song_store.song.title" 
         :writers="song_store.song.writers"
      />

      <SongOutline v-if="show_outline === true"
         :song="song_store.song"
         :selected_section_daw="props.selected_section_daw"
         @set-selected-section-daw="set_selected_section_daw"
      />
      <div v-else id="no_outline_spacer"></div>

      <SongCtrlsNav 
         :song="song_store.song" 
         :apply_changes="props.apply_changes" 
      />

   </section>
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

   background:hsl(0, 0%, 90%);
}

@media (min-width: 1110px) {
   .song_ctrls {
      display:grid;
      grid-template-columns: 2fr 1fr 1fr;
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

ul {
   margin:0;
   padding:0;
}
li {
   margin:0;
   padding:0;
}
#no_outline_spacer {
   order:3;
}
@media (min-width: 1110px) {
   #no_outline_spacer {
      order:2;
   }
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
