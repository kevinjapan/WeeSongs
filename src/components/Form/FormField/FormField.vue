<script lang="ts">

</script>


<template>

      <section>

         <slot />

      </section>

</template>


<style scoped>

section {
   text-align:left;
   display:grid;
   grid-template-columns: 1fr 3fr;
   align-items:center;
}
label {
   color:hsl(0, 0%, 50%);
   margin-top:2rem;
   margin:0;
   padding:0;
}


</style>



