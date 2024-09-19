import useStatusCode from '../useStatusCode/useStatusCode'


export default async function useFetch(url,options) {

   let data = null
   let error = null

   await fetch(url,options)
      .then((res) => {
         if(res.ok === true) {
            return res.json()
         }
         else {
            throw useStatusCode(res.status)
         }
      }) 
      .then((json) => {
         data = json
      })
      .catch((err) => (error = err))

   return { data, error }
}

