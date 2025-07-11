<script setup>
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'


// SongCtrlsNav

const app_store = useAppStore()
const song_store = useSongStore()

const emit = defineEmits([
   'apply-changes'
])

const apply = () => {
   emit('apply-changes')
}

</script>

<template>
   <ul class="ctrls_nav flex">
      <li>
         <button v-if="app_store.bearer_token && !song_store.synched" @click="apply" class="wee_btn">Apply Changes</button>
         <!--button v-else disabled class="wee_btn">Apply Changes</button-->
      </li>
      <li>
         <RouterLink 
            :to="{ name: 'songcontainer', params: { slug: song_store.song.slug }}"
            activeClass="selected_tab" exactActiveClass="selected_tab">Edit Song</RouterLink>
      </li>
      <li>
         <RouterLink 
            :to="{ name: 'songlyrics', params: { slug: song_store.song.slug }}"
            activeClass="selected_tab" exactActiveClass="selected_tab">Lyrics</RouterLink>
      </li>
      <li>
         <RouterLink 
            :to="{ name: 'songmeta', params: { slug: song_store.song.slug }}"
            activeClass="selected_tab" exactActiveClass="selected_tab">Details</RouterLink>
      </li>
      <li class="mr_1">
         <RouterLink 
            :to="{ name: 'songprint', params: { slug: song_store.song.slug }}"
            activeClass="selected_tab" exactActiveClass="selected_tab">Print</RouterLink>
      </li>
   </ul>
</template>

<style scoped>
ul.ctrls_nav {
   /* order:1; */
   height:fit-content;
   margin-top:auto;
   margin-bottom:0;
   margin:auto;
   padding:0;
   padding-bottom:.5rem;
   font-size:1.1rem;
   /* to do : webkit : rollout */
   align-items:center;
   justify-content:center;
   align-self:center;
}
ul.ctrls_nav li {
   /* we use padding over gap for IOS */
   padding:0;
   padding-left:.75rem;
   padding-right:.75rem;
}

@media (min-width: 1110px) {
   ul.ctrls_nav {
      /* order:2; */
      margin:unset;
   }
}
a {
   /* font-weight:400; */
   color:hsl(240, 100%, 70%);
   border:solid 1px white;
   margin-bottom:1rem;
   padding:1rem;
   border-radius:.5rem;
}
a:hover {
   color:hsl(240, 100%, 40%);
   background:lightgrey;
}
a.selected_tab {
   /* font-weight:700; */
   color:black;
   background:white;
   cursor:unset;
}
a.selected_tab:hover {
   color:unset;
}
</style>