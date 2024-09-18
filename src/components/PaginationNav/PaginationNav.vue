<script setup>

// PaginationNav


// Component Interface - props and emits
const props = defineProps({
   title: String,
   page: Number,
   page_links: Object
})
const emit = defineEmits(
   ['step-to-page','navigate-to-page']
)

// Component methods
const step = (step) => {
   emit('step-to-page',step)
}
const go_to_page = (selected_page) => {
   emit('navigate-to-page',selected_page)
}
const is_selected_link = (link_label => {
   return parseInt(link_label) === parseInt(props.page)
})
</script>


<template>
   <ul class="nav_bar justify_between">
      <li v-on:click="step(-1)" class="cursor_pointer italic">< prev</li>
      <li v-for="link in page_links" :key="link.label" v-on:click="go_to_page(link.label)" 
         class="cursor_pointer" :class="{ selected_link: is_selected_link(link.label) }"
         >{{ link.label }}</li>
      <li v-on:click="step(1)" class="cursor_pointer italic">next ></li>
   </ul>
</template>


<style scoped>
.nav_bar {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   max-width:600px;
   margin-left:auto;
   margin-right:auto;
}
.nav_bar li {
   padding:.5rem;
   padding-top:.25rem;
   padding-bottom:.25rem;
}
.selected_link {
   font-weight:700;
   background:hsl(0, 0%, 96%);
   border-radius:.25rem;
}
</style>
