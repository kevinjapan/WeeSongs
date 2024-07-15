<script setup>
import { ref } from 'vue'
import SongSection from '../SongSection/SongSection.vue'

const props = defineProps(['song','update','del_section','clone_section','move_section'])

const update = () => {
   props.update()
}
const del_section = (section_id) => {
   props.del_section(section_id)
}
const move = (section_id,direction) => {
   props.move_section(section_id,direction)
}
</script>

<template>
   <SongSection v-for="section in props.song.songsheet.aSections" 
      :key="section.id" :section="section" :update="update" 
      :del_section="del_section"
      :clone_section="clone_section"
      :move_section="move_section"
   />
</template>

<style scoped>

</style>
