<script setup>
import SongSection from '../SongSection/SongSection.vue'

const props = defineProps(['song','update_song','del_section','clone_section','move_section','update_section','change_num_bars'])

const update_song = () => {
   props.update_song()
}
const del_section = (section_id) => {
   props.del_section(section_id)
}
const move = (section_id,direction) => {
   props.move_section(section_id,direction)
}
const change_num_bars = (num_bars) => {
   props.change_num_bars(num_bars)
}

const last = (index) => {
   return index === props.song.songsheet.aSections.length - 1
}

</script>

<template>
   <SongSection v-for="(section, index) in props.song.songsheet.aSections" 
      :key="section.id" :section="section" 
      :update_song="update_song" 
      :index="index" 
      :last="last(index)"
      :del_section="del_section"
      :clone_section="clone_section"
      :move_section="move_section"
      :update_section="props.update_section"
      :change_num_bars="change_num_bars"
   />
</template>

<style scoped>

</style>
