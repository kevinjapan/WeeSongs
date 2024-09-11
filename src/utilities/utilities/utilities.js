

export const scroll_to_elem = (id) => {
   let target = document.getElementById(id)
   if(target !== null) target.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
}