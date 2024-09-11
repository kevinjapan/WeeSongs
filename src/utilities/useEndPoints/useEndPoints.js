

// useEndPoints composable

// map end_points names to relative URLs
// future : we want to seamlessly interchange btwn static files and server-api served data sources
// - since we want to build server-api served dev sites but demo as static

export default function useEndPoints() {
   return {

      login:'/login',
      
      songs_list:'/songs',
      get_single_song:'/songs/',
      create_song:'/songs',
      delete_song:'/songs',
      save_song:'/songs',
      search_songs:'/songs/search/',

      albums_list:'/albums',
      create_album:'/albums',
      load_album:'/albums/',
      delete_album:'/albums/',
      save_album:'/albums/',
      update_album:'/albums/'


   }
}

