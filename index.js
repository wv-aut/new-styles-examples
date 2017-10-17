require('normalize.css')
require('./scss/style.js')
require('./images')
import LazyLoad from 'vanilla-lazyload'
import { getQueryVariable, getElementDimensions, setImages, lazyLoadImage } from './js/helpers'

var myLazyLoad = new LazyLoad()

let currentContainer = ''
let documentDimensions = {}

let boxes = document.getElementsByClassName('box')
let activeElement = {}
let activeMode = ''

let lastMove = 0;

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
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
        console.log(window.innerHeight)
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
    let open = /open/.test(e.target.className) 
    let close = /close/.test(e.target.className)
    if(open || close) {
        console.log('Click')
        e.preventDefault()
    }
    let openBackButton = false
    let closeBackButton = false
    if (e.target.location != null){
        var target = e.target.location.search.replace('?info=', '')
        if (target) {
            openBackButton = true
            open = true
        } else {
            closeBackButton = true
            close = true
        }
    }
    let sponsor = /iAmSponsor/.test(e.target.id)
    let prospect = /iAmProspect/.test(e.target.id)
    let menu = /menu/.test(e.target.className)
    let body = document.body
    let html = document.documentElement
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