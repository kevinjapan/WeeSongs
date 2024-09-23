<script setup>
import { ref, onMounted } from 'vue'


// NotFoundView

const show = ref(false)

onMounted(() => {
   setTimeout(() => show.value = true,500)
   window.scroll(0,0)
})

</script>

<template>

   <section class="mt_5">
      <Transition>
            <h3 v-if="show" class="mt_5 p_3">Page Not Found</h3>
      </Transition>  
   </section>

</template>


<style scoped>
.v-enter-active,.v-leave-active {
   -webkit-transition: opacity .5s ease-in-out;  
   -o-transition: opacity .5s ease-in-out;
   transition: opacity .5s ease-in-out;
}
.v-enter-from,.v-leave-to {
   opacity: 0;
}
</style>

