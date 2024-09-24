<script setup>
import SongSection from '../SongSection/SongSection.vue'



// SongSections

// Component Interface - props and emits
const props = defineProps({
   song:Object
})
const emit = defineEmits([
   'update_song',
   'clone-section',
   'move-section',
   'update-section',
   'delete-section'
])


// Component methods
const last = (index) => {
   return index === props.song.songsheet.aSections.length - 1
}

const update_song = () => {
   emit('update-song')
}
const clone_section = (section_id) => {
   emit('clone-section',section_id)
}
const move_section = (section_id,direction) => {
   emit('move-section',section_id,direction)
}
const update_section = (section_id,modified_section) => {
   emit('update-section',section_id,modified_section)
}
const delete_section = (section_id) => {
   emit('delete-section',section_id)
}

</script>

<template>
   <section class="pt_1">
      <SongSection v-for="(section, index) in props.song.songsheet.aSections"
         :key="section.id"
         :section="section"
         :index="index"
         :last="last(index)"
         @update-song="update_song"
         @clone-section="clone_section"
         @move-section="move_section"
         @update-section="update_section"
         @delete-section="delete_section"
      />
   </section>
</template>

