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
   <section class="flex">
      <img 
         :id="props?.slug"
         class="song_teaser_img"
         :src="get_song_img(props.slug)"
         @error="set_default_img" 
      />
      <div class="flex flex_col align_items_start justify_center song_ctrls_title m_0">
         <h1 class="text_left">{{ props.title }}</h1>
         <h3>written by {{ props.writers }}</h3>
      </div>
   </section>
</template>

<style scoped>
h1 {
      font-size:1.75rem;
      font-weight:500;
}
h3 {
   font-size:1rem;
   font-weight:400;
   font-style:italic;
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
      font-style:italic;
      margin-left:.25rem;
   }
}
.song_ctrls_title {
   order:1;
}
@media (min-width: 1110px) {
   .song_ctrls_title {
      order:1;
   }
}

img.song_teaser_img {
   align-self:center;
   width:120px;
   height:70px;
   margin-right:.5rem;
}
</style>