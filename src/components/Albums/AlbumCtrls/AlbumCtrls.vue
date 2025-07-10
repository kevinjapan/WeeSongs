<script setup>
import { useAlbumStore } from '@/stores/albumStore'
import AlbumCtrlsTitle from './AlbumCtrlsTitle/AlbumCtrlsTitle.vue'
import AlbumCtrlsNav from './AlbumCtrlsNav/AlbumCtrlsNav.vue'

// AlbumCtrls

const album_store = useAlbumStore()


// to do : tidy UI
// to do : review naming of AlbumCtrls components

</script>


<template>

   <section>
      <AlbumCtrlsTitle :title="album_store.album.title" />

      <AlbumCtrlsNav />

   </section>

</template>


<style scoped>

</style>