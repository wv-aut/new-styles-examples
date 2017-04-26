require('normalize.css')
require('./scss/style.js')
require('./images')
var rangeSlider = require('rangeslider-pure')

document.addEventListener('click', function (e)  {
    var open = /btn-primary/.test(e.target.className)
    var close = /close/.test(e.target.className)
    var body = document.body
    var html = document.documentElement
    if(open || close) {
        function suffix (open) {
            return open ? 'yes' : 'no'
        }
        var elementID = e.target.className.match(/slider-\d*/);
        if (elementID) {
            var slider = document.getElementById(elementID[0])
            var container = document.getElementById(slider.getAttribute('id').replace('slider', 'container'))
            slider.className = slider.className.replace('hidden-' + suffix(open), 'hidden-' + suffix(!open))
            if (close) {
                body.scrollTop = container.offsetTop - 60
            }
            var action = open ? 'open' : 'close'
            history.pushState({state:1}, "Information", "?action=" + action + "#" + slider.getAttribute('id'));
            body.className = body.className.replace('scroll-' + suffix(open), 'scroll-' + suffix(!open))
            html.className = html.className.replace('scroll-' + suffix(open), 'scroll-' + suffix(!open))
        }
    }
}, true)

window.addEventListener("hashchange", function (e) {

}, false);

// Change values with slider

var sliderElements = document.querySelectorAll('[data-donationSlider]')
var inputElements = document.querySelectorAll('[data-donationInput]')

function valueOutput(element) {
    var value = element.value,
        output = element.parentNode.parentNode.parentNode.querySelectorAll('[data-donationInput]')[0]
        output.value = value
}

function sliderChange(element) {
    var value = element.value,
        slider = element.parentNode.parentNode.parentNode.querySelectorAll('[data-donationSlider]')[0]
        slider.value = value
        if (value.length > 1) {
            slider.dispatchEvent(new Event('change'));
        }
}

for (var i = inputElements.length - 1; i >= 0; i--) {
    sliderChange(inputElements[i])
}

for (var i = sliderElements.length - 1; i >= 0; i--) {
    valueOutput(sliderElements[i])
}

Array.prototype.slice.call(document.querySelectorAll('input[type="range"]')).forEach(function (el) {
    el.addEventListener('input', function (e) {
        valueOutput(e.target)
    }, false)
})

Array.prototype.slice.call(document.querySelectorAll('input[type="number"]')).forEach(function (el) {
    el.addEventListener('input', function (e) {
            sliderChange(e.target)
        }, false)
    el.addEventListener('blur', function (e) {
            sliderChange(e.target, e)
    }, false)
})

// Initialize a new plugin instance for element or array of elements.
var slider = document.querySelectorAll('input[type="range"]');
rangeSlider.create(slider, {
    polyfill: true,     // Boolean, if true, custom markup will be created
    rangeClass: 'rangeSlider',
    disabledClass: 'rangeSlider--disabled',
    fillClass: 'rangeSlider__fill',
    bufferClass: 'rangeSlider__buffer',
    handleClass: 'rangeSlider__handle',
    startEvent: ['mousedown', 'touchstart', 'pointerdown'],
    moveEvent: ['mousemove', 'touchmove', 'pointermove'],
    endEvent: ['mouseup', 'touchend', 'pointerup'],
    min: null,          // Number , 0
    max: null,          // Number, 100
    step: 10,         // Number, 10
    value: null,        // Number, center of slider
    buffer: null,       // Number, in percent, 0 by default
    stick: null,        // [Number stickTo, Number stickRadius] : use it if handle should stick to stickTo-th value in stickRadius
    borderRadius: null,    // Number, if you use buffer + border-radius in css for looks good,
    onInit: function () {
        console.info('onInit')
    },
    onSlideStart: function (position, value) {
        console.info('onSlideStart', 'position: ' + position, 'value: ' + value)
    },
    onSlide: function (position, value) {
        console.log('onSlide', 'position: ' + position, 'value: ' + value)
    },
    onSlideEnd: function (position, value) {
        console.warn('onSlideEnd', 'position: ' + position, 'value: ' + value)
    }
});

// then...
// var giveMeSomeEvents = true; // or false
// slider.rangeSlider.update({min : 0, max : 20, step : 0.5, value : 1.5, buffer : 70}, giveMeSomeEvents);
