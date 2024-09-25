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
      <img class="song_teaser_img" :src="get_album_img"/>
      <div class="song_teaser_text flex flex_col align_items_start justify_center song_ctrls_title m_0">
         <h1 class="text_left">{{ props.title }}</h1>
         <!--h3>written by {{ props.writers }}</h3-->
      </div>
   </section>
</template>

<style scoped>
img {
   object-fit: cover;
   object-position:center left;
   top:0;
   width:100%;
   height:200px;
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
</style>