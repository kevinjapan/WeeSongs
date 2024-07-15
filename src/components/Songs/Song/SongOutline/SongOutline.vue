<script setup>

const props = defineProps(['song'])

</script>

<template>
   <div v-if="song">
      <div class="flex gap-1 m_1">
         <div v-for="section in song.songsheet.aSections" :key="section.id" v-on:click="go_to_section(section.id)"
            class="bordered p_0.5 py_0.5">
            {{ section.daw }} {{ section.title }}
         </div>
      </div>
   </div>
</template>

<style scoped>

</style>
