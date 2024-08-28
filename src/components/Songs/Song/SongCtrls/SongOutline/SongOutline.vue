<script setup>

const props = defineProps(['song'])


const go_section = daw => {
   console.log('go_section',daw)
   let target = document.getElementById(daw)
   if(target !== null) target.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
}

const is_section_type = (target_type,actual_type) => {
   return actual_type.toUpperCase().indexOf(target_type.toUpperCase()) >= 0 ? 'verse' : ''
}

</script>

<template>
   <div v-if="song" class="song_outline">
      <div v-for="section in song.songsheet.aSections" :key="section.id" :data-section-type="section.title"
         :class="{
            intro : is_section_type('intro',section.title),
            verse : is_section_type('verse',section.title),
            pre_chorous : is_section_type('pre',section.title),
            post_chorous : is_section_type('post',section.title),
            chorous : is_section_type('chorous',section.title),
            bridge : is_section_type('bridge',section.title),
            outro : is_section_type('outro',section.title)
         }"
         class="outline_section border border_radius_.5 cursor_pointer px_2_" 
         @click="go_section(section.daw)" >
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
   width:fit-content;
   margin:0;
   padding:.5rem;
   order:3;
}
@media (min-width: 1110px) {
   .song_outline {
      order:2;
   }
}

.outline_section {
   padding-top:.5rem;
   padding-bottom:.5rem;
   max-height:2.5rem;
   background:white;
}
.outline_section:hover {
   background:hsl(0, 0%, 93%);
}
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

.l_0 {left:0;}

.px_2_ {
   padding-left:.52rem;
   padding-right:.52rem;
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

</style>
