

// useEndPoints composable

// map end_points names to relative URLs
// future : we want to seamlessly interchange btwn static files and server-api served data sources
// - since we want to build server-api served dev sites but demo as static

export default function useEndPoints() {

   return {
      songs_list:'/songs',
      albums_list:'/albums'
   }
}

