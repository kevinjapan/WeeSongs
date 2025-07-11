<script setup>
import { useSongStore } from '@/stores/songStore'
import SongCtrlsTitle from './SongCtrlsTitle/SongCtrlsTitle.vue'
import SongCtrlsNav from './SongCtrlsNav/SongCtrlsNav.vue'
import SongOutline from './SongOutline/SongOutline.vue'


// SongCtrls

// Component Interface - props and emits
const props = defineProps({
   show_outline:Boolean,
   selected_section_daw:String
})
const emit = defineEmits([
   'apply-changes',
   'set-selected-section-daw'
])

const song_store = useSongStore()

const apply = () => {
   emit('apply-changes')
}
const set_selected_section_daw = (daw) => {
   emit('set-selected-section-daw',daw)
}

</script>

<template>
   <section v-if="song_store.song" class="song_ctrls">

      <SongCtrlsTitle 
         :title="song_store.song.title" 
         :slug="song_store.song.slug"
         :writers="song_store.song.writers"
      />


         <SongOutline 
            :song="song_store.song"
            :selected_section_daw="props.selected_section_daw"
            @set-selected-section-daw="set_selected_section_daw"
         />
         <!-- to do : rather than empty space - show outline but greyed out -->
         <!-- <div v-else id="no_outline_spacer"></div> -->

      <section class="flex  align_items_end" style="gap:1rem;">
         <SongCtrlsNav 
            :song="song_store.song" 
            @apply-changes="apply" 
         />

      </section>

   </section>
</template>

<style scoped>

section.song_ctrls {
   position:fixed;
   top:var(--app_nav_height);
   right:0px;
   z-index:var(--nav_layer);
   
   display:flex;
   justify-content:space-between;
   align-items:center;

   width:100%;
   height:140px;
   
   margin:0;
   padding:0;
   padding:0 2rem 0 0;

   background:var(--primary_color);
}

@media (min-width: 1110px) {
   .song_ctrls {
      display:grid;
      grid-template-columns: 1fr 1fr;
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
/* #no_outline_spacer {
   order:3;
}
@media (min-width: 1110px) {
   #no_outline_spacer {
      order:2;
   }
} */


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
