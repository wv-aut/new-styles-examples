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
    console.log(window.history.state)
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

function managePages (e) {
    e.preventDefault()
    console.log('e.target.className' + e.target.className)
    if (e.target.location != null){
        var target = e.target.location.search.replace('?info=', '')
        if (target) {
            var openBackButton = true
        } else {
            var closeBackButton = true
            console.log('closeclose')
        }
    }
    var open = /open/.test(e.target.className) || openBackButton
    var close = /close/.test(e.target.className) || closeBackButton
    var sponsor = /iAmSponsor/.test(e.target.id)
    var prospect = /iAmProspect/.test(e.target.id)
    var menu = /menu/.test(e.target.className)
    var body = document.body
    var html = document.documentElement
    console.log('open: ' + open)
    console.log('close: ' + close)
    if(open || close) {
        function suffix (open) {
            return open ? 'yes' : 'no'
        }

        if(e.target.className) {
            var documentID = e.target.className.match(/slider-\d*/)[0];
            var slider = document.getElementById(documentID)
            var container = document.getElementById(slider.getAttribute('id').replace('slider', 'container'))
            slider.className = slider.className.replace('hidden-' + suffix(open), 'hidden-' + suffix(!open))
            if (close) {
               // body.scrollTop = container.offsetTop - 60
            }
        } 
        else {
            var slider = document.getElementsByClassName('hidden-no')[0]
            slider.className = slider.className.replace('hidden-' + suffix(open), 'hidden-' + suffix(!open))
            console.log('slider.className' + slider.className)
        }

        
        // if (elementID) {
        //     var slider = document.getElementById(documentID)
        //     var container = document.getElementById(slider.getAttribute('id').replace('slider', 'container'))
        //     slider.className = slider.className.replace('hidden-' + suffix(open), 'hidden-' + suffix(!open))
        //     if (close) {
        //        // body.scrollTop = container.offsetTop - 60
        //     }
        // }

        // if (target)
        var action = open ? 'open' : 'close'
        window.history.pushState({lastHistory:slider.getAttribute('id')}, slider.getAttribute('id'), open ? "?infos=" + slider.getAttribute('id') : '/');
        body.className = body.className.replace('scroll-' + suffix(open), 'scroll-' + suffix(!open))
        html.className = html.className.replace('scroll-' + suffix(open), 'scroll-' + suffix(!open))
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
}

document.addEventListener('click', managePages, false)

window.addEventListener('popstate', managePages);