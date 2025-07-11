<script setup>


// SongCtrlsTitle

const props = defineProps({
   title:String,
   slug:String,
   writers:String
})

const get_song_img = (slug) => {
   return `/data/imgs/songs/${slug.toLowerCase()}.jpg`
}

const set_default_img = (Event) => { 
   Event.target.src = '/data/imgs/songs/no-img.jpg'
}

</script>

<template>
   <section class="song_ctrls_title flex">
      <figure>
         <img 
            :id="props?.slug"
            class="song_teaser_img"
            :src="get_song_img(props.slug)"
            @error="set_default_img" 
         />
      </figure>
      <div class="flex flex_col align_items_start justify_center song_ctrls_title_texts m_0">
         <h1 class="text_left">{{ props.title }}</h1>
         <h3>written by {{ props.writers }}</h3>
      </div>
   </section>
</template>

<style scoped>
section.song_ctrls_title {
   margin:0;
   padding:0;
   /* to do : webkit : rollout */
   justify-content:flex-start;
   align-items:flex-start;
   gap:1rem;
   height:100%;
}
.song_ctrls_title_texts {
   height:100%;
}
h1 {
      font-size:1.75rem;
      font-weight:500;
}
h3 {
   font-size:1rem;
   font-weight:400;
   margin-left:.25rem;
}
h1.reduced_h1 {
   font-size:1.6rem;
}
@media (min-width: 768px) { 
   h1 {
      font-size:2.5rem;
      font-weight:500;
   }
   h3 {
      font-size:1.15rem;
      font-weight:400;
      margin-left:.25rem;
   }
}
/* .song_ctrls_title {
   order:1;
}
@media (min-width: 1110px) {
   .song_ctrls_title {
      order:1;
   }
} */
figure {
   margin:0;
   padding:0;
   height:100%;
   overflow:hidden;
}
img.song_teaser_img {
   height:100%;
   margin:0;
   padding:0;
   object-fit:cover;
   object-position:top center;
   border-radius:unset;
}
</style>