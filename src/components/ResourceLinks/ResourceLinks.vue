<script setup>


// ResourceLinks

const props = defineProps({
   links:Array
})

</script>

<template>
   <ul class="song_links">   
      <li v-for="link in links" :key="link.id">
         <a :href="link.url" target="_blank" onclick="event.stopPropagation()">{{ link.site }}</a>
      </li>
   </ul>
</template>

<style scope>
ul.song_links {
   margin:0;
   padding:0;
}
a {
   font-weight:400;
}
a:hover {
   font-weight:400;
}
</style>