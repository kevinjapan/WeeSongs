<script setup>

const props = defineProps(['song'])


const go_section = daw => {
   console.log('go_section',daw)
   let target = document.getElementById(daw)
   if(target !== null) target.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
}

</script>

<template>
   <div v-if="song" class="song_outline">
      <div v-for="section in song.songsheet.aSections" :key="section.id"
         class="outline_section border border_radius_.5 cursor_pointer px_1_" 
         @click="go_section(section.daw)" >
         {{ section.daw }} {{ section.title }}
      </div>
   </div>
</template>

<style scoped>
.song_outline {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   gap:.25rem;
   width:100%;
   margin:0;
   padding:.5rem;
   padding-left:2rem;
   padding-right:1rem;
   border-bottom:solid 1px lightgrey;
}
.outline_section {
   border-radius:.5rem;
}
.outline_section:hover {
   background:hsl(0, 0%, 93%);
}

.l_0 {left:0;}

.px_1_ {
   padding-left:.2rem;
   padding-right:.2rem;
}

</style>
