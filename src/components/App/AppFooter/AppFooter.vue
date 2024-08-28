<script setup lang="ts">
import { ref } from 'vue'

const today = new Date()
const copyright_date = ref(today.getFullYear())

</script>


<template>

   <section>
      copyright &copy; kev hastie 2021 - {{ copyright_date }}
   </section>

</template>

<style scoped>

section {
   padding:2rem;
   padding-top:4rem;
   background:var(--bg_dark);
   color:hsl(0, 0%, 70%);
   font-size:.95rem;
}

</style>