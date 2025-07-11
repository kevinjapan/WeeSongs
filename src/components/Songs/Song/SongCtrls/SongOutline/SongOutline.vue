<script setup>


// SongOutline

// Component Interface - props and emits
const props = defineProps({
   song:Object,
   selected_section_daw:String
})
const emit = defineEmits([
   'set-selected-section-daw'
])


const go_section = daw => {
   emit('set-selected-section-daw',daw)
   let target = document.getElementById(daw)
   if(target !== null) target.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
}
const is_section_type = (target_type,actual_type) => {
   return actual_type.toUpperCase().indexOf(target_type.toUpperCase()) >= 0 ? 'verse' : ''
}
const is_selected_section = (daw) => {
   return daw === props.selected_section_daw
}
</script>

<template>
   <div v-if="song" class="song_outline">
      <div class="outline_label">outline</div>
      <div v-for="section in song.songsheet.aSections" :key="section.id" :data-section-type="section.title"
         :class="{
            intro : is_section_type('intro',section.title),
            verse : is_section_type('verse',section.title),
            pre_chorous : is_section_type('pre',section.title),
            post_chorous : is_section_type('post',section.title),
            chorous : is_section_type('chorous',section.title),
            bridge : is_section_type('bridge',section.title),
            outro : is_section_type('outro',section.title),
            is_selected : is_selected_section(section.daw)
         }"
         class="outline_section border border_radius_.5 cursor_pointer" 
         @click="go_section(section.daw)"
      >
         {{ section.daw }}
      </div>
   </div>
</template>

<style scoped>
.song_outline {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   gap:0;
   margin:auto;
   width:fit-content;
   align-items:center;
   align-self:center;
   padding:0;
   /* order:2; */
}
.outline_label {
   padding-right:1rem;
}
@media (min-width: 1110px) {
   .song_outline {
      margin:unset;
      /* order:1; */
   }
}
.outline_section {
   padding-top:.5rem;
   padding-bottom:.5rem;
   padding-left:.52rem;
   padding-right:.52rem;
   max-height:2.5rem;
   background:white;
}
.outline_section:hover {
   background:hsl(0, 0%, 93%);
}
@media (hover: hover) {
   .outline_section:hover::before {
      position:absolute;
      content:attr(data-section-type);
      width:fit-content;
      height:fit-content;
      margin-top:1.5rem;
      margin-left:.5rem;
      padding:.15rem;
      background:white;
      border:solid 1px grey;
   }
}

/*
   Outline Song Sections - conventional
*/
.intro         {background:hsl(0, 0%, 95%);}
.verse         {background:hsl(0, 0%, 90%);}
.pre_chorous   {background:hsl(0, 0%, 85%);}
.post_chorous  {background:hsl(0, 0%, 85%);}
.chorous       {background:hsl(0, 0%, 80%);}
.bridge        {background:hsl(0, 0%, 97.5%);}
.break         {background:hsl(0, 0%, 98%);}
.outro         {background:hsl(0, 0%, 95%);}

.is_selected {border:solid 1px hsl(240, 100%, 70%);}
</style>
