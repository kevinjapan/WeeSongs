<script setup>
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'

const app_store = useAppStore()
const song_store = useSongStore()

const props = defineProps(['apply_changes'])


</script>

<template>
   <ul class="ctrls_nav flex gap_1 align_items_center m_0 p_0 mr_5 border ">
      <li>
         <button v-if="app_store.bearer_token && !song_store.synched" @click="apply_changes">
            Apply Changes</button>
         <button v-else disabled>
            Apply Changes</button>
      </li>
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
</template>

<style scoped>
ul.ctrls_nav {
   margin:0;
   margin-right:3rem;
}
</style>