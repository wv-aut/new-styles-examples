!function(t){function e(o){if(n[o])return n[o].exports;var s=n[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/sites/worldvision.at/modules/wv_homepage_fy18/dist/",e(e.s=5)}([function(t,e,n){"use strict";n(8),n(13),n(14),n(15),n(16),n(9),n(10),n(11),n(12),n(7),n(24),n(23),n(25),n(26)},function(t,e,n){"use strict";function o(t){return t.getBoundingClientRect()}Object.defineProperty(e,"__esModule",{value:!0}),e.getQueryVariable=function(t){for(var e=window.location.search.substring(1).split("&"),n=0;n<e.length;n++){var o=e[n].split("=");if(o[0]==t)return o[1]}},e.getElementDimensions=o,e.lazyLoadImage=function(t){},e.setImages=function(){var t=document.getElementsByClassName("container-image");Math.max(document.documentElement.clientHeight,window.innerHeight||0);Array.prototype.forEach.call(t,function(t,e,n){o(t).height>=t.children[0].offsetHeight?(t.children[0].style.height=t.offsetHeight+"px",t.children[0].style.width="auto"):(t.children[0].style.width=t.offsetWidth+"px",t.children[0].style.height="auto")})},e.test=function(){console.log("adflkajdfljfdsa")}},function(t,e,n){"use strict";n(17),n(18),n(19),n(20),n(21),n(22),n(6),document.getElementById("intro-video").playbackRate=.6;var o=window.location.search.match(/([a-z]*\=[a-z]*)/);console.log(o)},function(t,e){},function(t,e,n){var o,s,r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(r,a){"object"===i(e)&&void 0!==t?t.exports=a():(o=a,void 0!==(s="function"==typeof o?o.call(e,n,e,t):o)&&(t.exports=s))}(0,function(){"use strict";var t={elements_selector:"img",container:document,threshold:300,data_src:"src",data_srcset:"srcset",class_loading:"loading",class_loaded:"loaded",class_error:"error",callback_load:null,callback_error:null,callback_set:null},e=function(t,e){return t.getAttribute("data-"+e)},n=function(t,e,n){return t.setAttribute("data-"+e,n)},o=function(t){return t.filter(function(t){return!e(t,"was-processed")})},s=function(t,e){var n=new t(e),o=new CustomEvent("LazyLoad::Initialized",{detail:{instance:n}});window.dispatchEvent(o)},i=function(t,n){var o=n.data_srcset,s=t.parentElement;if("PICTURE"===s.tagName)for(var r,i=0;r=s.children[i];i+=1)if("SOURCE"===r.tagName){var a=e(r,o);a&&r.setAttribute("srcset",a)}},a=function(t,n){var o=n.data_src,s=n.data_srcset,r=t.tagName,a=e(t,o);if("IMG"===r){i(t,n);var c=e(t,s);return c&&t.setAttribute("srcset",c),void(a&&t.setAttribute("src",a))}"IFRAME"!==r?a&&(t.style.backgroundImage='url("'+a+'")'):a&&t.setAttribute("src",a)},c=!!document.body.classList,l=function(t,e){c?t.classList.add(e):t.className+=(t.className?" ":"")+e},u=function(t,e){c?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},f=function(t,e){t&&t(e)},d=function(t,e,n){t.removeEventListener("load",e),t.removeEventListener("error",n)},m=function(t,e){var n=function n(s){g(s,!0,e),d(t,n,o)},o=function o(s){g(s,!1,e),d(t,n,o)};t.addEventListener("load",n),t.addEventListener("error",o)},g=function(t,e,n){var o=t.target;u(o,n.class_loading),l(o,e?n.class_loaded:n.class_error),f(e?n.callback_load:n.callback_error,o)},p=function(t,e){["IMG","IFRAME"].indexOf(t.tagName)>-1&&(m(t,e),l(t,e.class_loading)),a(t,e),n(t,"was-processed",!0),f(e.callback_set,t)},v=function(e,n){this._settings=r({},t,e),this._setObserver(),this.update(n)};v.prototype={_setObserver:function(){var t=this;if("IntersectionObserver"in window){var e=this._settings;this._observer=new IntersectionObserver(function(n){n.forEach(function(n){if(n.intersectionRatio>0){var o=n.target;p(o,e),t._observer.unobserve(o)}}),t._elements=o(t._elements)},{root:e.container===document?null:e.container,rootMargin:e.threshold+"px"})}},update:function(t){var e=this,n=this._settings,s=t||n.container.querySelectorAll(n.elements_selector);this._elements=o(Array.prototype.slice.call(s)),this._observer?this._elements.forEach(function(t){e._observer.observe(t)}):(this._elements.forEach(function(t){p(t,n)}),this._elements=o(this._elements))},destroy:function(){var t=this;this._observer&&(o(this._elements).forEach(function(e){t._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null}};var h=window.lazyLoadOptions;return h&&function(t,e){if(e.length)for(var n,o=0;n=e[o];o+=1)s(t,n);else s(t,e)}(v,h),v})},function(t,e,n){"use strict";function o(t,e,n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var s="expires="+o.toUTCString();document.cookie=t+"="+e+";"+s+";path=/"}function s(t){var e=/open/.test(t.target.className),n=/close/.test(t.target.className);(e||n)&&(console.log("Click"),t.preventDefault());null!=t.target.location&&(t.target.location.search.replace("?info=","")?(!0,e=!0):(!0,n=!0));var s=/iAmSponsor/.test(t.target.id),r=/iAmProspect/.test(t.target.id),i=(/menu/.test(t.target.className),document.body),a=document.documentElement;if(e||n){var c=function(t){return t?"yes":"no"};if(t.target.className){var l=t.target.className.match(/slider-\d*/)[0],u=document.getElementById(l);document.getElementById(u.getAttribute("id").replace("slider","container"));u.className=u.className.replace("hidden-"+c(e),"hidden-"+c(!e))}else(u=document.getElementsByClassName("hidden-no")[0]).className=u.className.replace("hidden-"+c(e),"hidden-"+c(!e));window.history.pushState({lastHistory:u.getAttribute("id")},u.getAttribute("id"),e?"?infos="+u.getAttribute("id"):"/"),i.className=i.className.replace("scroll-"+c(e),"scroll-"+c(!e)),a.className=a.className.replace("scroll-"+c(e),"scroll-"+c(!e))}s&&(o("group","spon",180),location.reload()),r&&(o("group","prospect",180),location.reload())}var r=function(t){return t&&t.__esModule?t:{default:t}}(n(4)),i=n(1);n(3),n(2),n(0);new r.default;var a=document.getElementsByClassName("box"),c={},l="",u=0;if((0,i.getElementDimensions)(document.documentElement).width>375){var f=document.getElementById("intro-video"),d=f.nextElementSibling;d.oncanplay=function(){d.style.visibility="visible",d.style.display="block",f.style.visibility="hidden",f.style.display="none",d.play(),d.playbackRate=.5}}window.onload=function(){(0,i.setImages)()},window.onresize=function(){(0,i.setImages)()},document.body.addEventListener("scroll",function(t){Date.now()-u>200&&(console.log(window.innerHeight),u=Date.now())},!1),Array.prototype.forEach.call(a,function(t){t.addEventListener("mouseenter",function(t){var e=/animation/.test(t.target.className)?"hover-animation":"hover-over";0===Object.keys(c).length&&c.constructor===Object?(c=t.target,l=e,c.classList.add(e)):(c.classList.remove(l),(c=t.target).classList.add(e),l=e)})}),document.addEventListener("click",s,!1),window.addEventListener("popstate",s)},function(t,e){},function(t,e){t.exports="fontsclose_w.svg"},function(t,e){t.exports="fontsfacebook_icon.svg"},function(t,e){t.exports="fontsicon_1.svg"},function(t,e){t.exports="fontsicon_2.svg"},function(t,e){t.exports="fontsicon_3.svg"},function(t,e){t.exports="fontsicon_4.svg"},function(t,e){t.exports="fontsicon_smiley.svg"},function(t,e){t.exports="fontsicon_transparent-smiley.svg"},function(t,e){t.exports="fontswv-beacon.svg"},function(t,e){t.exports="fontswv-logo-new.svg"},function(t,e){t.exports="fontsgillsans_extrabold.eot"},function(t,e){t.exports="fontsgillsans_extrabold.ttf"},function(t,e){t.exports="fontsgillsans_extrabold.woff"},function(t,e){t.exports="fontsgillsans_extrabold.woff2"},function(t,e){t.exports="fontslatolight.woff"},function(t,e){t.exports="fontslatolight.woff2"},function(t,e){t.exports="fontsfacebook.jpg"},function(t,e){t.exports="fontssand_background.png"},function(t,e){t.exports="fontstwitter.jpg"},function(t,e){t.exports="fontsyoutube.jpg"}]);