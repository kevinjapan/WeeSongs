<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useAppStore } from '@/stores/appStore'
import PaginationNav from '../components/PaginationNav/PaginationNav.vue'
import reqInit from "../utilities/requestInit/RequestInit"
import get_ui_ready_date from "../utilities/dates/dates"
import { useRouter, useRoute } from 'vue-router'

//
// SongsListView
// Display list of Songs
//

// -----------------------------------------------------------
// WORK IN PROGRESS
// MOST OF THE COMMENTS ARE FROM VUE JS DOCUMENTATION
// WILL GRADUALLY REDUCE AS WE GET FAMILIAR WITH THE FRAMEWORK
// -----------------------------------------------------------

const router = useRouter()
const app_store = useAppStore()

// DECLARING REACTIVE STATE - primitives/arrays - ref()
// In Composition API, the recommended way to declare reactive state in a component is using the ref() function:
// ref() takes the argument and returns it wrapped within a ref object with a .value property:
// no need to append .value when using the ref in the template. For convenience, refs are automatically unwrapped when used inside templates
//  dependency-tracking based reactivity system. 
// Deep Reactivity ​
// In Vue, state is deeply reactive by default. This means you can expect changes to be detected even 
// when you mutate nested objects or arrays:

const songs_list = ref(null)


// DECLARING REACTIVE STATE - objects - reactive()
// There is another way to declare reactive state, with the reactive() API. 
// Unlike a ref which wraps the inner value in a special object, reactive() makes an object itself reactive:
// "Due to these limitations, we recommend using ref() as the primary API for declaring reactive state.""
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// -Reactive objects are JavaScript Proxies and behave just like normal objects. The difference is that Vue is able to intercept the access 
//  and mutation of all properties of a reactive object for reactivity tracking and triggering.
const loading_error = reactive({is_error:false})

// COMPUTED PROPERTY
// for complex logic that includes reactive data, it is recommended to use a computed property
// Vue is aware that 'has_error' depends on 'loading_error', so it will update any bindings 
// that depend on 'has_error' when 'loading_error' changes.
// computed properties are cached based on their reactive dependencies.
// Computed properties are by default getter-only (you can create ... by providing both a getter and a setter)
// computed getter functions should only perform pure computation and be free of side effects. 
// For example, don't mutate other state, make async requests, or mutate the DOM inside a computed getter
const has_error = computed(() => {
  return loading_error.is_error === true ? true : false
})


// custom suspense flag
const loading = ref(true)

// pagination
const page = ref(1)

// order
const order_by = ref('made')
// asc
const asc = ref(false)

// last page
const last_page = ref(1)


// page links
const page_links = ref([])


// COMPUTED PROPERTIES
// In-template expressions are very convenient, but they are meant for simple operations


// properties for BINDING examples below
const id = ref(0)
const dynamic_id_1 = ref(1)
const dynamic_id_2 = ref(2)
const is_button_disabled = true
const objectOfAttrs = {
   id: 'container_testing',
   class: 'wrapper',
   width: '200px',
   height: '100px',
   style: 'background-color:pink'
}

const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})


const get_list =async() => {
   
   await fetch(`${app_store.app_api}/songs?order_by=${order_by.value}&asc=${asc.value}&page=${page.value}`,reqInit())
      .then(response => response.json())
      .then(data => {
         songs_list.value = data
         last_page.value = data.songs_list.last_page
         loading.value = false         
         page_links.value = data.songs_list.links.filter((element, index,array) => { 
            return index !== 0 && index !== array.length - 1 // we remove server-provided 'prev' and 'next' (unpredictable)
         })
      })
      .catch((error) => {
         loading_error.is_error = true
      })
}
get_list()


/*  Event Modifiers 
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a
*/

/*
Key Modifiers ​
When listening for keyboard events, we often need to check for specific keys. Vue allows adding key modifiers for v-on or @ when listening for key events:
<!-- only call `submit` when the `key` is `Enter` -->
<input @keyup.enter="submit" />
*/

const get_new_page_num = (step) => {
   const new_page_num = page.value + step
   if(new_page_num < 1) return 1
   // if(new_page_num > total_pages) return total_pages // future : check we don't exceed
   return new_page_num
} 

const step_to_page = (step) => {   
   const new_page_num = get_new_page_num(parseInt(step))
   if(new_page_num) {
      page.value = new_page_num
      get_list()
   }
}

const navigate_to_page = (selected_page) => {
   page.value = parseInt(selected_page)
   get_list()
}

const create_song = (event) => {
   console.log('will create song')
}
const settings = (event) => {
   console.log('will open settings')
} 
const say = (msg,event) => {
   console.log(msg,event.target)
}


const clicked_title = (song_slug) => {
   // Navigate to a different location
   router.push(`/songs/${song_slug}`)
}

const order_songs_by = (col_title) => {
   // start @ page 1
   page.value = 1
   // set order_by col
   order_by.value = col_title
   // toggle asc
   asc.value = asc.value ? false : true
}

// watch works directly on a ref
watch(order_by, async (new_page, old_page) => {
   // if (newQuestion.includes('?')) {
   //    loading.value = true
   //    answer.value = 'Thinking...'
   //    try {
   //       const res = await fetch('https://yesno.wtf/api')
   //       answer.value = (await res.json()).answer
   //    } catch (error) {
   //       answer.value = 'Error! Could not reach the API. ' + error
   //    } finally {
   //       loading.value = false
   //    }
   // }
   get_list()
})

watch(asc, async (new_page, old_page) => {
   get_list()
})

</script>

<template>
   <!--
      Think of the template as a JavaScript function declared in the same scope - 
      it has access to everything declared alongside it.
   -->
   <!-- 
      THESE COMMENTS WILL SERVE AS I LEARN AND WILL LATER BE EXTRACTED TO FORM BASIS FOR VUE DOCS PROJECT 
      move individual examples out of here as i find somewhere legit to utilise them
   -->

   <!-- 
      DATA BINDING - bind element content with a component property
      The most basic form of data binding is text interpolation using the "Mustache" syntax (double curly braces): 
      [text interpolation - evaluating a string literal and replacing placeholders with corresponding values]
   -->

   <!--
      HTML BINDING - bind element innerHTML with a component property
      Inject plain HTML into your template - the v-html directive - updates the element's innerHTML.
      Directives are prefixed with v- to indicate that they are special attributes provided by Vue, 
      and they apply special reactive behavior to the rendered DOM. (plain html - data bindings are ignored)
      "keep this element's inner HTML up-to-date with the raw_html property on the current active instance."
      Only use v-html on trusted content and never on user-provided content.
      In Single-File Components, scoped styles will not apply to content inside v-html, it is not processed by Vue's template compiler.
   
   <p>Using v-html directive: <div v-html="raw_html"></div></p>
   -->


   <!--
      ATTRIBUTE BINDING - bind element attribute to component property
      The v-bind directive instructs Vue to keep the element's attribute in sync with a component property. 
   -->
   <div v-bind:id="dynamic_id_1"></div>
   <!--
      shorthand
   -->
   <div :id="dynamic_id_2"></div>
   <!-- 
      same-name shorthand - same as :id="id" 
   -->
   <div :id></div>

   <!--
      BOOLEAN ATTRIBUTES
      The disabled attribute is included if component property is a truthy value or empty string - otherwise it is omitted
   <button :disabled="is_button_disabled">Button</button>
   -->

   <!--
      Dynamically Binding MULTIPLE ATTRIBUTES
      bind JavaScript object representing multiple attributes 
   <div v-bind="objectOfAttrs">multiples</div>
   -->

   <!--
      Using JavaScript Expressions
      An expression is a piece of code that can be evaluated to a value. A simple check is whether it can be used after return.
      Each binding can only contain one single expression. 
      Vue actually supports the full power of JavaScript expressions inside all data bindings:
   -->
   <!--
   {{ number + 1 }}
   {{ ok ? 'YES' : 'NO' }}
   {{ message.split('').reverse().join('') }}
   <div :id="`list-${id}`"></div>
   -->

   <!--
      Calling Functions ​
      It is possible to call a component-exposed method inside a binding expression:

      template
      <time :title="toTitleDate(date)" :datetime="date">
      {{ formatDate(date) }}
      </time>
      TIP

      Functions called inside binding expressions will be called every time the component updates, so they should not 
      have any side effects, such as changing data or triggering asynchronous operations.
   -->

   <!--
      DIRECTIVES - special attributes with the v- prefix. 
      A directive's job is to reactively apply updates to the DOM when the value of its expression changes. 
      primary directives:
      v-html / v-show / v-if / v-else / v-for / v-on / v-bind (:) / v-v-model
   -->
   <!-- @ is shorthand for v-on: -->
   <!--
      DIRECTIVE ARGUMENTS ​
      Some directives can take an "argument", denoted by a colon after the directive name. 
      For example, the v-bind directive is used to reactively update an HTML attribute:
      template
      <a v-bind:href="url"> ... </a>
   -->
   <!--
      Another example is the v-on directive, which listens to DOM events:
      <a v-on:click="doSomething"> ... </a>
      <a @click="doSomething"> ... </a> 
   -->
   
   <!--
      DIRECTIVE MODIFIERS ​
      Modifiers are special postfixes denoted by a dot, which indicate that a directive should be bound 
      in some special way. For example, the .prevent modifier tells the v-on directive to call 
      event.preventDefault() on the triggered event:      
      <form @submit.prevent="onSubmit">...</form>
   -->

   <!--
      CLASS AND STYLE BINDING
      Since class and style are both attributes, we can use v-bind to assign them a string value dynamically, much like with other attributes -
      but Vue provides special enhancements when v-bind is used with class and style.
      see example in PaginationNav component
   -->

   <!--
      any type of value can be passed to a prop.
      even if a static array, we need v-bind (:) to tell Vue that
      this is a JavaScript expression rather than a string
   -->

   <!--
      To pass all the properties of an object as props, you can use v-bind without an argument (v-bind instead of :prop-name)
      The following template:
      <BlogPost v-bind="post" />
      Will be equivalent to:
      <BlogPost :id="post.id" :title="post.title" />
   -->

   <!--
      DYNAMIC COMPONENTS
      see linked examples in Components Basics
   -->

   <section class="grid_list">

      <!-- The directive v-if is used to conditionally render a block.-->
      <div v-if="has_error">
         There was a problem loading data from the server, please try again later.
      </div>

      <!-- the v-else directive indicates an "else block" for v-if: -->
      <div v-else>
         
         <div v-if="loading" class="loading"></div>
      
         <div v-else>
         
            <PaginationNav title="PageNav for SongsList" class="mt_3"
               :page=page 
               :step_to_page="step_to_page" 
               :navigate_to_page="navigate_to_page" 
               :page_links="page_links" 
               long-property-name="this is a long property name's value"
            />
   
            <ul class="songs_list">

               <!-- TITLES -->
               <li>
                  <div @click="order_songs_by('title')" class="cursor_pointer">title</div>
                  <div @click="order_songs_by('created_at')" class="cursor_pointer text_right">made</div>
                  <div @click="order_songs_by('updated_at')" class="cursor_pointer text_right">updated</div>
               </li>
               <!-- 
                  use the v-for directive to render a list of items based on an array 
                  To give Vue a hint so that it can track each node's identity, and thus 
                  reuse and reorder existing elements, you need to provide a unique key attribute for each item:
               -->

               <!-- LIST SONGS-->
               <li v-for="song in songs_list.songs_list.data" :key="song.id">
                  <div class="cursor_pointer" @click="clicked_title(song.slug)">{{ song.title }}</div> 
                  <div class="text_right">{{ get_ui_ready_date(song.made) }}</div>
                  <div class="text_right">{{ get_ui_ready_date(song.updated) }}</div>
               </li>

               <!-- research below -->
               <!--
                  v-for also supports an optional second alias for the index of the current item
                  <li v-for="(item, index) in items"> 
               -->

               <!--
                  v-for with an Object ​
                  You can also use v-for to iterate through the properties of an object. 
                  The iteration order will be based on the result of calling Object.keys() on the object:   
               -->
               <h4>Object v-for</h4>
               <ul>
                  <li v-for="value in myObject">
                     {{ value }}
                  </li>
               </ul>
               <ul>
                  <li v-for="(value, key) in myObject">
                  {{ key }}: {{ value }}
                  </li>
               </ul>
            </ul>
         </div>
      </div>

   </section>

</template>

<style scoped>
.grid_list {
   width:100%;
}
.grid_list li{
   display:-ms-grid;
   display:grid;
   -ms-grid-columns: 1fr 1fr 1fr;
   grid-template-columns: 1fr 1fr 1fr;
   grid-gap:.7rem;
   text-align:left;
}
.songs_list {
   max-width:100%;
   padding-right:2rem;
}
.text_right {
   text-align:right;
}
</style>
