<script setup>

const props = defineProps(['song'])


const go_section = daw => {
   console.log('go_section',daw)
   let target = document.getElementById(daw)
   if(target !== null) target.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
}

</script>

<template>
   <div v-if="song">
      <div class="flex gap-1 m_1">
         <div v-for="section in song.songsheet.aSections" :key="section.id"
            class="bordered p_0.5 py_0.5 cursor_pointer" 
            @click="go_section(section.daw)" >
            {{ section.daw }} {{ section.title }}
         </div>
      </div>
   </div>
</template>

<style scoped>

</style>
