require('normalize.css')
require('./scss/style.js')
require('./images')
import { getQueryVariable, getElementDimensions, setImages, lazyLoadImage } from './js/helpers'

let currentContainer = ''
let documentDimensions = {}

let boxes = document.getElementsByClassName('box')
let activeElement = {}
let activeMode = ''

let lastMove = 0;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

documentDimensions = getElementDimensions(document.documentElement)
if (documentDimensions.width > 375) {
    let img = document.getElementById("intro-video")
    let video = img.nextElementSibling

    video.oncanplay = function() {
        video.style.visibility = 'visible'
        video.style.display = 'block'
        img.style.visibility = 'hidden'
        img.style.display = 'none'
        video.play();
        video.playbackRate = 0.5
    }
}

window.onload = function() {

    setImages()

}

window.onresize = function () {

    setImages()
}


document.body.addEventListener('scroll', function(e) {
    // do nothing if last move was less than 40 ms ago
    if(Date.now() - lastMove > 200) {
        // Do stuff



        lastMove = Date.now();
    } 
}, false);


Array.prototype.forEach.call(boxes, function(e) {
    e.addEventListener('mouseenter', function(event) {

        let mode = /animation/.test(event.target.className) ? 'hover-animation' : 'hover-over'

        if (Object.keys(activeElement).length === 0 && activeElement.constructor === Object) {
            activeElement = event.target
            activeMode = mode
            activeElement.classList.add(mode)
        } else {
            activeElement.classList.remove(activeMode)
            activeElement = event.target
            activeElement.classList.add(mode)
            activeMode = mode
        }
    })
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
