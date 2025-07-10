import useStatusCode from '../useStatusCode/useStatusCode'
import { truncate } from '../../utilities/utilities/utilities.js'


export default async function useFetch(url,options) {

   let data = null
   let error = null

   await fetch(url,options)
      .then(async(res) => {
         if(res.ok === true) {
            return res.json()
         }
         else {
            // error response : message, exception, file, line
            const response = await res.json()
            throw truncate(response.message,120)
         }
      }) 
      .then((json) => {
         data = json
      })
      .catch((err) => {
         error = err
      })
         

   return { data, error }
}

