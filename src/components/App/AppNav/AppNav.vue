<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const router = useRouter()
const app_store = useAppStore()

const close_app_nav = () => {
   app_store.display_nav = false
}

// we use router.push() rather than:
// <RouterLink to="/" class="view_link" activeClass="selected_view" exactActiveClass="selected_view">Home</RouterLink>
// since we want to interject to close app_nav
const open_nav_link = route => {
   app_store.display_nav = false
   router.push(route)
}


// to do : if user is scrolled down page, opening the AppNav places
//         the links above the fold.
//          deploy location of links has to be dynamic - 

</script>


<template>
   <Transition>

      <nav v-if="app_store.display_nav === true" class="flex flex_col align_items_end app_nav">

         <button @click="close_app_nav" class="close_app_nav mt_3 fit_content">X</button>

         <a @click="open_nav_link('/')">Home</a>
         <a @click="open_nav_link('/songs')">Songs</a>
         <a @click="open_nav_link('/songs/create')">Create</a>
         <a @click="open_nav_link('/albums')">Albums</a>
         <a @click="open_nav_link('/search')">Search</a>

         <a v-if="!app_store.bearer_token" @click="open_nav_link('/login')">Login</a>
         <!-- to do : user account? -->
         <a  v-else  @click="open_nav_link('/account')">{{ pp_store.username }}</a>

      </nav>

      <div v-else >
         <button @click="app_store.display_nav = true" class="app_nav_hamburger">M E N U 2</button>
      </div>

   </Transition>
</template>


<style scoped>
nav.app_nav {
   position:absolute;
   top:0;
   right:0;
   z-index:90000;    /* to do : review all layering */
   text-align:right;

   width:fit-content;   /* to do : set media query w/ 100% width for sm */
   height:fit-content;

   padding:2rem;
   font-size:1.5rem;
   font-weight:300;
   color:white;
   background:blue;
}
/* configure Vue Transition component for app_nav slide-in*/
.v-enter-active,.v-leave-active {
   -webkit-transition: opacity .5s ease-in-out;  
   -o-transition: opacity .5s ease-in-out;
   transition: .5s ease-in-out;
   
   -webkit-transform: translate(0, 0);
   -ms-transform: translate(0, 0);
   transform: translate(0, 0);
}
.v-enter-from,.v-leave-to {
   -webkit-transform: translate(0, -100%);  
   -ms-transform: translate(0, -100%);
   transform: translate(0, -100%);
}

nav.app_nav > div {
   /* to do : review : div? */
   cursor:pointer;
   border:solid 1px lightgrey;
}
.app_nav_hamburger {
   position:fixed;
   top:0;
   right:0;
   z-index:999999999999999;
   width:100px;
   height:fit-content;
   background:white;
}
a {
   color:inherit;
   cursor:pointer;
}
button {
   width:fit-content;
   height:fit-content;
   padding:0;
   padding-left:.5rem;
   padding-right:.5rem;
}
.close_app_nav {
   margin-left:auto;
   margin-right:0;
}
</style>