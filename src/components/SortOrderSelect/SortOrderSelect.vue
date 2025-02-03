<script lang="ts" setup>
import { ref } from 'vue'


// SortOrderSelect

const emit = defineEmits([
   'sort-list-by'
])


// note : this is triggered on first click on the ctrl - so unneccesarily so - so don't act if 
const prev_order_by = ref<string>('')

const sort_list_by = () => {
   // to do : enable sort order..
   // to do : get string from select ctrl : currently hardcoded as 'title'
   const selected_order_by = 'title'

   // prevent initial click on ctrl triggering re-order
   // to do : return something on next line
   if(selected_order_by === prev_order_by.value) return

   emit('sort-list-by',selected_order_by)
}
</script>



<template>


   <select @click="sort_list_by">
      <option>title</option>
      <option>most recent</option>
      <option>oldest</option>
   </select>


</template>

