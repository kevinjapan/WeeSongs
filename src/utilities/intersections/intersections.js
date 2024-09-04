


export default function init_infinite_scroll(callback)  {
   const faders = document.querySelectorAll('.infinite_scroll_trigger')
   const effectOptions = {
      threshold: 0,
      rootMargin: "0px 0px 600px 0px"
   }
   return create_observers(faders,callback,effectOptions)
}

const create_observers = (elements,callback,options) => {

   let observers_created = false

   const loadOnScroll = new IntersectionObserver(
      function(entries,loadOnScroll){
         entries.forEach(entry => {
            if(!entry.isIntersecting) return


            // to do : review
            // we rely on 'last_page' in AllTracksSelector to remove 'infinite_scroll_trigger',
            // can we put a failsafe in here to prevent endless loop too?
            callback()
            

            // entry.target.classList.add(active_class)
            loadOnScroll.unobserve(entry.target)
         })
   },options)

   if(elements) {
      elements.forEach(element => {
         loadOnScroll.observe(element)
      })
      observers_created = true
   }
   return observers_created
}

