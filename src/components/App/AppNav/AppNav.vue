<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'



// AppNav

const router = useRouter()
const app_store = useAppStore()

const display = ref(false)

// we use router.push() rather than:
// <RouterLink to="/" class="view_link" activeClass="sel_view" exactActiveClass="sel_view">Home</RouterLink>
// since we want to interject to close app_nav
const open_nav_link = route => {
   display.value = false
   app_store.curr_view_route = route
   router.push(route)
}

const clicked_bg = () => {
   display.value = false
}

const is_curr_view_route = (route) => {
   return route === app_store.curr_view_route
}
</script>


<template>

   <div class="app_nav_hamburger">
      <button @click="display = display === true ? false : true"  :class="{opened : display === true}">
         <img src="../../../assets/icons/list.svg" alt="open nav menu"/>
      </button>
   </div>


   <nav class="app_nav" :class="{opened : display === true}" @click="clicked_bg">

      <div class="app_nav_links">

         <a @click.stop="open_nav_link('/')" :class="{sel_view:is_curr_view_route('/')}">Home</a>

         <a @click.stop="open_nav_link('/songs')" :class="{sel_view:is_curr_view_route('/songs')}">Songs</a>

         <div v-if="app_store.app_api !== ''">
            <a @click.stop="open_nav_link('/songs/create')" :class="{sel_view:is_curr_view_route('/songs/create')}">Create</a>
         </div>

         <div v-else class="text_lightgrey">
            <a class="no_cursor_pointer">Create</a>
         </div>

         <a @click.stop="open_nav_link('/albums')" :class="{sel_view:is_curr_view_route('/albums')}">Albums</a>

         <div v-if="app_store.app_api !== ''">
            <a @click.stop="open_nav_link('/search')" :class="{sel_view:is_curr_view_route('/search')}">Search</a>
         </div>
         <div v-else class="text_lightgrey">
            <a class="no_cursor_pointer">Search</a>
         </div>

         <div v-if="app_store.app_api !== ''">
            <a v-if="!app_store.bearer_token" @click.stop="open_nav_link('/login')" :class="{sel_view:is_curr_view_route('/login')}">Login</a>
            <a v-else @click.stop="open_nav_link('/account')" :class="{sel_view:is_curr_view_route('/account')}">{{ app_store.username }}</a>
         </div>

      </div>
      <div class="app_nav_dimmer"></div>

   </nav>


</template>


<style scoped>

nav.app_nav {
   position:fixed;
   top:var(--app_nav_dropdown_top);
   right:0;
   z-index:var(--over_nav_layer);

   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   
   -webkit-box-orient:horizontal;
   -webkit-box-direction:normal;
   -ms-flex-direction:row;
   flex-direction:column;
   
   -webkit-box-pack:flex-start;
   -ms-flex-pack:flex-start;
   justify-content:flex-start;
   
   -webkit-box-align:flex-end;
   -ms-flex-align:flex-end;
   align-items:flex-end;

   gap:1rem;

   width:100%;
   height:100%;
   margin:0;
   overflow:hidden;

   font-size:1.1rem;

   /* 
   transitions
   we fade app_nav_dimmer first and delay transition on app_nav so background does not visibly slide w/ dropdown
   */
   -webkit-transform: translateY(-100%);
   -ms-transform: translateY(-100%);
   transform: translateY(-100%);
   opacity:0;
   -webkit-transition:opacity 2.35s ease-in-out .25s,-webkit-transform .5s ease-in-out .25s;
   transition:opacity 2.35s ease-in-out .25s,-webkit-transform .5s ease-in-out .25s;
   -o-transition:opacity 2.35s ease-in-out .25s,transform .5s ease-in-out .25s;
   transition:opacity 2.35s ease-in-out .25s,transform .5s ease-in-out .25s;
   transition:opacity 2.35s ease-in-out .25s,transform .5s ease-in-out,-webkit-transform .5s ease-in-out .25s;
}

nav.app_nav > div.app_nav_dimmer {
   content:'';

   position:absolute;
   top:0;
   left:0;
   z-index:-1;

   width:100%;
   height:100%;
   background:white;
   
   opacity:0;
   -webkit-transition:opacity .35s ease-in-out;
   transition:opacity .35s ease-in-out;
   -o-transition:opacity .35s ease-in-out;
   transition:opacity .35s ease-in-out;
   transition:opacity .35s ease-in-out;
}

nav.app_nav.opened {
   /* transitions */
   -webkit-transform: translateY(0);
   -ms-transform: translateY(0);
   transform: translateY(0);
   opacity:1;
   -webkit-transition:opacity .5s ease-in-out,-webkit-transform .5s ease-in-out;
   transition:opacity .5s ease-in-out,-webkit-transform .5s ease-in-out;
   -o-transition:opacity .5s ease-in-out,transform .5s ease-in-out;
   transition:opacity .5s ease-in-out,transform .5s ease-in-out;
   transition:opacity .5s ease-in-out,transform .5s ease-in-out,-webkit-transform .5s ease-in-out;
}
nav.app_nav.opened > div.app_nav_dimmer {
   opacity:.2;
   -webkit-transition:opacity 1s ease-in-out .35s;
   transition:opacity 1s ease-in-out .35s;
   -o-transition:opacity 1s ease-in-out .35s;
   transition:opacity 1s ease-in-out .35s;
   transition:opacity 1s ease-in-out .35s;
}

.app_nav_links {   
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;

   -webkit-box-orient:vertical;
   -webkit-box-direction:normal;
   -ms-flex-direction:column;
   flex-direction:column;

   -webkit-box-pack:flex-start;
   -ms-flex-pack:flex-start;
   justify-content:flex-start;

   -ms-flex-item-align:end;
   align-self:flex-end;

   width:fit-content;
   margin-right:.5rem;
   padding:1rem 2rem 1rem 2rem;
   background:white;
   border-radius:0 0 .5rem .5rem;
}
.app_nav_hamburger {

   position:fixed;
   top:0;
   right:0;
   z-index:var(--over_over_nav_layer);

   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;

   -webkit-box-pack:flex-end;
   -ms-flex-pack:flex-end;
   justify-content:flex-end;

   /* we use bar to cover scrolling content */
   width:100%;

   height:var(--app_nav_height);
   margin:0;
   padding:0;
   color:white;
   background:hsl(0, 0%, 86%);
}
.app_nav_hamburger button {
   background:hsl(0, 0%, 86%);
   border:none;
   outline:none;
   margin:0;
   padding:0;
}
/* grey-out opened dropdown ctrl */
.app_nav_hamburger button.opened {
   -webkit-filter: invert(15%) sepia(61%) saturate(5216%) hue-rotate(180deg) brightness(227%) contrast(105%);
   filter: invert(15%) sepia(61%) saturate(5216%) hue-rotate(180deg) brightness(227%) contrast(105%);
}
.app_nav_hamburger img {
   width:30px;
   height:30px;
   background:hsl(0, 0%, 86%);
}

@media (min-width: 768px) {   
   nav.app_nav {
      top:0;

      -webkit-box-orient:horizontal;
      -webkit-box-direction:normal;
      -ms-flex-direction:row;
      flex-direction:row;
      
      -webkit-box-pack:end;
      -ms-flex-pack:end;
      justify-content:flex-end;

      text-align:right;

      width:100%;
      height:var(--app_nav_height);
      margin:0;
      padding:0;
      font-size:1.2rem;
      font-weight:300;

      /* nullify transitions */
      -webkit-transform: unset;
      -ms-transform: unset;
      transform: unset;
      transition:unset;
      opacity:1;
  
      background:white;

   }
   nav.app_nav > div.app_nav_dimmer {
      display:none;
   }
   nav.app_nav.opened {
      /* nullify transitions */
      -webkit-transform: unset;
      -ms-transform: unset;
      transform: unset;
      opacity:1;
   }
   nav.app_nav.opened > div.app_nav_dimmer {
      display:none;
   }   
   .app_nav_links {
      -webkit-box-orient:horizontal;
      -webkit-box-direction:normal;
      -ms-flex-direction:row;
      flex-direction:row;

      -webkit-box-pack:flex-end;
      -ms-flex-pack:flex-end;
      justify-content:flex-end;

      gap:1rem;

      width:100%;
      padding:0 1rem 0 1rem;
   }
   .app_nav_hamburger {
      display:none;
   }
}

a {
   width:fit-content;
   margin:0;
   padding:0;
   color:inherit;
   font-weight:400;
   background:white;
}
a.sel_view {
   font-weight:700;
}

</style>