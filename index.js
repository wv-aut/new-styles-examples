require('normalize.css')
require('./scss/style.js')
require('./images')
import { getQueryVariable } from './js/helpers'

let currentContainer = ''

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Get image position right:

function setImages () {
    var containerImage = ''
    var standardWindowHeight = 600
    var headerHeight = 60
    var diffHeight = 0    
    var clientHeight = document.documentElement.clientHeight
    containerImage = document.getElementsByClassName('container-image')
    Array.prototype.forEach.call(containerImage, function(e,i,a) {
        if (clientHeight - headerHeight < standardWindowHeight && clientHeight > 400) {
            diffHeight = standardWindowHeight - clientHeight
            e.parentNode.style.paddingBottom = clientHeight + 'px'
            e.style.height = clientHeight + 30 + 'px'
            console.log('clientHeight' + clientHeight)
            console.log('offset' + e.childNodes[1].offsetHeight)
        }
        if(e.offsetHeight >= e.childNodes[1].offsetHeight) {
            
            e.childNodes[1].style.height = e.offsetHeight + 'px'
            e.childNodes[1].style.width = 'auto'
        } else {
            e.childNodes[1].style.width = e.offsetWidth + 'px'
            e.childNodes[1].style.height = 'auto'
        }
    })
}

window.onload = function() {

    document.getElementById("intro-video").play();
    setImages()

}

window.onresize = function () {

    setImages()
}

document.addEventListener('mouseover', function (e) {

    const target1 = e.target.offsetParent
    const target2 = e.target.offsetParent.offsetParent

    if(getQueryVariable('action') !== 'open') {
        if (/column-12/.test(target1.className) || /column-12/.test(target2.className)) {

            if(/hover-over/.test(currentContainer.className)) {
                currentContainer.classList.remove('hover-over')
            }

            currentContainer = /column-12/.test(target1.className) ? target1 : target2
            
            if(!/hover-over/.test(currentContainer.className) && !/animation/.test(currentContainer.className)) {
                currentContainer.classList.add('hover-over') 
            }

            if(/animation/.test(currentContainer.className) && !/hover-over-animation/.test(currentContainer.className)) {
                currentContainer.classList.add('hover-over-animation') 
            }

            if(/hover-over-animation/.test(currentContainer.className)) {
                currentContainer.classList.remove('hover-over-animation') 
            }

        }
    }
})

document.addEventListener('click', function (e)  {
    var open = /open/.test(e.target.className)
    var close = /close/.test(e.target.className)
    var sponsor = /iAmSponsor/.test(e.target.id)
    var prospect = /iAmProspect/.test(e.target.id)
    var menu = /menu/.test(e.target.className)
    console.log(open)
    var body = document.body
    var html = document.documentElement
    if(open || close) {
        function suffix (open) {
            return open ? 'yes' : 'no'
        }
        var elementID = e.target.className.match(/slider-\d*/);
        if (elementID) {
            console.log("elementID: " + elementID)
            var slider = document.getElementById(elementID[0])
            var container = document.getElementById(slider.getAttribute('id').replace('slider', 'container'))
            slider.className = slider.className.replace('hidden-' + suffix(open), 'hidden-' + suffix(!open))
            if (close) {
               // body.scrollTop = container.offsetTop - 60
            }
            var action = open ? 'open' : 'close'
            history.pushState({state:1}, "Information", "?action=" + action + "#" + slider.getAttribute('id'));
            body.className = body.className.replace('scroll-' + suffix(open), 'scroll-' + suffix(!open))
            html.className = html.className.replace('scroll-' + suffix(open), 'scroll-' + suffix(!open))
        }
    }
    if(menu) {
        
    }

    if(sponsor) {
        setCookie('group', 'spon', 180)
        location.reload();
    }

    if(prospect) {
        setCookie('group', 'prospect', 180)
        location.reload();
    }

}, false)

window.addEventListener("hashchange", function (e) {

}, false);

// then...
// var giveMeSomeEvents = true; // or false
// slider.rangeSlider.update({min : 0, max : 20, step : 0.5, value : 1.5, buffer : 70}, giveMeSomeEvents);
