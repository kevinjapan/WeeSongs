<script setup>
import { computed } from 'vue'
import { useAlbumStore } from '@/stores/albumStore'

// AlbumCtrsTitle


const props = defineProps({
   title:String
})

const album_store = useAlbumStore()

const get_album_img = computed(() => {
   return `/data/imgs/albums/${album_store.album.slug.toLowerCase()}.jpg`
})

</script>

<template>
   <section class="flex relative">
      
      
      <img class="album_cover" :src="get_album_img"/>
     

      
      <section class="album_title">
         <h3 >{{ props.title }}</h3>
      </section>

   </section>
</template>

<style scoped>
h1 {
   font-weight:700;
}
img.album_cover {
   position:absolute;
   top:0;
   left:0;
   z-index:100;
   object-fit: cover;
   object-position:center right;
   top:0;
   width:100%;
   height:560px;
   overflow-y:hidden;
   border-radius:unset;
}
.song_teaser_text {
   position:absolute;
   top:25%;
   left:2%;
   z-index:100;
   color:white;
}
section.album_title {
   position:absolute;
   top:1rem;
   left:1rem;
   font-size:2.25rem;
   color:white;
   width:fit-content;
   height:fit-content;
   text-align:left;
   margin:0;
   padding:0;
}
section.album_title h3 {
   /* position:absolute; */
   position:absolute;
   top:0;
   left:0;
   z-index:3200;
   margin:0;
   padding:.25rem 1rem;
}
section.album_title h3::before {
   content:'';
   position:absolute;
   top:0;
   left:0;
   z-index:-510;
   width:100%;
   height:100%;
   background:black;
   opacity:.45;
}
</style>