<script setup lang="ts">
import SortOrderSelect from '../SortOrderSelect/SortOrderSelect.vue'
import ViewToggle from './ViewToggle/ViewToggle.vue'

const props = defineProps<{
   list_view_type: ListViewType
}>()


const emit = defineEmits([
   'toggle-view',
   'sort-list-by'
])

const sort_list_by = (order_by: string) => {
   emit('sort-list-by',order_by)
}
</script>


<template>

   <section class="list_ctrls no_user_select">

      <!-- PaginationNav slot -->
      <slot></slot>

      <SortOrderSelect @sort-list-by="sort_list_by"/>

      <ViewToggle 
         :list_view_type="props.list_view_type"
         @toggle-view="$emit('toggle-view')" />

   </section>

</template>


<style scoped>
.list_ctrls {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   -webkit-box-pack:justify;
   -ms-flex-pack:justify;
   justify-content:space-between;
   -webkit-box-align:center;
   -ms-flex-align:center;
   align-items:center;
   margin:0;
   margin-top:1rem;
   margin-bottom:1rem;
   padding:0;
   background:white;
}
</style>

