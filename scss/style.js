require('./fonts/gillsans_extrabold.eot')
require('./fonts/gillsans_extrabold.ttf')
require('./fonts/gillsans_extrabold.woff')
require('./fonts/gillsans_extrabold.woff2')
require('./fonts/latolight.woff')
require('./fonts/latolight.woff2')
require('./style.scss');

var vid = document.getElementById("intro-video");
vid.playbackRate = 0.6;

var vers = window.location.search.match(/([a-z]*\=[a-z]*)/)

console.log(vers)