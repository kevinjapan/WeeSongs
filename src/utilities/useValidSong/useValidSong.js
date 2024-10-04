import { is_subset_array } from '../utilities/utilities'


// useValidSong
// test if a valid Song (contains all required fields) before submitting to server

// to do : complete - test this by adding tracks to track list in album

export default function useValidSong(song) {

   // we require populated values for the required keys
   // future : we could query server api for this list
   const required_props = {
      'title':{type:'string'},
      'slug':{type:'string'},
      'writers':{type:'string'},
      'songsheet':{type:'object'}      // future : review : check if valid song at this point?
   }

   const song_keys = Object.keys(song)

   // check all required_props are keys in the Song
   if(!is_subset_array(Object.keys(required_props),song_keys)) {
      console.log('nope, not all keys present')
      // to do : bail - we don't have all the keys
   }

   // to do : now we need to check they are all populated





   // check all have valid values
          
   console.log('useValidSong',song)

   // return true or false
}