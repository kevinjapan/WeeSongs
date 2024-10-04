

export const scroll_to_elem = (id) => {
   let target = document.getElementById(id)
   if(target !== null) target.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
}

// errors are typically passed as arrays of strings, only add if unique
export const add_if_unique_str = (arr,str) => {
   if(arr.find(elem => elem === str) === undefined) arr.push(str)
}

export const truncate = (str,len = 20,trailing = true) => {
   if(str) {
      if(str !== "" && str.length > len) {
         return trailing ? str.substring(0, len) + '..' : str.substring(0, len) 
      }
   }
   return str
}


// Tests if first array is a subset (therefore first is fully matched) of the second.
// 1-d arrays of primitives only. Using .every() method removes any dependancy on order.
export const is_subset_array = (potential_subset_arr,main_arr) => {
   return potential_subset_arr.every(elem => main_arr.includes(elem))
}