<script setup>
import { ref } from 'vue'
import Bar from '../Bar/Bar.vue'
import SongSectionTitles from './SongSectionTitles/SongSectionTitles.vue'

//
// SongSection
// single SongSection component within Song.aSections
//

const props = defineProps(['section','index','update','del_section','clone_section','move_section','last'])
const requires_update = ref(false)

// child Bar handlers
const notify_updated_bar = () => {
   // we simply enable access on update btn - user can apply thereafter at any time
   requires_update.value = true
}
const notify_updated_titles = () => {
   requires_update.value = true
}

// Section handlers
const update = () => {
   props.update()
   requires_update.value = false
}
const del = () => {
   props.del_section(props.section.id)
}
const clone = () => {
   props.clone_section(props.section.id)
}
const move = (direction) => {
   props.move_section(props.section.id,direction)
}


      // <!-- to do : capture in my docs
      //    c.f.    id="props.section.daw"   with    :id="props.section.daw"

      //    the bind declaration (colon) instructs vue to interpret the string as a script variable...
      // -->
</script>


<template>
   <div 
      :id="props.section.daw"
      style="display:flex;justify-content:flex-start;flex-direction:column;border:solid 1px grey;margin:1rem;margin-top:2rem;">

      <SongSectionTitles 
         :section="section"
         :notify_updated_titles="notify_updated_titles"
         />

      <div class="grid section_grid w-full border-t border-l border-slate-400 text-slate-700">
         <Bar 
            v-for="bar in props.section.aBars" 
            :key="bar.id" 
            :bar="bar"
            :notify_updated_bar="notify_updated_bar"
         />
      </div>

      <div className="flex justify-end gap-3">

         <button v-if="props.last" disabled>
            <img src="../../../../assets/icons/arrow-down-circle.svg" />
         </button>
         <button v-else @click="move('down')">
            <img src="../../../../assets/icons/arrow-down-circle.svg" />
         </button>

         <button v-if="props.index > 0" @click="move('up')">
            <img src="../../../../assets/icons/arrow-up-circle.svg" />
         </button>
         <button v-else disabled>
            <img src="../../../../assets/icons/arrow-up-circle.svg" />
         </button>

         <button @click="del">
            <img src="../../../../assets/icons/trash.svg" alt="delete section"/>
         </button>

         <button @click="clone">
            <img src="../../../../assets/icons/copy.svg" />
         </button>

         <button v-if="requires_update === true" @click="update">Apply</button>         
         <button v-else disabled>Apply</button>

      </div>

   </div>
</template>


<style scoped>
button {
   background:white;
}
button:disabled {
   position:relative;
}
button:disabled:hover {
   border:solid 1px transparent;
   cursor:auto;
}
/* grey out disabled btn */
button:disabled::before {
   content:'';
   position:absolute;
   width:100%;
   height:100%;
   top:0;
   left:0;
   background:white;
   opacity:.7;
}

/*  
   change color on svgs 
*/
/* #history_component {
   fill:white;
}
button:disabled {
   filter: invert(5%) sepia(61%) saturate(5216%) hue-rotate(180deg) brightness(227%) contrast(105%);
} */

</style>
