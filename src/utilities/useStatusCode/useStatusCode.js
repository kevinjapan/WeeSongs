

export default function useStatusCode(status_code) {

   let msg = ''
   switch(status_code) {
      case 404:
         msg = 'Sorry, the resource you requested was not found on the server.'
         break
      default:
         msg = 'There was a problem trying to fetch the data.'
   }
   return msg
}




