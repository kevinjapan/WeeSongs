<script setup>
import { useSongStore } from '@/stores/songStore'

const song_store = useSongStore()

// to do : flickers btwn 'edit' and 'meta' pages, since on ContainerView we don't have Song immediately -
//         solution options: 
//         - display disabled links and watch Song and hydrate/enable once it is populated
//         - load song into store in SongsListView (call load_song in store)
//           so that ContainerView has Song in store ready to use immediately

// to do : 'SongCtrls' -> 'SongLinks'

</script>

<template>
   <div v-if="song_store.song" class="flex justify_end gap_1">      
      <ul class="flex gap_1">
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
   </div>
</template>

<style scoped>
.selected_tab {
   background:hsl(0, 0%, 83%);
}
</style>
