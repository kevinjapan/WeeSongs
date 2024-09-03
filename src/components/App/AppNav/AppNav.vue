<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const router = useRouter()
const app_store = useAppStore()

const display = ref(false)

// we use router.push() rather than:
// <RouterLink to="/" class="view_link" activeClass="selected_view" exactActiveClass="selected_view">Home</RouterLink>
// since we want to interject to close app_nav
const open_nav_link = route => {
   display.value = false
   router.push(route)
}

const clicked_bg = () => {
   display.value = false
}


// AppNav CSS Transitions : 
// - 'app_nav' slides down and fades in - but we delay to allow dimmer to fade in
// - 'app_nav_links' appearance is determined by it's parent 'app_nav'
// - 'app_nav_dimmer' adds it's own transitions and fades in before
//    thus we hide dimmer bg sliding down.

</script>


<template>

   <div class="app_nav_hamburger">
      <button @click="display = display === true ? false : true"  :class="{opened : display === true}">
         <img src="../../../assets/icons/list.svg" alt="open nav menu"/>
      </button>
   </div>

   <Transition>

      <nav class="app_nav" :class="{opened : display === true}" @click="clicked_bg">

         <div class="app_nav_links">
            <a @click.stop="open_nav_link('/')">Home</a>
            <a @click.stop="open_nav_link('/songs')">Songs</a>
            <a @click.stop="open_nav_link('/songs/create')">Create</a>
            <a @click.stop="open_nav_link('/albums')">Albums</a>
            <a @click.stop="open_nav_link('/search')">Search</a>
            <a v-if="!app_store.bearer_token" @click.stop="open_nav_link('/login')">Login</a>
            <a v-else  @click.stop="open_nav_link('/account')">{{ app_store.username }}</a>
         </div>
         <div class="app_nav_dimmer"></div>

      </nav>

   </Transition>

</template>


<style scoped>

nav.app_nav {
   position:fixed;
   top:var(--app_nav_dropdown_top);
   right:0;
   z-index:var(--nav_layer);

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
   -webkit-transition:opacity 2.35s ease-in-out .25s,-webkit-transform .75s ease-in-out .25s;
   transition:opacity 2.35s ease-in-out .25s,-webkit-transform .75s ease-in-out .25s;
   -o-transition:opacity 2.35s ease-in-out .25s,transform .75s ease-in-out .25s;
   transition:opacity 2.35s ease-in-out .25s,transform .75s ease-in-out .25s;
   transition:opacity 2.35s ease-in-out .25s,transform .75s ease-in-out,-webkit-transform .75s ease-in-out .25s;
}

nav.app_nav > div.app_nav_dimmer {
   content:'';

   position:absolute;
   top:0;
   left:0;
   z-index:-1;

   width:100%;
   height:100%;
   background:grey;
   
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
   -webkit-transition:opacity .5s ease-in-out,-webkit-transform .35s ease-in-out;
   transition:opacity .5s ease-in-out,-webkit-transform .35s ease-in-out;
   -o-transition:opacity .5s ease-in-out,transform .35s ease-in-out;
   transition:opacity .5s ease-in-out,transform .35s ease-in-out;
   transition:opacity .5s ease-in-out,transform .35s ease-in-out,-webkit-transform .35s ease-in-out;
}
nav.app_nav.opened > div.app_nav_dimmer {
   opacity:.4;
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
   background: white;
   border-radius:0 0 .5rem .5rem;
}

.app_nav_hamburger {

   position:fixed;
   top:0;
   right:0;
   z-index:var(--over_nav_layer);

   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;

   -webkit-box-pack:flex-end;
   -ms-flex-pack:flex-end;
   justify-content:flex-end;

   width:100%;
   height:fit-content;
   margin:0;
   color:white;
   background:white;
}
.app_nav_hamburger button {
   background:white;
   border:none;
   outline:none;
}
/* grey-out opened dropdown ctrl */
.app_nav_hamburger button.opened {
   -webkit-filter: invert(15%) sepia(61%) saturate(5216%) hue-rotate(180deg) brightness(227%) contrast(105%);
   filter: invert(15%) sepia(61%) saturate(5216%) hue-rotate(180deg) brightness(227%) contrast(105%);
}
.app_nav_hamburger img {
   width:32px;
   height:32px;
   background:white;
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
      opacity:1;
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
   cursor:pointer;
   font-weight:400;
   background:white;
}
button {
   width:fit-content;
   height:fit-content;
   padding:0;
   padding-left:.5rem;
   padding-right:.5rem;
}


/* 
   configure Vue Transition component for app_nav slide-in
*/
@media (max-width: 768px) {
   .v-enter-active,.v-leave-active {
      -webkit-transition: opacity .25s ease-in-out;  
      -o-transition: opacity .25s ease-in-out;
      transition: .25s ease-in-out;
      opacity:1;      
      -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      transform: translate(0, 0);
   }
   .v-enter-from,.v-leave-to {
      -webkit-transform: translate(100%, 0);  
      -ms-transform: translate(100%, 0);
      transform: translate(100%, 0);
      opacity:0;
   }
}
</style>