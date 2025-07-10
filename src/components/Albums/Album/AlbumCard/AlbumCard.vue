<script setup>
import ResourceLinks from '../../../ResourceLinks/ResourceLinks.vue'
import get_ui_ready_date from '../../../../utilities/dates/dates'


// AlbumCard


const props = defineProps({
   title: String,
   slug:String,
   created_at: String,
   updated_at: String,
   links: Array
})

// future : support other img types
const get_album_img = (slug) => {
   if(slug) return `/data/imgs/albums/${slug.toLowerCase()}.jpg`
}
</script>


<template>

   <section class="album_card">

      <!-- Cover -->
      <figure class="album_cover_container">
         <img 
            :id="props?.slug" 
            class="album_cover" 
            :src="get_album_img(props?.slug)" 
            @error="set_default_img"
         />
      </figure>

      <!-- Title -->
      <section class="album_title">
         <h3 >{{ props.title }}</h3>
      </section>

      <!-- Texts -->
      <section class="album_texts">
         
         <p class="col date_col">released: {{ get_ui_ready_date(props.created_at) }}</p>
         <!-- <p class="col date_col">updated: {{ get_ui_ready_date(props.updated_at) }}</p> -->
         <p class="col date_col">
            <ResourceLinks :links="props.links" />
         </p>
      </section>

   </section>


</template>



<style scoped>

/* to do : make responsive */

section.album_card {
   position:relative;
   /* we keep padding to internal elements - in the event we might want image filling width */
   width:380px;
   border:solid 1px lightgrey;
   border-radius:.5rem;
   -webkit-box-shadow:5px 5px 10px rgba(0,0,0,.35);
   box-shadow:5px 5px 10px rgba(0,0,0,.35);
   cursor:pointer;
}
section.album_card:hover img.album_cover {
   transform:scale(1.15);
   -webkit-transition:-webkit-transform .65s ease-in-out;
   transition:-webkit-transform .65s ease-in-out;
   -o-transition:transform .65s ease-in-out;
   transition:transform .65s ease-in-out;
   transition:transform .65s ease-in-out,-webkit-transform .65s ease-in-out;
}
section.album_title {
   position:absolute;
   top:1rem;
   left:1rem;
   font-size:2.25rem;
   color:white;
   width:fit-content;
   height:fit-content;
   text-align:left;
   margin:0;
   padding:0;
}
section.album_title h3 {
   /* position:absolute; */
   position:absolute;
   top:0;
   left:0;
   z-index:3200;
   margin:0;
   padding:.25rem 1rem;
}
section.album_title h3::before {
   content:'';
   position:absolute;
   top:0;
   left:0;
   z-index:-510;
   width:100%;
   height:100%;
   background:black;
   opacity:.45;
}
figure.album_cover_container {
   width:100%;
   height:280px;
   overflow:hidden;
   margin:0;
   padding:0;
}
img.album_cover {
   width:100%;
   object-fit:cover;
   object-position:top right;
   height:120px;height:280px;
   border-radius:.5rem  .5rem 0 0 ;
   -webkit-transition:-webkit-transform .65s ease-in-out;
   transition:-webkit-transform .65s ease-in-out;
   -o-transition:transform .65s ease-in-out;
   transition:transform .65s ease-in-out;
   transition:transform .65s ease-in-out,-webkit-transform .65s ease-in-out;
}
section.album_texts {
   padding:.5rem;
   text-align:left;
}
p {
   margin:0;
   padding:0;
}
</style>
