<script setup>
import { useSongStore } from '@/stores/songStore'
import SongCtrls from '../components/Songs/Song/SongCtrls/SongCtrls.vue'

//
// SongPrintView
//

const song_store = useSongStore()



</script>

<template>
   
   <SongCtrls :song=song_store.song />

  
</template>

<style scoped>

</style>
