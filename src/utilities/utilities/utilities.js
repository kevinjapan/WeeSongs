

export const scroll_to_elem = (id) => {
   let target = document.getElementById(id)
   if(target !== null) target.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
}

// errors are typically passed as arrays of strings, only add if unique
export const add_if_unique_str = (arr,str) => {
   if(arr.find(elem => elem === str) === undefined) arr.push(str)
}