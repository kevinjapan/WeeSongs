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
            activeClass="selected_tab" exactActiveClass="selected_tab">edit</RouterLink>
      </li>
      <li>
         <RouterLink 
            :to="{ name: 'songmeta', params: { slug: song_store.song.slug }}"
            activeClass="selected_tab" exactActiveClass="selected_tab">meta</RouterLink>
      </li>
      <li>
         <RouterLink 
            :to="{ name: 'songlyrics', params: { slug: song_store.song.slug }}"
            activeClass="selected_tab" exactActiveClass="selected_tab">lyrics</RouterLink>
      </li>
      <!--li class="mr_1">
         <RouterLink 
            :to="{ name: 'songprint', params: { slug: song_store.song.slug }}"
            activeClass="selected_tab" exactActiveClass="selected_tab">print</RouterLink>
      </li-->
   </ul>
</template>

<style scoped>
ul.ctrls_nav {
   order:1;
   height:fit-content;
   margin-top:auto;
   margin-bottom:0;
   margin:auto;
   padding:0;
   font-size:1.1rem;
}
ul.ctrls_nav li {
   /* we use padding over gap for IOS */
   padding:0;
   padding-left:.75rem;
   padding-right:.75rem;
}

@media (min-width: 1110px) {
   ul.ctrls_nav {
      order:2;
      margin:unset;
   }
}
a {
   font-weight:400;
   color:hsl(240, 100%, 70%);
}
a:hover {
   color:hsl(240, 100%, 40%);
}
a.selected_tab {
   font-weight:700;
   color:black;
   cursor:unset;
}
a.selected_tab:hover {
   color:unset;
}
</style>