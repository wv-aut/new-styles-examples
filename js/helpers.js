export function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
}

export function getElementDimensions(element) {
    return element.getBoundingClientRect()
}

export function lazyLoadImage(element) {

}

// Get image position right:
export function setImages() {
    const containerImage = document.getElementsByClassName('container-image')
    let standardWindowHeight = 700
    let headerHeight = 60
    let diffHeight = 0    
    let clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    Array.prototype.forEach.call(containerImage, function(e,i,a) {

        const dimensions = getElementDimensions(e)

        if(dimensions.height >= e.children[0].offsetHeight) {
            e.children[0].style.height = e.offsetHeight + 'px'
            e.children[0].style.width = 'auto'
            
        } else {
            e.children[0].style.width = e.offsetWidth + 'px'
            e.children[0].style.height = 'auto'

        }
    })
}

export function test () {
  console.log('adflkajdfljfdsa')
}