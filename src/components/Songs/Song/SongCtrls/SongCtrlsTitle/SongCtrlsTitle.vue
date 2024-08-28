<script setup>

const props = defineProps(['title'])

</script>

<template>
   <h1 class="song_ctrls_title m_1">{{ props.title }}</h1>
</template>

<style scoped>

.song_ctrls_title {
   order:1;
}
@media (min-width: 1110px) {
.song_ctrls_title {
   order:1;
}
}
</style>