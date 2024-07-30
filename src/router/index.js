import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { useSongStore } from '@/stores/songStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
         path: '/',
         name: 'home',
         component: () => import('../views/HomeView.vue')
      },
      {
         path: '/login',
         name: 'login',
         component: () => import('../views/LoginView.vue')
      },
      {
         path: '/albums',
         name: 'albums',
         component: () => import('../views/AlbumsView.vue') 
      },
      {
         path: '/search',
         name: 'search',
         component: () => import('../views/SearchView.vue')
      },
      {
         path: '/songs',
         name: 'songslist',
         component: () => import('../views/SongsListView.vue')
      },
      {
         path: '/songs/:slug',
         name: 'songcontainer',
         component: () => import('../views/SongContainerView.vue')
      },
      // {
      //    path: '/songs/songsList',
      //    name: 'songslist',
      //    component: () => import('../views/SongsListView.vue')
      // },
      {
         path: '/songs/:slug/meta',
         name: 'songmeta',
         component: () => import('../views/SongMetaView.vue'),
         // pass route params as props
         props: true
      },
      {
         path: '/songs/:slug/lyrics',
         name: 'songlyrics',
         component: () => import('../views/SongLyricsView.vue')
      },
      {
         path: '/songs/create',
         name: 'createsong',
         component: () => import('../views/CreateSongView.vue')
      },
      {
         path: '/songs/:slug/print',
         name: 'songprint',
         component: () => import('../views/SongPrintView.vue')
      },
      {
         path: '/about',
         name: 'about',
         // route level code-splitting
         // this generates a separate chunk (About.[hash].js) for this route
         // which is lazy-loaded when the route is visited.
         component: () => import('../views/AboutView.vue')
      }
   ]
})

router.beforeEach((to,from,next) => {
   const app_store = useAppStore()
   const song_store = useSongStore()
   if(song_store && !song_store.synched && app_store.bearer_token !== '') {
      if(window.confirm("You have not applied your changes, are you sure you want to leave the page?")) {

         // we discard changes to store up to this point
         song_store.discard_changes()

         // go to selected route page / view
         next()
      }
   }
   else {
      next()
   }
 })

export default router