<script setup>

defineEmits(['test-prop-method'])   // permits eg emit('test-prop-method') calls within script


// -----------------------------------------------------------
// WORK IN PROGRESS
// MOST OF THE COMMENTS ARE FROM VUE JS DOCUMENTATION
// WILL GRADUALLY REDUCE AS WE GET FAMILIAR WITH THE FRAMEWORK
// -----------------------------------------------------------

// Vue components require explicit props declaration so that Vue knows what external props passed
// to the component should be treated as 'fallthrough attributes'
// Attribute Inheritance​ - a "fallthrough attribute" is an attribute or v-on event listener that is passed to a component, 
// but is not explicitly declared in the receiving component's props or emits. Common examples of this include class, style, and id attributes.

// Props declaration - defineProps() macro
const props = defineProps([
   'page','title','step_to_page','navigate_to_page','page_links','longPropertyName'
])

// note 'longPropertyName' is used while attribute in parent component is 'long-property-name' (longPropertyName is also valid in parent call)
// "Like components and props, event names provide an automatic case transformation. 
//  As with props casing, we recommend using kebab-cased event listeners in templates."
// the convention is using kebab-case in all cases to align with HTML attributes:
// 
// We declare long prop names using camelCase because this avoids having to use quotes when using them as property keys, and allows us to 
// reference them directly in template expressions because they are valid JavaScript identifiers:


// Prop Validation 
// To specify prop validations, you can provide an object with validation requirements to the defineProps() macro, instead of an array of strings
// In addition to declaring props using an array of strings, we can also use the object syntax:
// For each property in the object declaration syntax, the key is the name of the prop, while the 
// value should be the constructor function of the expected type.
// This not only documents your component, but will also warn other developers using your component 
// in the browser console if they pass the wrong type.
//
// defineProps({
//   title: String,
//   likes: Number
// })

const step = (step) => {
   props.step_to_page(step)
}
const go_to_page = (selected_page) => {
   props.navigate_to_page(selected_page)
}

const is_selected_link = (link_label => {
   return parseInt(link_label) === props.page
})

/*
   CLASS AND STYLE BINDING
   Since class and style are both attributes, we can use v-bind to assign them a string value dynamically, much like with other attributes -
   but Vue provides special enhancements when v-bind is used with class and style.
   eg <div :class="{ active: isActive }"></div>
   where the presence of the 'active' class will be determined by the truthiness of the data property isActive.
   You can have multiple classes toggled by having more fields in the object:
   :class="{ active: isActive, 'text-danger': hasError }"
*/
</script>


<template>
   <ul class="nav_bar justify_between">
      <li v-on:click="step(-1)" class="cursor_pointer">prev</li>
      <li v-for="link in page_links" :key="link.label" v-on:click="go_to_page(link.label)" 
         class="cursor_pointer" :class="{ selected_link: is_selected_link(link.label) }"
         >{{ link.label }}</li>
      <li v-on:click="step(1)" class="cursor_pointer">next</li>
   </ul>
</template>


<style scoped>
.nav_bar {
  display:flex;
  max-width:600px;
  margin-left:auto;
  margin-right:auto;
}
.flex {
   display:flex;
}
.justify_between {
   justify-content:space-between;
}
.nav_bar li {
   padding:.5rem;
   padding-top:.25rem;
   padding-bottom:.25rem;
}
.selected_link {
   border:solid 1px grey;
   background:yellow;
}
</style>
