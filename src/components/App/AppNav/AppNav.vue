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

</script>


<template>

   <button @click="display = display === true ? false : true" class="app_nav_hamburger">
      <img src="../../../assets/icons/list.svg" alt="open nav menu"/>
   </button>

   <Transition>

      <nav class="app_nav flex" :class="{opened : display === true}" @click="clicked_bg">
         <a @click.stop="open_nav_link('/')">Home</a>
         <a @click.stop="open_nav_link('/songs')">Songs</a>
         <a @click.stop="open_nav_link('/songs/create')">Create</a>
         <a @click.stop="open_nav_link('/albums')">Albums</a>
         <a @click.stop="open_nav_link('/search')">Search</a>
         <a v-if="!app_store.bearer_token" @click.stop="open_nav_link('/login')">Login</a>
         <!-- to do : user account? -->
         <a  v-else  @click.stop="open_nav_link('/account')">{{ app_store.username }}</a>
      </nav>

   </Transition>

</template>


// Goodfood100

<style scoped>
nav.app_nav {
   position:fixed;
   top:var(--app_nav_dropdown_top);
   right:0;
   z-index:var(--over_nav_layer);

   width:100%;
   height:100%;
   padding-right:2rem;
   overflow:hidden;
   flex-direction:column;
   justify-content:flex-start;
   gap:1rem;
   font-size:1.1rem;
   /*background:black;*/

   /* transitions */
   -webkit-transform: translateY(-200%);
   -ms-transform: translateY(-200%);
   transform: translateY(-200%);
   opacity:0;
   -webkit-transition:opacity .35s ease-in-out,-webkit-transform .75s ease-in-out;
   transition:opacity .35s ease-in-out,-webkit-transform .75s ease-in-out;
   -o-transition:opacity .35s ease-in-out,transform .75s ease-in-out;
   transition:opacity .35s ease-in-out,transform .75s ease-in-out;
   transition:opacity .35s ease-in-out,transform .75s ease-in-out,-webkit-transform .75s ease-in-out;
}

nav.app_nav::before {
   content:'';
   position:absolute;
   top:0;
   left:0;
   width:100%;
   height:100%;
   background:grey;
   opacity:.5;
   z-index:-1;
}


nav.app_nav.opened {

   /* transitions */
   -webkit-transform: translateY(0);
   -ms-transform: translateY(0);
   transform: translateY(0);
   opacity:1;
   -webkit-transition:opacity 1s ease-in-out,-webkit-transform .75s ease-in-out;
   transition:opacity 1s ease-in-out,-webkit-transform .75s ease-in-out;
   -o-transition:opacity 1s ease-in-out,transform .75s ease-in-out;
   transition:opacity 1s ease-in-out,transform .75s ease-in-out;
   transition:opacity 1s ease-in-out,transform .75s ease-in-out,-webkit-transform .75s ease-in-out;
}

nav.app_nav > div {
   cursor:pointer;
   border:solid 1px lightgrey;
}

.app_nav_hamburger {

   position:fixed;
   top:0;
   right:0;
   z-index:var(--over_nav_layer);

   display:flex;

   justify-content:flex-end;

   width:100%;
   height:fit-content;
   margin:0;
   color:white;
}
.app_nav_hamburger img {
   width:32px;
   height:32px;
}

@media (min-width: 768px) {
   
   nav.app_nav {      
      position:fixed;
      top:0;
      right:0;
      z-index:var(--nav_layer);

      display:flex;
      flex-direction:row;
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
   .app_nav_hamburger {
      display:none;
   }
}
/* 
we stack <a> elements rather than include yet another wrapper
*/
a {
   width:fit-content;
   margin:0;
   padding:0;
   color:inherit;
   cursor:pointer;
   font-weight:400;
   background:white;
   align-self:flex-end;
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