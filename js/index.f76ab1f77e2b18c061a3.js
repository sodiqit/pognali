!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){"use strict";function i(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}n.d(e,"a",(function(){return a}));var a=function(){function t(e,n){var r=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};o(this,t),this._el=i(e),this._animation=n,this._options=a,this._animatesEnd=[],this._options&&(this._animateSettings={timing:{linear:function(t){return t},ease:function(t){return Math.pow(t,2)}}}),this._checkHandlerBind=this._checkHandler.bind(this),this._checkEl(),this._el.forEach((function(t){t.style[r._options.prop]=r._options.from}))}var e,n,a;return e=t,(n=[{key:"_checkEl",value:function(){for(var t=this,e=this._el.map((function(e){return t._watcher(e)})),n=0;n<this._el.length;n++)e[n]&&(this._options.custom?this._animate(this._el[n],n):this._bindAnimation(this._el[n]));this.animateEnd||this._checkCoord()}},{key:"_bindAnimation",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!t)throw new Error("el not defined");if(t.classList.add(this._animation),!this._animatesEnd[e]){var n={index:e,end:!0};this._animatesEnd[n.index]=n}}},{key:"_watcher",value:function(t){var e=window.pageYOffset+t.getBoundingClientRect().top,n=window.pageYOffset+t.getBoundingClientRect().bottom,i=window.scrollX+t.getBoundingClientRect().left,o=window.scrollX+t.getBoundingClientRect().right,r=window.pageYOffset,a=window.pageXOffset,s=window.pageXOffset+document.documentElement.clientWidth,c=window.pageYOffset+document.documentElement.clientHeight;return n>r&&e<c&&o>a&&i<s}},{key:"_unBindHandler",value:function(){var t=this;this.animateEnd&&(this._el.forEach((function(e){e.style[t._options.prop]=t._options.to})),this._animation&&setTimeout((function(){return t._el.forEach((function(e){return e.classList.remove(t._animation)}))}),this._options.duration+500),window.removeEventListener("scroll",this._checkHandlerBind),console.log("removed"))}},{key:"_checkHandler",value:function(){var t=this;this._el.forEach((function(e,n){t._options.custom?t._watcher(e)&&t._animate(e,n):t._watcher(e)&&t._bindAnimation(e,n)})),this._unBindHandler()}},{key:"_checkCoord",value:function(){window.addEventListener("scroll",this._checkHandlerBind)}},{key:"_animate",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._el,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!this._animatesEnd[n]){this._animatesEnd[n]={index:n,end:!0};var i=performance.now(),o=function o(r){var a=(r-i)/t._options.duration;a>1&&(a=1);var s=t._animateSettings.timing[t._options.timing](a);t._options.draw(e,s,n),a<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}}},{key:"animateEnd",get:function(){return this._el.length===this._animatesEnd.length&&void 0!==this._animatesEnd[0]}}])&&r(e.prototype,n),a&&r(e,a),t}()},,function(t,e,n){"use strict";n.r(e);n(3);var i=n(0),o=document.querySelector(".open-button"),r=document.querySelector(".menu"),a=document.querySelector(".modal"),s=document.querySelector(".open-modal"),c=document.querySelector(".close-modal");document.documentElement.clientWidth<=1320&&(r.style.opacity=0),r.classList.remove("menu--no-js"),a.classList.remove("modal--no-js"),a.classList.add("modal--closed"),o.addEventListener("click",(function(){o.classList.toggle("open-button--opened"),r.classList.toggle("menu--opened"),r.style.opacity=1})),s.addEventListener("click",(function(t){t.preventDefault(),a.classList.remove("modal--closed"),a.classList.add("modal--opened")})),c.addEventListener("click",(function(t){t.preventDefault(),a.classList.remove("modal--opened"),a.classList.add("modal--closed")}));new i.a(document.querySelectorAll(".level-ring"),"",{custom:!0,from:177,to:[Math.abs(Math.round(177-175.23)),Math.abs(Math.round(177-141.6)),Math.abs(Math.round(88.5))],draw:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;t.style[this.prop]=Math.max(Math.floor(this.from-e*this.from),this.to[n])},duration:1e3,timing:"linear",prop:"strokeDashoffset"}),new i.a(document.querySelectorAll(".directions__list__item"),"direction-card--animation",{from:0,to:1,duration:1e3,prop:"opacity"})},function(t,e,n){}]);