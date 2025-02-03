<script setup lang="ts">
import { ref } from 'vue'


const props = defineProps<{
   list_view_type: ListViewType
}>()

const emit = defineEmits([
   'toggle-view'
])

const list_view_type = ref<ListViewType>(props.list_view_type)

const toggle = () => {
    emit('toggle-view',list_view_type.value)
}

</script>

<template>
    <section class="m_.5">
        <button @click="toggle">
            <img v-if="props.list_view_type === 'card'"
                src="../../../assets/icons/grid.svg" />
            <img v-if="props.list_view_type === 'teaser_card'"
                src="../../../assets/icons/grid-sm.svg" />
            <img v-if="props.list_view_type === 'list'"
                src="../../../assets/icons/list-columns-reverse.svg" />
        </button>
    </section>
</template>

<style scoped>
section {
    padding:0;
}
button {
    display:flex;
    align-items:center;
    outline:none;
    border:none;
    background:none;
}
img {
    cursor:pointer;
}
</style>