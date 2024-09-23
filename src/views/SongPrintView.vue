<script setup>
import { onMounted } from 'vue'
import { useSongStore } from '@/stores/songStore'
import SongCtrls from '../components/Songs/Song/SongCtrls/SongCtrls.vue'


// SongPrintView

const song_store = useSongStore()

onMounted(() => {
   window.scroll(0,0)
})

</script>

<template>
   <section class="print_wrapper">
      <SongCtrls :song=song_store.song />
   </section>
</template>

<style scoped>

section {
   width:100%;
}
</style>
