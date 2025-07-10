<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'


// PaginationNav

const props = defineProps<{
   title: string,
   page: number,
   total_num_items: number,
   items_per_page: number
}>()

const emit = defineEmits([
   'step-to-page',
   'navigate-to-page'
])

const num_pages = ref<number>(0)

watchEffect(() => {
   num_pages.value = Math.ceil(props.total_num_items / props.items_per_page)
})


const step = (step: number) => {
   if(step > 0) {
      // to do : return something on next line
      if(props.page >= num_pages.value) return
   }
   else {
      // to do : return something on next line
      if(props.page - 1 <= 0) return
   }
   emit('step-to-page',step)
}

const on_first_page = computed(() => {
   return props.page === 1 || props.page === 0
})

const on_last_page = computed(() => {
   return props.page  >= num_pages.value
})

const items_of = computed(() => {
   if(props.page < 1) return 0
   let last_item_num = props.page * props.items_per_page
   if(last_item_num > props.total_num_items) last_item_num = props.total_num_items
   return (props.page * props.items_per_page) - (props.items_per_page - 1) + '-' + last_item_num
})

// to do : fix no. of albums in /albums list view pagination
</script>

<template>
   <section class="nav_bar no_user_select"> 
      <div>Page 
         <input :value="page" class="curr_page_input" :name="title"/></div>
         <div style="padding-left:.15rem;"> of {{ num_pages }}</div>
      <div><span class="items_of">{{ items_of }}</span> of {{ total_num_items }} Records</div>
      <div class="flex ml_2">
         <button v-on:click="step(-1)" class="page_nav_btn start_btn" :class="{greyed_out: on_first_page}"><</button>
         <button v-on:click="step(1)" class="page_nav_btn end_btn" :class="{greyed_out: on_last_page}">></button>
      </div>
   </section>
</template>


<style scoped>
section.nav_bar {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   justify-content:flex-end;
   -webkit-box-align:center;
   -ms-flex-align:center;
   align-items:center;
   -ms-flex-wrap:wrap;
   flex-wrap:wrap;
   gap:.15rem;
   width:100%;
   height:fit-content;
   margin:0;
   padding:0;
   padding:.35rem 1rem;
   list-style:none;
   background:white;
   border-radius:.15rem;
   font-size:.9rem;
   color:hsl(0, 0%, 30%);
}
.nav_bar li {
   width:fit-content;
   height:fit-content;
   margin:0;
   padding:.25rem;
   padding-top:.25rem;
   padding-bottom:.25rem;
   white-space:nowrap;
   cursor:pointer;
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
input.curr_page_input {
   width:3rem;
   text-align:center;
   padding:0;
   color:hsl(0, 0%, 40%);
   font-size:.8rem;
   font-weight:100;
   padding:.15rem;
   border-radius:0;
   border:solid 1px hsl(0, 0%, 60%);
}
.page_nav_btn {
   cursor:pointer;
   font-style:italic;
   border:solid 1px hsl(0, 0%, 90%);
   padding:.1rem;
   padding-top:.2rem;
   padding-left:.4rem;
   padding-right:.4rem;
}
.page_nav_btn.start_btn {
   border-radius:.15rem 0 0 .15rem;
}
.page_nav_btn.end_btn {
   border-radius:0 .15rem .15rem 0;
}
.page_nav_btn:hover {
   border:solid 1px hsl(0, 0%, 75%);
}
.items_of {
   display:inline-block;
   width:5rem;
   padding-left:.15rem;
   /*border:solid 1px hsl(0, 0%, 88%);*/
   text-align:right;
}
button {
   background:hsl(0, 0%, 95%);
   color:grey; 
}
button.greyed_out{
   color:hsl(0, 0%, 89%);
   cursor:none;
}
</style>
