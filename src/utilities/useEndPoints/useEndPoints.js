

// useEndPoints composable

// map end_points names to relative URLs
// future : we want to seamlessly interchange btwn static files and server-api served data sources
// - since we want to build server-api served dev sites but demo as static

export default function useEndPoints() {

   return {

      login:{
         request_method:'POST',
         route:'/login'
      },
      

      songs_list:{
         request_method:'GET',
         route:'/songs'
      },
      get_single_song:{
         request_method:'GET',
         route:'/songs/'
      },
      create_song:{
         request_metho:'POST',
         route:'/songs'
      },
      delete_song:{
         request_method:'DELETE',
         route:'/songs/'
      },
      save_song:{
         request_method:'PUT',
         route:'/songs/'
      },
      update_song:{
         request_method:'PUT',
         route:'/songs/'
      },


      search_songs:{
         request_method:'GET',
         route:'/songs/search/'
      },


      albums_list:{
         request_method:'GET',
         route:'/albums'
      },
      load_album:{
         request_method:'GET',
         route:'/albums/'
      },
      create_album:{
         request_method:'POST',
         route:'/albums',
      },

      delete_album:{
         request_method:'DELETE',
         route:'/albums/'
      },
      save_album:{
         request_method:'PUT',
         route:'/albums/'
      },
      update_album:{
         request_method:'PUT',
         route:'/albums/'
      }


   }
}

