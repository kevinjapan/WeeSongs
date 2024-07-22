<script setup>
import SongSection from '../SongSection/SongSection.vue'

const props = defineProps(['song','update_song','del_section','clone_section','move_section','update_section','change_num_bars'])


const last = (index) => {
   return index === props.song.songsheet.aSections.length - 1
}

</script>

<template>
   <SongSection v-for="(section, index) in props.song.songsheet.aSections" 
      :key="section.id" :section="section" 
      :update_song="props.update_song" 
      :index="index" 
      :last="last(index)"
      :del_section="props.del_section"
      :clone_section="props.clone_section"
      :move_section="props.move_section"
      :update_section="props.update_section"
   />
</template>

<style scoped>

</style>
