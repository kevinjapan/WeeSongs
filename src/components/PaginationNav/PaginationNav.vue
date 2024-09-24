<script setup>
import { computed } from 'vue'


// PaginationNav

// Component Interface - props and emits
const props = defineProps({
   title: String,
   page: Number,
   page_links: Array
})
const emit = defineEmits([
   'step-to-page',
   'navigate-to-page'
])

// Component methods
const computed_last_page = computed(() => {
   return parseInt(props.page_links[props.page_links.length - 1].label)
})
const step = (step) => {
   const last_page = computed_last_page
   if(!isNaN(last_page)) {
      if( parseInt(props.page) + step > last_page || parseInt(props.page) + step < 1 ) return
   }
   emit('step-to-page',step)
}
const go_to_page = (selected_page) => {
   emit('navigate-to-page',selected_page)
}
const is_selected_link = (link_label => {
   return parseInt(link_label) === parseInt(props.page)
})

const on_first_page = computed(() => {
   return props.page === 1
})
const on_last_page = computed(() => {
   return props.page === computed_last_page.value}
)
</script>


<template>
   <ul class="nav_bar justify_between">
      <li v-on:click="step(-1)" class="cursor_pointer italic" :class="{greyed_out: on_first_page}">< prev</li>
      <li v-for="link in page_links" :key="link.label" v-on:click="go_to_page(link.label)" 
         class="page_link cursor_pointer" :class="{selected_link: is_selected_link(link.label)}">
         {{ link.label }}
      </li>
      <li v-on:click="step(1)" class="cursor_pointer italic" :class="{greyed_out: on_last_page}">next ></li>
   </ul>
</template>


<style scoped>
.nav_bar {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   width:fit-content;
   margin-left:auto;
   margin-right:auto;
}
.nav_bar li {
   width:fit-content;
   margin:0;
   padding:1rem;
   padding-top:.25rem;
   padding-bottom:.25rem;
   white-space:nowrap;
}
.nav_bar li:hover {
   background:hsl(0, 0%, 96%);
}
.nav_bar li:not(.page_link):hover {
   background:none;
}
.selected_link {
   font-weight:700;
   background:hsl(0, 0%, 96%);
   border-radius:.25rem;
}
</style>
