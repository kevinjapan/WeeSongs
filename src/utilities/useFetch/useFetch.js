

export default async function useFetch(url,options) {

   let data = null
   let error = null

   await fetch(url,options)
      .then((res) => res.json())
      .then((json) => {
         data = json
      })
      .catch((err) => (error = err))

   return { data, error }
}

