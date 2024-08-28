<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const router = useRouter()
const app_store = useAppStore()

// const close_app_nav = () => {
//    app_store.display_nav = false
// }

// we use router.push() rather than:
// <RouterLink to="/" class="view_link" activeClass="selected_view" exactActiveClass="selected_view">Home</RouterLink>
// since we want to interject to close app_nav
const open_nav_link = route => {
   app_store.display_nav = false
   router.push(route)
}


//  v-if="app_store.display_nav === true"


// <button @click="app_store.display_nav = true" class="app_nav_hamburger">
//             <img src="../../../assets/icons/list.svg" alt="open nav menu"/>
//          </button>
</script>


<template>
   <Transition>

      <nav class="app_nav flex flex_col align_items_end">

         <a @click="open_nav_link('/')">Home</a>
         <a @click="open_nav_link('/songs')">Songs</a>
         <a @click="open_nav_link('/songs/create')">Create</a>
         <a @click="open_nav_link('/albums')">Albums</a>
         <a @click="open_nav_link('/search')">Search</a>

         <a v-if="!app_store.bearer_token" @click="open_nav_link('/login')">Login</a>
         <!-- to do : user account? -->
         <a  v-else  @click="open_nav_link('/account')">{{ app_store.username }}</a>

      </nav>

   </Transition>
</template>


<style scoped>
nav.app_nav {
   position:fixed;
   top:0;
   right:0;
   z-index:var(--nav_layer);
   text-align:right;

   width:fit-content;
   height:fit-content;
   margin:0;
   padding:0;
   font-size:1.2rem;
   font-weight:300;
}

nav.app_nav > div {
   cursor:pointer;
   border:solid 1px lightgrey;
}

@media (min-width: 768px) {
   
   nav.app_nav {
      position:fixed;
      width:100%;
      height:var(--app_nav_height);
      padding-right:2rem;
      overflow:hidden;

      flex-direction:row;
      justify-content:flex-end;
      gap:1rem;
      font-size:1.1rem;

      background:white;
   }

}
.app_nav_hamburger {
   position:fixed;
   top:0;
   right:0;
   z-index:var(--nav_layer);
   width:fit-content;
   height:fit-content;
   margin:1rem;
   background:white;
}
.app_nav_hamburger img {
   width:32px;
   height:32px;
}
a {
   margin:0;
   padding:0;
   color:inherit;
   cursor:pointer;
   font-weight:400;
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
@media (min-width: 768px) {
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