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


</script>


<template>
   <Transition>
      <nav v-if="app_store.display_nav === true" class="flex flex_col align_items_center app_nav">
         <a @click="open_nav_link('/')">Home</a>
         <a @click="open_nav_link('/songs')">Songs</a>
         <a @click="open_nav_link('/songs/create')">Create</a>
         <a @click="open_nav_link('/albums')">Albums</a>
         <a @click="open_nav_link('/search')">Search</a>

         <a v-if="!app_store.bearer_token" @click="open_nav_link('/login')">Login</a>
         <!-- to do : user account? -->
         <a  v-else  @click="open_nav_link('/account')">{{ pp_store.username }}</a>

         <button @click="close_app_nav" class="mt_3">X</button>
      </nav>
      <div v-else class="app_nav_hamburger">
         <button @click="app_store.display_nav = true">M E N U 2</button>
      </div>
   </Transition>
</template>


<style scoped>
nav.app_nav {
   position:absolute;
   top:0;
   right:0;
   z-index:90000;    /* to do : review all layering */

   width:100%;   /* modify width of nav to affect extent of slide */
   height:100%;

   padding-top:5rem;
   font-size:1.5rem;
   font-weight:300;
   color:white;
   background:blue;
}
/* configure Vue Transition component for app_nav slide-in*/
.v-enter-active,.v-leave-active {
   /*transition: opacity .5s ease-in-out;*/
   transition: .5s ease-in-out;
   transform: translate(0, 0);
}
.v-enter-from,.v-leave-to {
   /*opacity: 0;*/
   transform: translate(100%, 0);
}

nav.app_nav > div {
   /* to do : review : div? */
   cursor:pointer;
   border:solid 1px lightgrey;
}
.app_nav_hamburger {
   position:absolute;
   top:0;
   right:0;
   width:100px;
   height:100px;
   background:white;
}
a {
   color:inherit;
   cursor:pointer;
}

</style>