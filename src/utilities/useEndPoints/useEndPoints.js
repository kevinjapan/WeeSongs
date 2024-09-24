import { useAppStore } from '@/stores/appStore'

// useEndPoints composable

// map end_points names to relative URLs
// app_store.app_api is our flag - if emtpy, we are in 'web api' mode, else we are in 'static site' mode
// url params : we assume order matches that expected by end-point and we append to url
   
export default function useEndPoints(url_params,query_params) {

   const app_store = useAppStore()

   if(app_store.app_api === '') {

      // static site endpoints

      return {

         songs_list:{
            request_method:'GET',
            route:`/data/songs_list_${query_params.page}.json`,
            route_url_params:url_params?.join('/')
         },
         get_single_song:{
            request_method:'GET',
            route:`/data/songs/${url_params[0]}.json`,
            route_url_params:''
         },


         albums_list:{
            request_method:'GET',
            route:'/data/albums_list.json',
            route_url_params:url_params?.join('/')
         },
         load_album:{
            request_method:'GET',
            route:`/data/albums/${url_params[0]}.json`,
            route_url_params:''
         }
      }

   }
   else {

      // web api endpoints

      return {

         login:{
            request_method:'POST',
            route:'/login',
            route_url_params:url_params
         },


         songs_list:{
            request_method:'GET',
            route:'/songs',
            route_url_params:url_params
         },
         get_single_song:{
            request_method:'GET',
            route:'/songs/',
            route_url_params:url_params
         },
         create_song:{
            request_metho:'POST',
            route:'/songs'
         },
         delete_song:{
            request_method:'DELETE',
            route:'/songs/',
            route_url_params:url_params
         },
         save_song:{
            request_method:'PUT',
            route:'/songs/',
            route_url_params:url_params
         },
         update_song:{
            request_method:'PUT',
            route:'/songs/',
            route_url_params:url_params
         },


         search_songs:{
            request_method:'GET',
            route:'/songs/search/',
            route_url_params:url_params
         },


         albums_list:{
            request_method:'GET',
            route:'/albums',
            route_url_params:url_params
         },
         load_album:{
            request_method:'GET',
            route:'/albums/',
            route_url_params:url_params
         },
         create_album:{
            request_method:'POST',
            route:'/albums',
            route_url_params:url_params
         },
         delete_album:{
            request_method:'DELETE',
            route:'/albums/',
            route_url_params:url_params
         },
         save_album:{
            request_method:'PUT',
            route:'/albums/',
            route_url_params:url_params
         },
         update_album:{
            request_method:'PUT',
            route:'/albums/',
            route_url_params:url_params
         }
      }
   }
}

