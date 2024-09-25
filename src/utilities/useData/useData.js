import { useAppStore } from '@/stores/appStore'
import useEndPoints from '../useEndPoints/useEndPoints'
import useFetch from '../useFetch/useFetch'
import reqInit from '../requestInit/RequestInit'


// useData composable

// we want ability to change between static (no-server, data in files) and server-api served site
// our application will call useData and herein we will map to correct end-point.
// by using this middleman, we only have a single point of change to achieve this (eg components don't care what the url is)
// future : 
// we want to seamlessly interchange btwn static files and server-api served data sources.
// since we want to build server-api served dev sites but demo as static
// - in dev: const { data, error } = await useFetch(`${app_store.app_api}/songs?order_by=${order_by.value}&asc=${asc.value}&page=${page.value}`,reqInit())
// - in static: const { data, error } = await useFetch(`./songs_list.json`,reqInit())


// useData
// @url_params  : array of url params (ids/slugs) to include in url path
// @query_params: object containing key/value pairs to build query string
// @body        : pass js object or json string

export default async function useData(end_point,url_params,query_params,body) {

   const app_store = useAppStore()
   const end_points = useEndPoints(url_params,query_params)

   if(!Object.hasOwn(end_points,end_point)) {
      return { error: 'The query end-point was not recognized.' }
   }

   const { request_method, route, route_url_params } = end_points[end_point]

   if(body && typeof body === 'object') {
      body = JSON.stringify(body)
   }

   const query_string = Object.keys(query_params).length > 0 ? new URLSearchParams(query_params) : ''

   return await useFetch(
      `${app_store.app_api}${route}${route_url_params}${query_string ? '?' : ''}${query_string ? query_string : ''}`,
      reqInit(request_method,app_store.bearer_token,body)
   )
}