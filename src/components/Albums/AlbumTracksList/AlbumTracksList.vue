<script setup>


const props = defineProps(['songs'])

</script>

<template>

   <section>
      <h3>Tracks</h3>
      <ul>
         
         <li v-for="song in props.songs" :key="song.id">
            {{ song.title }}
         </li>

      </ul>
   </section>

</template>


<style scoped>
ul {
   text-align:left;
}
</style>


