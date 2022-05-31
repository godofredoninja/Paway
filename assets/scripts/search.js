(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],2:[function(require,module,exports){
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],3:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],4:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],5:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],6:[function(require,module,exports){
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],7:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],8:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles.js");

var iterableToArrayLimit = require("./iterableToArrayLimit.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableRest = require("./nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayWithHoles.js":2,"./iterableToArrayLimit.js":6,"./nonIterableRest.js":7,"./unsupportedIterableToArray.js":9}],9:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":1}],10:[function(require,module,exports){
/*
 FlexSearch v0.6.30
 Copyright 2019 Nextapps GmbH
 Author: Thomas Wilkerling
 Released under the Apache 2.0 Licence
 https://github.com/nextapps-de/flexsearch
*/
'use strict';(function(K,R,w){let L;(L=w.define)&&L.amd?L([],function(){return R}):(L=w.modules)?L[K.toLowerCase()]=R:"object"===typeof exports?module.exports=R:w[K]=R})("FlexSearch",function ma(K){function w(a,c){const b=c?c.id:a&&a.id;this.id=b||0===b?b:na++;this.init(a,c);fa(this,"index",function(){return this.a?Object.keys(this.a.index[this.a.keys[0]].c):Object.keys(this.c)});fa(this,"length",function(){return this.index.length})}function L(a,c,b,d){this.u!==this.g&&(this.o=this.o.concat(b),this.u++,
d&&this.o.length>=d&&(this.u=this.g),this.u===this.g&&(this.cache&&this.j.set(c,this.o),this.F&&this.F(this.o)));return this}function S(a){const c=B();for(const b in a)if(a.hasOwnProperty(b)){const d=a[b];F(d)?c[b]=d.slice(0):G(d)?c[b]=S(d):c[b]=d}return c}function W(a,c){const b=a.length,d=O(c),e=[];for(let f=0,h=0;f<b;f++){const g=a[f];if(d&&c(g)||!d&&!c[g])e[h++]=g}return e}function P(a,c,b,d,e,f,h,g,k,l){b=ha(b,h?0:e,g,f,c,k,l);let p;g&&(g=b.page,p=b.next,b=b.result);if(h)c=this.where(h,null,
e,b);else{c=b;b=this.l;e=c.length;f=Array(e);for(h=0;h<e;h++)f[h]=b[c[h]];c=f}b=c;d&&(O(d)||(M=d.split(":"),1<M.length?d=oa:(M=M[0],d=pa)),b.sort(d));b=T(g,p,b);this.cache&&this.j.set(a,b);return b}function fa(a,c,b){Object.defineProperty(a,c,{get:b})}function r(a){return new RegExp(a,"g")}function Q(a,c){for(let b=0;b<c.length;b+=2)a=a.replace(c[b],c[b+1]);return a}function V(a,c,b,d,e,f,h,g){if(c[b])return c[b];e=e?(g-(h||g/1.5))*f+(h||g/1.5)*e:f;c[b]=e;e>=h&&(a=a[g-(e+.5>>0)],a=a[b]||(a[b]=[]),
a[a.length]=d);return e}function ba(a,c){if(a){const b=Object.keys(a);for(let d=0,e=b.length;d<e;d++){const f=b[d],h=a[f];if(h)for(let g=0,k=h.length;g<k;g++)if(h[g]===c){1===k?delete a[f]:h.splice(g,1);break}else G(h[g])&&ba(h[g],c)}}}function ca(a){let c="",b="";var d="";for(let e=0;e<a.length;e++){const f=a[e];if(f!==b)if(e&&"h"===f){if(d="a"===d||"e"===d||"i"===d||"o"===d||"u"===d||"y"===d,("a"===b||"e"===b||"i"===b||"o"===b||"u"===b||"y"===b)&&d||" "===b)c+=f}else c+=f;d=e===a.length-1?"":a[e+
1];b=f}return c}function qa(a,c){a=a.length-c.length;return 0>a?1:a?-1:0}function pa(a,c){a=a[M];c=c[M];return a<c?-1:a>c?1:0}function oa(a,c){const b=M.length;for(let d=0;d<b;d++)a=a[M[d]],c=c[M[d]];return a<c?-1:a>c?1:0}function T(a,c,b){return a?{page:a,next:c?""+c:null,result:b}:b}function ha(a,c,b,d,e,f,h){let g,k=[];if(!0===b){b="0";var l=""}else l=b&&b.split(":");const p=a.length;if(1<p){const y=B(),t=[];let v,x;var n=0,m;let I;var u=!0;let D,E=0,N,da,X,ea;l&&(2===l.length?(X=l,l=!1):l=ea=
parseInt(l[0],10));if(h){for(v=B();n<p;n++)if("not"===e[n])for(x=a[n],I=x.length,m=0;m<I;m++)v["@"+x[m]]=1;else da=n+1;if(C(da))return T(b,g,k);n=0}else N=J(e)&&e;let Y;for(;n<p;n++){const ra=n===(da||p)-1;if(!N||!n)if((m=N||e&&e[n])&&"and"!==m)if("or"===m)Y=!1;else continue;else Y=f=!0;x=a[n];if(I=x.length){if(u)if(D){var q=D.length;for(m=0;m<q;m++){u=D[m];var A="@"+u;h&&v[A]||(y[A]=1,f||(k[E++]=u))}D=null;u=!1}else{D=x;continue}A=!1;for(m=0;m<I;m++){q=x[m];var z="@"+q;const Z=f?y[z]||0:n;if(!(!Z&&
!d||h&&v[z]||!f&&y[z]))if(Z===n){if(ra){if(!ea||--ea<E)if(k[E++]=q,c&&E===c)return T(b,E+(l||0),k)}else y[z]=n+1;A=!0}else d&&(z=t[Z]||(t[Z]=[]),z[z.length]=q)}if(Y&&!A&&!d)break}else if(Y&&!d)return T(b,g,x)}if(D)if(n=D.length,h)for(m=l?parseInt(l,10):0;m<n;m++)a=D[m],v["@"+a]||(k[E++]=a);else k=D;if(d)for(E=k.length,X?(n=parseInt(X[0],10)+1,m=parseInt(X[1],10)+1):(n=t.length,m=0);n--;)if(q=t[n]){for(I=q.length;m<I;m++)if(d=q[m],!h||!v["@"+d])if(k[E++]=d,c&&E===c)return T(b,n+":"+m,k);m=0}}else!p||
e&&"not"===e[0]||(k=a[0],l&&(l=parseInt(l[0],10)));c&&(h=k.length,l&&l>h&&(l=0),l=l||0,g=l+c,g<h?k=k.slice(l,g):(g=0,l&&(k=k.slice(l))));return T(b,g,k)}function J(a){return"string"===typeof a}function F(a){return a.constructor===Array}function O(a){return"function"===typeof a}function G(a){return"object"===typeof a}function C(a){return"undefined"===typeof a}function ia(a){const c=Array(a);for(let b=0;b<a;b++)c[b]=B();return c}function B(){return Object.create(null)}function sa(){let a,c;self.onmessage=
function(b){if(b=b.data)if(b.search){const d=c.search(b.content,b.threshold?{limit:b.limit,threshold:b.threshold,where:b.where}:b.limit);self.postMessage({id:a,content:b.content,limit:b.limit,result:d})}else b.add?c.add(b.id,b.content):b.update?c.update(b.id,b.content):b.remove?c.remove(b.id):b.clear?c.clear():b.info?(b=c.info(),b.worker=a,console.log(b)):b.register&&(a=b.id,b.options.cache=!1,b.options.async=!1,b.options.worker=!1,c=(new Function(b.register.substring(b.register.indexOf("{")+1,b.register.lastIndexOf("}"))))(),
c=new c(b.options))}}function ta(a,c,b,d){a=K("flexsearch","id"+a,sa,function(f){(f=f.data)&&f.result&&d(f.id,f.content,f.result,f.limit,f.where,f.cursor,f.suggest)},c);const e=ma.toString();b.id=c;a.postMessage({register:e,options:b,id:c});return a}const H={encode:"icase",f:"forward",split:/\W+/,cache:!1,async:!1,g:!1,D:!1,a:!1,b:9,threshold:0,depth:0},ja={memory:{encode:"extra",f:"strict",threshold:0,b:1},speed:{encode:"icase",f:"strict",threshold:1,b:3,depth:2},match:{encode:"extra",f:"full",threshold:1,
b:3},score:{encode:"extra",f:"strict",threshold:1,b:9,depth:4},balance:{encode:"balance",f:"strict",threshold:0,b:3,depth:3},fast:{encode:"icase",f:"strict",threshold:8,b:9,depth:1}},aa=[];let na=0;const ka={},la={};w.create=function(a,c){return new w(a,c)};w.registerMatcher=function(a){for(const c in a)a.hasOwnProperty(c)&&aa.push(r(c),a[c]);return this};w.registerEncoder=function(a,c){U[a]=c.bind(U);return this};w.registerLanguage=function(a,c){ka[a]=c.filter;la[a]=c.stemmer;return this};w.encode=
function(a,c){return U[a](c)};w.prototype.init=function(a,c){this.v=[];if(c){var b=c.preset;a=c}else a||(a=H),b=a.preset;c={};J(a)?(c=ja[a],a={}):b&&(c=ja[b]);if(b=a.worker)if("undefined"===typeof Worker)a.worker=!1,this.m=null;else{var d=parseInt(b,10)||4;this.C=-1;this.u=0;this.o=[];this.F=null;this.m=Array(d);for(var e=0;e<d;e++)this.m[e]=ta(this.id,e,a,L.bind(this))}this.f=a.tokenize||c.f||this.f||H.f;this.split=C(b=a.split)?this.split||H.split:J(b)?r(b):b;this.D=a.rtl||this.D||H.D;this.async=
"undefined"===typeof Promise||C(b=a.async)?this.async||H.async:b;this.g=C(b=a.worker)?this.g||H.g:b;this.threshold=C(b=a.threshold)?c.threshold||this.threshold||H.threshold:b;this.b=C(b=a.resolution)?b=c.b||this.b||H.b:b;b<=this.threshold&&(this.b=this.threshold+1);this.depth="strict"!==this.f||C(b=a.depth)?c.depth||this.depth||H.depth:b;this.w=(b=C(b=a.encode)?c.encode||H.encode:b)&&U[b]&&U[b].bind(U)||(O(b)?b:this.w||!1);(b=a.matcher)&&this.addMatcher(b);if(b=(c=a.lang)||a.filter){J(b)&&(b=ka[b]);
if(F(b)){d=this.w;e=B();for(var f=0;f<b.length;f++){var h=d?d(b[f]):b[f];e[h]=1}b=e}this.filter=b}if(b=c||a.stemmer){var g;c=J(b)?la[b]:b;d=this.w;e=[];for(g in c)c.hasOwnProperty(g)&&(f=d?d(g):g,e.push(r(f+"($|\\W)"),d?d(c[g]):c[g]));this.stemmer=g=e}this.a=e=(b=a.doc)?S(b):this.a||H.a;this.i=ia(this.b-(this.threshold||0));this.h=B();this.c=B();if(e){this.l=B();a.doc=null;g=e.index={};c=e.keys=[];d=e.field;f=e.tag;h=e.store;F(e.id)||(e.id=e.id.split(":"));if(h){var k=B();if(J(h))k[h]=1;else if(F(h))for(let l=
0;l<h.length;l++)k[h[l]]=1;else G(h)&&(k=h);e.store=k}if(f){this.G=B();h=B();if(d)if(J(d))h[d]=a;else if(F(d))for(k=0;k<d.length;k++)h[d[k]]=a;else G(d)&&(h=d);F(f)||(e.tag=f=[f]);for(d=0;d<f.length;d++)this.G[f[d]]=B();this.I=f;d=h}if(d){let l;F(d)||(G(d)?(l=d,e.field=d=Object.keys(d)):e.field=d=[d]);for(e=0;e<d.length;e++)f=d[e],F(f)||(l&&(a=l[f]),c[e]=f,d[e]=f.split(":")),g[f]=new w(a)}a.doc=b}this.B=!0;this.j=(this.cache=b=C(b=a.cache)?this.cache||H.cache:b)?new ua(b):!1;return this};w.prototype.encode=
function(a){a&&(aa.length&&(a=Q(a,aa)),this.v.length&&(a=Q(a,this.v)),this.w&&(a=this.w(a)),this.stemmer&&(a=Q(a,this.stemmer)));return a};w.prototype.addMatcher=function(a){const c=this.v;for(const b in a)a.hasOwnProperty(b)&&c.push(r(b),a[b]);return this};w.prototype.add=function(a,c,b,d,e){if(this.a&&G(a))return this.A("add",a,c);if(c&&J(c)&&(a||0===a)){var f="@"+a;if(this.c[f]&&!d)return this.update(a,c);if(this.g)return++this.C>=this.m.length&&(this.C=0),this.m[this.C].postMessage({add:!0,id:a,
content:c}),this.c[f]=""+this.C,b&&b(),this;if(!e){if(this.async&&"function"!==typeof importScripts){let t=this;f=new Promise(function(v){setTimeout(function(){t.add(a,c,null,d,!0);t=null;v()})});if(b)f.then(b);else return f;return this}if(b)return this.add(a,c,null,d,!0),b(),this}c=this.encode(c);if(!c.length)return this;b=this.f;e=O(b)?b(c):c.split(this.split);this.filter&&(e=W(e,this.filter));const n=B();n._ctx=B();const m=e.length,u=this.threshold,q=this.depth,A=this.b,z=this.i,y=this.D;for(let t=
0;t<m;t++){var h=e[t];if(h){var g=h.length,k=(y?t+1:m-t)/m,l="";switch(b){case "reverse":case "both":for(var p=g;--p;)l=h[p]+l,V(z,n,l,a,y?1:(g-p)/g,k,u,A-1);l="";case "forward":for(p=0;p<g;p++)l+=h[p],V(z,n,l,a,y?(p+1)/g:1,k,u,A-1);break;case "full":for(p=0;p<g;p++){const v=(y?p+1:g-p)/g;for(let x=g;x>p;x--)l=h.substring(p,x),V(z,n,l,a,v,k,u,A-1)}break;default:if(g=V(z,n,h,a,1,k,u,A-1),q&&1<m&&g>=u)for(g=n._ctx[h]||(n._ctx[h]=B()),h=this.h[h]||(this.h[h]=ia(A-(u||0))),k=t-q,l=t+q+1,0>k&&(k=0),l>
m&&(l=m);k<l;k++)k!==t&&V(h,g,e[k],a,0,A-(k<t?t-k:k-t),u,A-1)}}}this.c[f]=1;this.B=!1}return this};w.prototype.A=function(a,c,b){if(F(c)){var d=c.length;if(d--){for(var e=0;e<d;e++)this.A(a,c[e]);return this.A(a,c[d],b)}}else{var f=this.a.index,h=this.a.keys,g=this.a.tag;e=this.a.store;var k;var l=this.a.id;d=c;for(var p=0;p<l.length;p++)d=d[l[p]];if("remove"===a&&(delete this.l[d],l=h.length,l--)){for(c=0;c<l;c++)f[h[c]].remove(d);return f[h[l]].remove(d,b)}if(g){for(k=0;k<g.length;k++){var n=g[k];
var m=c;l=n.split(":");for(p=0;p<l.length;p++)m=m[l[p]];m="@"+m}k=this.G[n];k=k[m]||(k[m]=[])}l=this.a.field;for(let u=0,q=l.length;u<q;u++){n=l[u];g=c;for(m=0;m<n.length;m++)g=g[n[m]];n=f[h[u]];m="add"===a?n.add:n.update;u===q-1?m.call(n,d,g,b):m.call(n,d,g)}if(e){b=Object.keys(e);a=B();for(f=0;f<b.length;f++)if(h=b[f],e[h]){h=h.split(":");let u,q;for(l=0;l<h.length;l++)g=h[l],u=(u||c)[g],q=(q||a)[g]=u}c=a}k&&(k[k.length]=c);this.l[d]=c}return this};w.prototype.update=function(a,c,b){if(this.a&&
G(a))return this.A("update",a,c);this.c["@"+a]&&J(c)&&(this.remove(a),this.add(a,c,b,!0));return this};w.prototype.remove=function(a,c,b){if(this.a&&G(a))return this.A("remove",a,c);var d="@"+a;if(this.c[d]){if(this.g)return this.m[this.c[d]].postMessage({remove:!0,id:a}),delete this.c[d],c&&c(),this;if(!b){if(this.async&&"function"!==typeof importScripts){let e=this;d=new Promise(function(f){setTimeout(function(){e.remove(a,null,!0);e=null;f()})});if(c)d.then(c);else return d;return this}if(c)return this.remove(a,
null,!0),c(),this}for(c=0;c<this.b-(this.threshold||0);c++)ba(this.i[c],a);this.depth&&ba(this.h,a);delete this.c[d];this.B=!1}return this};let M;w.prototype.search=function(a,c,b,d){if(G(c)){if(F(c))for(var e=0;e<c.length;e++)c[e].query=a;else c.query=a;a=c;c=1E3}else c&&O(c)?(b=c,c=1E3):c||0===c||(c=1E3);if(this.g){this.F=b;this.u=0;this.o=[];for(var f=0;f<this.g;f++)this.m[f].postMessage({search:!0,limit:c,content:a})}else{var h=[],g=a;if(G(a)&&!F(a)){b||(b=a.callback)&&(g.callback=null);var k=
a.sort;var l=a.page;c=a.limit;f=a.threshold;var p=a.suggest;a=a.query}if(this.a){f=this.a.index;const y=g.where;var n=g.bool||"or",m=g.field;let t=n;let v,x;if(m)F(m)||(m=[m]);else if(F(g)){var u=g;m=[];t=[];for(var q=0;q<g.length;q++)d=g[q],e=d.bool||n,m[q]=d.field,t[q]=e,"not"===e?v=!0:"and"===e&&(x=!0)}else m=this.a.keys;n=m.length;for(q=0;q<n;q++)u&&(g=u[q]),l&&!J(g)&&(g.page=null,g.limit=0),h[q]=f[m[q]].search(g,0);if(b)return b(P.call(this,a,t,h,k,c,p,y,l,x,v));if(this.async){const I=this;return new Promise(function(D){Promise.all(h).then(function(E){D(P.call(I,
a,t,E,k,c,p,y,l,x,v))})})}return P.call(this,a,t,h,k,c,p,y,l,x,v)}f||(f=this.threshold||0);if(!d){if(this.async&&"function"!==typeof importScripts){let y=this;f=new Promise(function(t){setTimeout(function(){t(y.search(g,c,null,!0));y=null})});if(b)f.then(b);else return f;return this}if(b)return b(this.search(g,c,null,!0)),this}if(!a||!J(a))return h;g=a;if(this.cache)if(this.B){if(b=this.j.get(a))return b}else this.j.clear(),this.B=!0;g=this.encode(g);if(!g.length)return h;b=this.f;b=O(b)?b(g):g.split(this.split);
this.filter&&(b=W(b,this.filter));u=b.length;d=!0;e=[];var A=B(),z=0;1<u&&(this.depth&&"strict"===this.f?n=!0:b.sort(qa));if(!n||(q=this.h)){const y=this.b;for(;z<u;z++){let t=b[z];if(t){if(n){if(!m)if(q[t])m=t,A[t]=1;else if(!p)return h;if(p&&z===u-1&&!e.length)n=!1,t=m||t,A[t]=0;else if(!m)continue}if(!A[t]){const v=[];let x=!1,I=0;const D=n?q[m]:this.i;if(D){let E;for(let N=0;N<y-f;N++)if(E=D[N]&&D[N][t])v[I++]=E,x=!0}if(x)m=t,e[e.length]=1<I?v.concat.apply([],v):v[0];else if(!p){d=!1;break}A[t]=
1}}}}else d=!1;d&&(h=ha(e,c,l,p));this.cache&&this.j.set(a,h);return h}};w.prototype.find=function(a,c){return this.where(a,c,1)[0]||null};w.prototype.where=function(a,c,b,d){const e=this.l,f=[];let h=0;let g;var k;let l;if(G(a)){b||(b=c);var p=Object.keys(a);var n=p.length;g=!1;if(1===n&&"id"===p[0])return[e[a.id]];if((k=this.I)&&!d)for(var m=0;m<k.length;m++){var u=k[m],q=a[u];if(!C(q)){l=this.G[u]["@"+q];if(0===--n)return l;p.splice(p.indexOf(u),1);delete a[u];break}}k=Array(n);for(m=0;m<n;m++)k[m]=
p[m].split(":")}else{if(O(a)){c=d||Object.keys(e);b=c.length;for(p=0;p<b;p++)n=e[c[p]],a(n)&&(f[h++]=n);return f}if(C(c))return[e[a]];if("id"===a)return[e[c]];p=[a];n=1;k=[a.split(":")];g=!0}d=l||d||Object.keys(e);m=d.length;for(u=0;u<m;u++){q=l?d[u]:e[d[u]];let A=!0;for(let z=0;z<n;z++){g||(c=a[p[z]]);const y=k[z],t=y.length;let v=q;if(1<t)for(let x=0;x<t;x++)v=v[y[x]];else v=v[y[0]];if(v!==c){A=!1;break}}if(A&&(f[h++]=q,b&&h===b))break}return f};w.prototype.info=function(){if(this.g)for(let a=0;a<
this.g;a++)this.m[a].postMessage({info:!0,id:this.id});else return{id:this.id,items:this.length,cache:this.cache&&this.cache.s?this.cache.s.length:!1,matcher:aa.length+(this.v?this.v.length:0),worker:this.g,threshold:this.threshold,depth:this.depth,resolution:this.b,contextual:this.depth&&"strict"===this.f}};w.prototype.clear=function(){return this.destroy().init()};w.prototype.destroy=function(){this.cache&&(this.j.clear(),this.j=null);this.i=this.h=this.c=null;if(this.a){const a=this.a.keys;for(let c=
0;c<a.length;c++)this.a.index[a[c]].destroy();this.a=this.l=null}return this};w.prototype.export=function(a){const c=!a||C(a.serialize)||a.serialize;if(this.a){const d=!a||C(a.doc)||a.doc;var b=!a||C(a.index)||a.index;a=[];let e=0;if(b)for(b=this.a.keys;e<b.length;e++){const f=this.a.index[b[e]];a[e]=[f.i,f.h,Object.keys(f.c)]}d&&(a[e]=this.l)}else a=[this.i,this.h,Object.keys(this.c)];c&&(a=JSON.stringify(a));return a};w.prototype.import=function(a,c){if(!c||C(c.serialize)||c.serialize)a=JSON.parse(a);
const b=B();if(this.a){var d=!c||C(c.doc)||c.doc,e=0;if(!c||C(c.index)||c.index){c=this.a.keys;const h=c.length;for(var f=a[0][2];e<f.length;e++)b[f[e]]=1;for(e=0;e<h;e++){f=this.a.index[c[e]];const g=a[e];g&&(f.i=g[0],f.h=g[1],f.c=b)}}d&&(this.l=G(d)?d:a[e])}else{d=a[2];for(e=0;e<d.length;e++)b[d[e]]=1;this.i=a[0];this.h=a[1];this.c=b}};const va=function(){const a=r("\\s+"),c=r("[^a-z0-9 ]"),b=[r("[-/]")," ",c,"",a," "];return function(d){return ca(Q(d.toLowerCase(),b))}}(),U={icase:function(a){return a.toLowerCase()},
simple:function(){const a=r("\\s+"),c=r("[^a-z0-9 ]"),b=r("[-/]"),d=r("[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]"),e=r("[\u00e8\u00e9\u00ea\u00eb]"),f=r("[\u00ec\u00ed\u00ee\u00ef]"),h=r("[\u00f2\u00f3\u00f4\u00f5\u00f6\u0151]"),g=r("[\u00f9\u00fa\u00fb\u00fc\u0171]"),k=r("[\u00fd\u0177\u00ff]"),l=r("\u00f1"),p=r("[\u00e7c]"),n=r("\u00df"),m=r(" & "),u=[d,"a",e,"e",f,"i",h,"o",g,"u",k,"y",l,"n",p,"k",n,"s",m," and ",b," ",c,"",a," "];return function(q){q=Q(q.toLowerCase(),u);return" "===q?"":q}}(),advanced:function(){const a=
r("ae"),c=r("ai"),b=r("ay"),d=r("ey"),e=r("oe"),f=r("ue"),h=r("ie"),g=r("sz"),k=r("zs"),l=r("ck"),p=r("cc"),n=r("sh"),m=r("th"),u=r("dt"),q=r("ph"),A=r("pf"),z=r("ou"),y=r("uo"),t=[a,"a",c,"ei",b,"ei",d,"ei",e,"o",f,"u",h,"i",g,"s",k,"s",n,"s",l,"k",p,"k",m,"t",u,"t",q,"f",A,"f",z,"o",y,"u"];return function(v,x){if(!v)return v;v=this.simple(v);2<v.length&&(v=Q(v,t));x||1<v.length&&(v=ca(v));return v}}(),extra:function(){const a=r("p"),c=r("z"),b=r("[cgq]"),d=r("n"),e=r("d"),f=r("[vw]"),h=r("[aeiouy]"),
g=[a,"b",c,"s",b,"k",d,"m",e,"t",f,"f",h,""];return function(k){if(!k)return k;k=this.advanced(k,!0);if(1<k.length){k=k.split(" ");for(let l=0;l<k.length;l++){const p=k[l];1<p.length&&(k[l]=p[0]+Q(p.substring(1),g))}k=k.join(" ");k=ca(k)}return k}}(),balance:va},ua=function(){function a(c){this.clear();this.H=!0!==c&&c}a.prototype.clear=function(){this.cache=B();this.count=B();this.index=B();this.s=[]};a.prototype.set=function(c,b){if(this.H&&C(this.cache[c])){let d=this.s.length;if(d===this.H){d--;
const e=this.s[d];delete this.cache[e];delete this.count[e];delete this.index[e]}this.index[c]=d;this.s[d]=c;this.count[c]=-1;this.cache[c]=b;this.get(c)}else this.cache[c]=b};a.prototype.get=function(c){const b=this.cache[c];if(this.H&&b){var d=++this.count[c];const f=this.index;let h=f[c];if(0<h){const g=this.s;for(var e=h;this.count[g[--h]]<=d&&-1!==h;);h++;if(h!==e){for(d=e;d>h;d--)e=g[d-1],g[d]=e,f[e]=d;g[h]=c;f[c]=h}}}return b};return a}();return w}(function(){const K={},R="undefined"!==typeof Blob&&
"undefined"!==typeof URL&&URL.createObjectURL;return function(w,L,S,W,P){S=R?URL.createObjectURL(new Blob(["("+S.toString()+")()"],{type:"text/javascript"})):w+".min.js";w+="-"+L;K[w]||(K[w]=[]);K[w][P]=new Worker(S);K[w][P].onmessage=W;return K[w][P]}}()),this);

},{}],11:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _flexsearch = _interopRequireDefault(require("flexsearch"));

/* global fetch */
// https://github.com/gmfmi/searchinGhost
var SearchinGhost = /*#__PURE__*/function () {
  /**
   * Constructor and entry point of the library
   * @param {Document} args
   */
  function SearchinGhost(args) {
    (0, _classCallCheck2.default)(this, SearchinGhost);
    this.config = {
      url: window.location.origin,
      key: '',
      version: 'v4',
      loadOn: 'focus',
      searchOn: 'keyup',
      limit: 10,
      inputId: ['search-field'],
      outputId: ['search-results'],
      outputChildsType: 'li',
      //
      postsFields: ['title', 'url', 'published_at'],
      postsExtraFields: [],
      postsFormats: [],
      indexedFields: ['title'],
      template: function template(post) {
        return "<a class=\"flex items-center noWrapWithEllipsis\" href=\"".concat(post.url, "\">").concat(post.name === undefined ? post.title : post.name, "</a>");
      },
      // template: function (post) {},
      //
      // postsFields: ['title', 'url', 'excerpt', 'custom_excerpt', 'published_at', 'feature_image'],
      // postsExtraFields: ['tags'],
      // postsFormats: ['plaintext'],
      // indexedFields: ['title', 'string_tags', 'excerpt', 'plaintext'],
      // template: function (post) {
      //   let o = `<a href='${post.url}'>`
      //   if (post.feature_image) o += `<img src='${post.feature_image}'>`
      //   o += '<section>'
      //   o += `<h2>${post.title}</h2>`
      //   o += `</section></a>`
      //   return o
      // },
      emptyTemplate: function emptyTemplate() {},
      customProcessing: function customProcessing(post) {
        if (post.tags) post.string_tags = post.tags.map(function (o) {
          return o.name;
        }).join(' ').toLowerCase();
        return post;
      },
      date: {
        locale: document.documentElement.lang || 'en-US',
        options: {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }
      },
      cacheMaxAge: 1800,
      onFetchStart: function onFetchStart() {
        return document.body.classList.add('is-loading');
      },
      onFetchEnd: function onFetchEnd() {
        return setTimeout(function () {
          document.body.classList.remove('is-loading');
        }, 4000);
      },
      onIndexBuildStart: function onIndexBuildStart() {},
      onIndexBuildEnd: function onIndexBuildEnd(index) {},
      onSearchStart: function onSearchStart() {},
      onSearchEnd: function onSearchEnd(posts) {},
      indexOptions: {},
      searchOptions: {},
      debug: false
    };
    this.dataLoaded = false; // flag to ensure data are properly loaded

    this.postsCount = 0; // keep track of posts ID, must be numeric

    this.storage = this.getLocalStorageOption();
    this.initConfig(args);
    this.triggerDataLoad();
  }
  /**
   * Apply the user configuration and initialize important variables
   * @param {Document} args
   */


  (0, _createClass2.default)(SearchinGhost, [{
    key: "initConfig",
    value: function initConfig(args) {
      var _this = this;

      for (var _i = 0, _Object$entries = Object.entries(args); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        this.config[key] = value;
      } // ensure config backward compatilibity of <1.5.0


      if (!Array.isArray(this.config.inputId)) this.config.inputId = [this.config.inputId];
      if (!Array.isArray(this.config.outputId)) this.config.outputId = [this.config.outputId]; // Inject the 'limit' arg within the final searchOptions

      this.config.searchOptions.limit = this.config.limit; // Ensure 'updated_at' will be fetched, needed for the local storage logic

      this.originalPostsFields = this.config.postsFields;

      if (!this.config.postsFields.includes('updated_at')) {
        this.config.postsFields.push('updated_at');
      }

      if (this.config.inputId && this.config.inputId.length > 0) {
        this.searchBarEls = [];
        this.config.inputId.forEach(function (id) {
          var searchBar = document.getElementById(id);

          if (searchBar) {
            _this.searchBarEls.push(searchBar);

            _this.addSearchListeners(searchBar);
          } else {
            _this.error("Enable to find the input element #".concat(id, ", please check your configuration"));
          }
        });
      }

      if (this.config.outputId && this.config.outputId.length > 0) {
        this.searchResultEls = [];
        this.config.outputId.forEach(function (id) {
          var searchResult = document.getElementById(id);

          if (searchResult) {
            _this.searchResultEls.push(searchResult);
          } else {
            _this.error("Enable to find the output element #".concat(id, ", please check your configuration"));
          }
        });
      }

      this.index = this.getNewSearchIndex();
    }
    /**
     * Set the search input bar and form event listeners to trigger
     * further searches
     */

  }, {
    key: "addSearchListeners",
    value: function addSearchListeners(searchBarEl) {
      var _this2 = this;

      // In any case, prevent the input form from being submitted
      var searchForm = searchBarEl.closest('form');

      if (searchForm) {
        searchForm.addEventListener('submit', function (ev) {
          ev.preventDefault();
        });
      }

      switch (this.config.searchOn) {
        case 'keyup':
          searchBarEl.addEventListener('keyup', function () {
            var inputQuery = searchBarEl.value.toLowerCase();

            _this2.search(inputQuery);
          });
          break;

        case 'submit':
          searchForm.addEventListener('submit', function () {
            var inputQuery = searchBarEl.value.toLowerCase();

            _this2.search(inputQuery);
          });
          break;

        case false:
        case 'none':
          // do nothing
          break;

        default:
          this.error("Unknown 'searchOn' option: '".concat(this.config.searchOn, "'"));
      }
    }
    /**
     * Set triggers to load the posts data when ready
     */

  }, {
    key: "triggerDataLoad",
    value: function triggerDataLoad() {
      var _this3 = this;

      switch (this.config.loadOn) {
        case 'focus':
          this.searchBarEls.forEach(function (searchBarEl) {
            searchBarEl.addEventListener('focus', function () {
              _this3.loadData();
            });
          });
          break;

        case 'page':
          window.addEventListener('load', function () {
            _this3.loadData();
          });
          break;

        case false:
        case 'none':
          // do nothing
          break;

        default:
          this.error("Unknown 'loadOn' option: '".concat(this.config.loadOn, "'"));
      }
    }
    /**
     * Actually load the data into a searchable index.
     * When this method is completed, we are ready to launch search queries.
     */

  }, {
    key: "loadData",
    value: function loadData() {
      if (this.dataLoaded) return;

      if (!this.storage) {
        this.log('No local storage available, switch to degraded mode');
        this.fetch();
        return;
      }

      var storedIndex = this.storage.getItem('SearchinGhost_index');

      if (storedIndex) {
        this.log('Found an index stored locally, loads it');
        this.config.onIndexBuildStart();
        this.index.import(storedIndex);
        this.dataLoaded = true;
        this.config.onIndexBuildEnd(this.index);
        this.validateCache();
      } else {
        this.log('No already stored index found');
        this.fetch();
      }
    }
    /**
     * Ensure stored data are up to date.
     */

  }, {
    key: "validateCache",
    value: function validateCache() {
      var _this4 = this;

      var cacheInfoString = this.storage.getItem('SearchinGhost_cache_info');

      if (!cacheInfoString) {
        this.log('No cache info local object found');
        this.fetch();
        return;
      }

      var cacheInfo = JSON.parse(cacheInfoString);
      var lastUpdate = new Date(cacheInfo.lastCacheCheck);
      var elapsedTime = Math.round((new Date() - lastUpdate) / 1000);

      if (elapsedTime < this.config.cacheMaxAge) {
        this.log("Skip cache refreshing, updated less than ".concat(this.config.cacheMaxAge, "s ago (").concat(elapsedTime, "s)"));
        return;
      }

      var browseOptions = {
        limit: 1,
        fields: ['updated_at'],
        order: 'updated_at DESC'
      };
      var lastUpdatedPostUrl = this.buildUrl(browseOptions);
      fetch(lastUpdatedPostUrl).then(function (response) {
        return response.json();
      }).then(function (jsonResponse) {
        var lastestPostUpdatedAt = jsonResponse.posts[0].updated_at;
        var totalPosts = jsonResponse.meta.pagination.total;

        if (lastestPostUpdatedAt !== cacheInfo.lastestPostUpdatedAt) {
          _this4.log('Posts update found, purge outdated local cache');

          _this4.fetch();
        } else if (totalPosts < cacheInfo.totalPosts) {
          _this4.log('Deleted or unpublished posts found, purge outdated local cache');

          _this4.fetch();
        } else {
          _this4.log('Local cached data up to date');

          cacheInfo.lastCacheCheck = new Date().toISOString();

          _this4.storage.setItem('SearchinGhost_cache_info', JSON.stringify(cacheInfo));
        }
      }).catch(function (error) {
        console.error('Unable to fetch the latest post information to check cache state', error);
      });
    }
    /**
     * Fetch, format and store posts data from Ghost.
     */

  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch() {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function () {
      var _this5 = this;

      this.log('Fetching data from Ghost API');
      this.config.onFetchStart();
      var browseOptions = {
        limit: 'all',
        fields: this.config.postsFields,
        order: 'updated_at DESC'
      };
      if (this.config.postsExtraFields.length > 0) browseOptions.include = this.config.postsExtraFields;
      if (this.config.postsFormats.length > 0) browseOptions.formats = this.config.postsFormats;
      var allPostsUrl = this.buildUrl(browseOptions);
      fetch(allPostsUrl).then(function (response) {
        return response.json();
      }).then(function (jsonResponse) {
        var posts = jsonResponse.posts;

        _this5.config.onFetchEnd(posts);

        _this5.config.onIndexBuildStart();

        _this5.index = _this5.getNewSearchIndex();
        posts.forEach(function (post) {
          var formattedPost = _this5.format(post);

          if (formattedPost) _this5.index.add(formattedPost);
        });
        _this5.dataLoaded = true;

        _this5.config.onIndexBuildEnd(_this5.index);

        if (_this5.storage) {
          var cacheInfo = {
            lastCacheCheck: new Date().toISOString(),
            lastestPostUpdatedAt: posts[0].updated_at,
            totalPosts: jsonResponse.meta.pagination.total
          };

          _this5.storage.setItem('SearchinGhost_index', _this5.index.export());

          _this5.storage.setItem('SearchinGhost_cache_info', JSON.stringify(cacheInfo));
        }

        _this5.log('Search index build complete');
      }).catch(function (error) {
        _this5.error('Unable to fetch Ghost data.\n', error);
      });
    }
    /**
     * Format a post document before being indexed.
     * @param {Document} post
     * @return {Document} The formatted post
     */
    )
  }, {
    key: "format",
    value: function format(post) {
      // Need to use a numeric ID to improve performance & disk space
      post.id = this.postsCount++; // display date using 'locale' format

      post.published_at = this.prettyDate(post.published_at); // only used to keep track of the last fetch time,
      // remove it before indexing BUT only if not wanted by the user

      if (!this.originalPostsFields.includes('updated_at')) {
        delete post.updated_at;
      }

      if (post.custom_excerpt) {
        post.excerpt = post.custom_excerpt;
        delete post.custom_excerpt;
      }

      post = this.config.customProcessing(post);
      return post;
    }
    /**
     * Execute a search query.
     * @param {string} inputQuery
     */

  }, {
    key: "search",
    value: function search(inputQuery) {
      this.loadData();
      this.config.onSearchStart();
      var postsFound = this.index.search(inputQuery, this.config.searchOptions);
      if (this.searchResultEls && this.searchResultEls.length > 0) this.display(postsFound);
      this.config.onSearchEnd(postsFound);
      return postsFound;
    }
    /**
     * Display the results as HTML into the configured DOM output element.
     * @param {Document[]} posts
     */

  }, {
    key: "display",
    value: function display(posts) {
      var _this6 = this;

      this.searchResultEls.forEach(function (resultEl) {
        resultEl.innerHTML = '';
      });

      if (posts.length < 1) {
        this.insertTemplate(this.config.emptyTemplate());
      } else {
        posts.forEach(function (post) {
          _this6.insertTemplate(_this6.config.template(post));
        });
      }
    }
    /**
     * Insert the HTML generated by the template into the DOM results output element.
     * If a falsy value is returned by the template, do not apply any update.
     * @param {*} generatedHtml HTML node element or HTML string
     */

  }, {
    key: "insertTemplate",
    value: function insertTemplate(generatedHtml) {
      var _this7 = this;

      if (generatedHtml) {
        this.searchResultEls.forEach(function (resultEl) {
          if (_this7.config.outputChildsType) {
            var child = document.createElement(_this7.config.outputChildsType);
            child.classList.add("".concat(resultEl.id, "-item"));
            child.innerHTML = generatedHtml;
            resultEl.appendChild(child);
          } else {
            resultEl.insertAdjacentHTML('beforeend', generatedHtml);
          }
        });
      }
    }
    /**
     * Get a new instance of FlexSearch.
     * @return {FlexSearch} The instance of FlexSearch.
     */

  }, {
    key: "getNewSearchIndex",
    value: function getNewSearchIndex() {
      var indexConfig = {
        doc: {
          id: 'id',
          field: this.config.indexedFields
        },
        encode: 'simple',
        tokenize: 'forward',
        threshold: 0,
        resolution: 4,
        depth: 0
      };

      for (var _i2 = 0, _Object$entries2 = Object.entries(this.config.indexOptions); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = (0, _slicedToArray2.default)(_Object$entries2[_i2], 2),
            key = _Object$entries2$_i[0],
            value = _Object$entries2$_i[1];

        indexConfig[key] = value;
      }

      return new _flexsearch.default(indexConfig);
    }
    /**
     * Build the final Ghost API URL resources based on options.
     * @param {Document} options the Ghost API browse options
     * @return {string} the url
     */

  }, {
    key: "buildUrl",
    value: function buildUrl(options) {
      var url = "".concat(this.config.url, "/ghost/api/content/posts/?key=").concat(this.config.key);

      for (var _i3 = 0, _Object$entries3 = Object.entries(options); _i3 < _Object$entries3.length; _i3++) {
        var _Object$entries3$_i = (0, _slicedToArray2.default)(_Object$entries3[_i3], 2),
            key = _Object$entries3$_i[0],
            value = _Object$entries3$_i[1];

        url += "&".concat(key, "=").concat(value);
      }

      return encodeURI(url);
    }
    /**
     * Get the date in the locale expected format.
     * @param {string} date
     * @return {string} The formatted date
     */

  }, {
    key: "prettyDate",
    value: function prettyDate(date) {
      var d = new Date(date);
      return d.toLocaleDateString(this.config.date.locale, this.config.date.options);
    }
    /**
     * Safely get the local storage object if available.
     * If the user browser disabled it, get `undefined` instead.
     * @return {Storage} The storage object or `undefined`
     */

  }, {
    key: "getLocalStorageOption",
    value: function getLocalStorageOption() {
      try {
        window.localStorage.setItem('storage-availability-test', '');
        window.localStorage.removeItem('storage-availability-test');
        return window.localStorage;
      } catch (err) {
        return undefined;
      }
    }
    /**
     * Simple logging function.
     * Output logs only if `debug` is set to `true`.
     * @param {string} str the text to output
     * @param {*} obj optional object to output
     */

  }, {
    key: "log",
    value: function log(str, obj) {
      if (this.config.debug) obj ? console.log(str, obj) : console.log(str);
    }
    /**
     * Simple 'error' level logging function.
     * @param {string} str the text to output
     * @param {*} obj optional object to output
     */

  }, {
    key: "error",
    value: function error(str, obj) {
      obj ? console.error(str, obj) : console.error(str);
    }
  }]);
  return SearchinGhost;
}();

exports.default = SearchinGhost;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/interopRequireDefault":5,"@babel/runtime/helpers/slicedToArray":8,"flexsearch":10}],12:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _searchinghost = _interopRequireDefault(require("./lib/searchinghost"));

/* global searchSettings */
(function (document) {
  var $body = document.body;
  var $input = document.querySelector('#search-field');
  var $results = document.querySelector('#search-results');
  var $searchMessage = document.querySelector('.js-search-message');
  var classIsActive = 'is-active';
  var allSearchLinksLength = 0;
  var searchResultsHeight = {
    outer: 0,
    scroll: 0
  }; // SHow icon search in header

  document.querySelector('li[data-target=modal-search]').classList.remove('hidden');

  var afterDisplaySearch = function afterDisplaySearch(results) {
    // Active class to link search
    searchResultActive();
    allSearchLinksLength = results.length;
    searchResultsHeight = {
      outer: $results.offsetHeight,
      scroll: $results.scrollHeight
    };

    if (allSearchLinksLength === 0 && $input.value !== '') {
      $searchMessage.classList.remove('hidden');
      $body.removeEventListener('keydown', mySearchKey);
    } else {
      $searchMessage.classList.add('hidden');
      $body.addEventListener('keydown', mySearchKey);
    }
  };
  /* Customized search data
  /* ---------------------------------------------------------- */


  var mySearchSettings = {
    // key: searchSettings.key,
    onSearchEnd: function onSearchEnd(results) {
      return afterDisplaySearch(results);
    }
  }; // join user settings

  Object.assign(mySearchSettings, searchSettings);
  /* when the Enter key is pressed
  /* ---------------------------------------------------------- */

  function enterKey() {
    var link = $results.querySelector("li.".concat(classIsActive));
    link && link.firstChild.click();
  }
  /* Attending the active class to the search link
  /* ---------------------------------------------------------- */


  function searchResultActive(index, upDown) {
    index = index || 0;
    upDown = upDown || 'up';
    var allSearchLinks = $results.querySelectorAll('li'); // Return if there are no results

    if (!allSearchLinks.length) return; // Remove All class Active

    allSearchLinks.forEach(function (element) {
      return element.classList.remove(classIsActive);
    }); // Add class active

    allSearchLinks[index].classList.add(classIsActive); // Scroll for results box

    var linkOffSetTop = allSearchLinks[index].offsetTop;
    var scrollPosition = 0;
    upDown === 'down' && linkOffSetTop > searchResultsHeight.outer / 2 ? scrollPosition = linkOffSetTop - searchResultsHeight.outer / 2 : upDown === 'up' && (scrollPosition = linkOffSetTop < searchResultsHeight.scroll - searchResultsHeight.outer / 2 ? linkOffSetTop - searchResultsHeight.outer / 2 : searchResultsHeight.scroll);
    $results.scrollTo(0, scrollPosition);
  }
  /* Reacted to the up or down keys
  /* ---------------------------------------------------------- */


  function arrowKeyUpDown(keyNumber) {
    var upDown;
    var indexTheLink = 0;
    var resultActive = $results.querySelector("li.".concat(classIsActive));

    if (resultActive) {
      indexTheLink = [].slice.call(resultActive.parentNode.children).indexOf(resultActive);
    }

    $input.blur(); // 38 === UP

    if (keyNumber === 38) {
      upDown = 'up';

      if (indexTheLink <= 0) {
        $input.focus();
        indexTheLink = 0;
      } else {
        indexTheLink -= 1;
      }
    } else {
      upDown = 'down';

      if (indexTheLink >= allSearchLinksLength - 1) {
        indexTheLink = 0;
      } else {
        indexTheLink += 1;
      }
    }

    searchResultActive(indexTheLink, upDown);
  }
  /* Adding functions to the keys
  /* ---------------------------------------------------------- */


  function mySearchKey(e) {
    var keyNumber = e.keyCode;
    /**
      * 38 => Up
      * 40 => down
      * 13 => enter
      **/

    if (keyNumber === 13) {
      $input.blur();
      enterKey();
    } else if (keyNumber === 38 || keyNumber === 40) {
      arrowKeyUpDown(keyNumber);
      e.preventDefault();
    }
  }
  /* Search
  /* ---------------------------------------------------------- */

  /* eslint-disable no-new */


  new _searchinghost.default(mySearchSettings);
})(document);

},{"./lib/searchinghost":11,"@babel/runtime/helpers/interopRequireDefault":5}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvZmxleHNlYXJjaC9kaXN0L2ZsZXhzZWFyY2gubWluLmpzIiwic3JjL2pzL2xpYi9zZWFyY2hpbmdob3N0LmpzIiwic3JjL2pzL3NlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUY7SUFDRDtFQUNGO0VBRUQ7QUFDRjs7RUFDRTs7O0VBQ0EsSUFBSSxzQkFBSixDQUFrQixnQkFBbEI7QUFDRCxDQS9JRCxFQStJRyxRQS9JSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlMaWtlVG9BcnJheSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjaywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzcywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcblxuICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcblxuICB2YXIgX3MsIF9lO1xuXG4gIHRyeSB7XG4gICAgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXMuanNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCIpO1xuXG52YXIgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsInZhciBhcnJheUxpa2VUb0FycmF5ID0gcmVxdWlyZShcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiKTtcblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCIvKlxuIEZsZXhTZWFyY2ggdjAuNi4zMFxuIENvcHlyaWdodCAyMDE5IE5leHRhcHBzIEdtYkhcbiBBdXRob3I6IFRob21hcyBXaWxrZXJsaW5nXG4gUmVsZWFzZWQgdW5kZXIgdGhlIEFwYWNoZSAyLjAgTGljZW5jZVxuIGh0dHBzOi8vZ2l0aHViLmNvbS9uZXh0YXBwcy1kZS9mbGV4c2VhcmNoXG4qL1xuJ3VzZSBzdHJpY3QnOyhmdW5jdGlvbihLLFIsdyl7bGV0IEw7KEw9dy5kZWZpbmUpJiZMLmFtZD9MKFtdLGZ1bmN0aW9uKCl7cmV0dXJuIFJ9KTooTD13Lm1vZHVsZXMpP0xbSy50b0xvd2VyQ2FzZSgpXT1SOlwib2JqZWN0XCI9PT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1SOndbS109Un0pKFwiRmxleFNlYXJjaFwiLGZ1bmN0aW9uIG1hKEspe2Z1bmN0aW9uIHcoYSxjKXtjb25zdCBiPWM/Yy5pZDphJiZhLmlkO3RoaXMuaWQ9Ynx8MD09PWI/YjpuYSsrO3RoaXMuaW5pdChhLGMpO2ZhKHRoaXMsXCJpbmRleFwiLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYT9PYmplY3Qua2V5cyh0aGlzLmEuaW5kZXhbdGhpcy5hLmtleXNbMF1dLmMpOk9iamVjdC5rZXlzKHRoaXMuYyl9KTtmYSh0aGlzLFwibGVuZ3RoXCIsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pbmRleC5sZW5ndGh9KX1mdW5jdGlvbiBMKGEsYyxiLGQpe3RoaXMudSE9PXRoaXMuZyYmKHRoaXMubz10aGlzLm8uY29uY2F0KGIpLHRoaXMudSsrLFxuZCYmdGhpcy5vLmxlbmd0aD49ZCYmKHRoaXMudT10aGlzLmcpLHRoaXMudT09PXRoaXMuZyYmKHRoaXMuY2FjaGUmJnRoaXMuai5zZXQoYyx0aGlzLm8pLHRoaXMuRiYmdGhpcy5GKHRoaXMubykpKTtyZXR1cm4gdGhpc31mdW5jdGlvbiBTKGEpe2NvbnN0IGM9QigpO2Zvcihjb25zdCBiIGluIGEpaWYoYS5oYXNPd25Qcm9wZXJ0eShiKSl7Y29uc3QgZD1hW2JdO0YoZCk/Y1tiXT1kLnNsaWNlKDApOkcoZCk/Y1tiXT1TKGQpOmNbYl09ZH1yZXR1cm4gY31mdW5jdGlvbiBXKGEsYyl7Y29uc3QgYj1hLmxlbmd0aCxkPU8oYyksZT1bXTtmb3IobGV0IGY9MCxoPTA7ZjxiO2YrKyl7Y29uc3QgZz1hW2ZdO2lmKGQmJmMoZyl8fCFkJiYhY1tnXSllW2grK109Z31yZXR1cm4gZX1mdW5jdGlvbiBQKGEsYyxiLGQsZSxmLGgsZyxrLGwpe2I9aGEoYixoPzA6ZSxnLGYsYyxrLGwpO2xldCBwO2cmJihnPWIucGFnZSxwPWIubmV4dCxiPWIucmVzdWx0KTtpZihoKWM9dGhpcy53aGVyZShoLG51bGwsXG5lLGIpO2Vsc2V7Yz1iO2I9dGhpcy5sO2U9Yy5sZW5ndGg7Zj1BcnJheShlKTtmb3IoaD0wO2g8ZTtoKyspZltoXT1iW2NbaF1dO2M9Zn1iPWM7ZCYmKE8oZCl8fChNPWQuc3BsaXQoXCI6XCIpLDE8TS5sZW5ndGg/ZD1vYTooTT1NWzBdLGQ9cGEpKSxiLnNvcnQoZCkpO2I9VChnLHAsYik7dGhpcy5jYWNoZSYmdGhpcy5qLnNldChhLGIpO3JldHVybiBifWZ1bmN0aW9uIGZhKGEsYyxiKXtPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxjLHtnZXQ6Yn0pfWZ1bmN0aW9uIHIoYSl7cmV0dXJuIG5ldyBSZWdFeHAoYSxcImdcIil9ZnVuY3Rpb24gUShhLGMpe2ZvcihsZXQgYj0wO2I8Yy5sZW5ndGg7Yis9MilhPWEucmVwbGFjZShjW2JdLGNbYisxXSk7cmV0dXJuIGF9ZnVuY3Rpb24gVihhLGMsYixkLGUsZixoLGcpe2lmKGNbYl0pcmV0dXJuIGNbYl07ZT1lPyhnLShofHxnLzEuNSkpKmYrKGh8fGcvMS41KSplOmY7Y1tiXT1lO2U+PWgmJihhPWFbZy0oZSsuNT4+MCldLGE9YVtiXXx8KGFbYl09W10pLFxuYVthLmxlbmd0aF09ZCk7cmV0dXJuIGV9ZnVuY3Rpb24gYmEoYSxjKXtpZihhKXtjb25zdCBiPU9iamVjdC5rZXlzKGEpO2ZvcihsZXQgZD0wLGU9Yi5sZW5ndGg7ZDxlO2QrKyl7Y29uc3QgZj1iW2RdLGg9YVtmXTtpZihoKWZvcihsZXQgZz0wLGs9aC5sZW5ndGg7ZzxrO2crKylpZihoW2ddPT09Yyl7MT09PWs/ZGVsZXRlIGFbZl06aC5zcGxpY2UoZywxKTticmVha31lbHNlIEcoaFtnXSkmJmJhKGhbZ10sYyl9fX1mdW5jdGlvbiBjYShhKXtsZXQgYz1cIlwiLGI9XCJcIjt2YXIgZD1cIlwiO2ZvcihsZXQgZT0wO2U8YS5sZW5ndGg7ZSsrKXtjb25zdCBmPWFbZV07aWYoZiE9PWIpaWYoZSYmXCJoXCI9PT1mKXtpZihkPVwiYVwiPT09ZHx8XCJlXCI9PT1kfHxcImlcIj09PWR8fFwib1wiPT09ZHx8XCJ1XCI9PT1kfHxcInlcIj09PWQsKFwiYVwiPT09Ynx8XCJlXCI9PT1ifHxcImlcIj09PWJ8fFwib1wiPT09Ynx8XCJ1XCI9PT1ifHxcInlcIj09PWIpJiZkfHxcIiBcIj09PWIpYys9Zn1lbHNlIGMrPWY7ZD1lPT09YS5sZW5ndGgtMT9cIlwiOmFbZStcbjFdO2I9Zn1yZXR1cm4gY31mdW5jdGlvbiBxYShhLGMpe2E9YS5sZW5ndGgtYy5sZW5ndGg7cmV0dXJuIDA+YT8xOmE/LTE6MH1mdW5jdGlvbiBwYShhLGMpe2E9YVtNXTtjPWNbTV07cmV0dXJuIGE8Yz8tMTphPmM/MTowfWZ1bmN0aW9uIG9hKGEsYyl7Y29uc3QgYj1NLmxlbmd0aDtmb3IobGV0IGQ9MDtkPGI7ZCsrKWE9YVtNW2RdXSxjPWNbTVtkXV07cmV0dXJuIGE8Yz8tMTphPmM/MTowfWZ1bmN0aW9uIFQoYSxjLGIpe3JldHVybiBhP3twYWdlOmEsbmV4dDpjP1wiXCIrYzpudWxsLHJlc3VsdDpifTpifWZ1bmN0aW9uIGhhKGEsYyxiLGQsZSxmLGgpe2xldCBnLGs9W107aWYoITA9PT1iKXtiPVwiMFwiO3ZhciBsPVwiXCJ9ZWxzZSBsPWImJmIuc3BsaXQoXCI6XCIpO2NvbnN0IHA9YS5sZW5ndGg7aWYoMTxwKXtjb25zdCB5PUIoKSx0PVtdO2xldCB2LHg7dmFyIG49MCxtO2xldCBJO3ZhciB1PSEwO2xldCBELEU9MCxOLGRhLFgsZWE7bCYmKDI9PT1sLmxlbmd0aD8oWD1sLGw9ITEpOmw9ZWE9XG5wYXJzZUludChsWzBdLDEwKSk7aWYoaCl7Zm9yKHY9QigpO248cDtuKyspaWYoXCJub3RcIj09PWVbbl0pZm9yKHg9YVtuXSxJPXgubGVuZ3RoLG09MDttPEk7bSsrKXZbXCJAXCIreFttXV09MTtlbHNlIGRhPW4rMTtpZihDKGRhKSlyZXR1cm4gVChiLGcsayk7bj0wfWVsc2UgTj1KKGUpJiZlO2xldCBZO2Zvcig7bjxwO24rKyl7Y29uc3QgcmE9bj09PShkYXx8cCktMTtpZighTnx8IW4paWYoKG09Tnx8ZSYmZVtuXSkmJlwiYW5kXCIhPT1tKWlmKFwib3JcIj09PW0pWT0hMTtlbHNlIGNvbnRpbnVlO2Vsc2UgWT1mPSEwO3g9YVtuXTtpZihJPXgubGVuZ3RoKXtpZih1KWlmKEQpe3ZhciBxPUQubGVuZ3RoO2ZvcihtPTA7bTxxO20rKyl7dT1EW21dO3ZhciBBPVwiQFwiK3U7aCYmdltBXXx8KHlbQV09MSxmfHwoa1tFKytdPXUpKX1EPW51bGw7dT0hMX1lbHNle0Q9eDtjb250aW51ZX1BPSExO2ZvcihtPTA7bTxJO20rKyl7cT14W21dO3ZhciB6PVwiQFwiK3E7Y29uc3QgWj1mP3lbel18fDA6bjtpZighKCFaJiZcbiFkfHxoJiZ2W3pdfHwhZiYmeVt6XSkpaWYoWj09PW4pe2lmKHJhKXtpZighZWF8fC0tZWE8RSlpZihrW0UrK109cSxjJiZFPT09YylyZXR1cm4gVChiLEUrKGx8fDApLGspfWVsc2UgeVt6XT1uKzE7QT0hMH1lbHNlIGQmJih6PXRbWl18fCh0W1pdPVtdKSx6W3oubGVuZ3RoXT1xKX1pZihZJiYhQSYmIWQpYnJlYWt9ZWxzZSBpZihZJiYhZClyZXR1cm4gVChiLGcseCl9aWYoRClpZihuPUQubGVuZ3RoLGgpZm9yKG09bD9wYXJzZUludChsLDEwKTowO208bjttKyspYT1EW21dLHZbXCJAXCIrYV18fChrW0UrK109YSk7ZWxzZSBrPUQ7aWYoZClmb3IoRT1rLmxlbmd0aCxYPyhuPXBhcnNlSW50KFhbMF0sMTApKzEsbT1wYXJzZUludChYWzFdLDEwKSsxKToobj10Lmxlbmd0aCxtPTApO24tLTspaWYocT10W25dKXtmb3IoST1xLmxlbmd0aDttPEk7bSsrKWlmKGQ9cVttXSwhaHx8IXZbXCJAXCIrZF0paWYoa1tFKytdPWQsYyYmRT09PWMpcmV0dXJuIFQoYixuK1wiOlwiK20sayk7bT0wfX1lbHNlIXB8fFxuZSYmXCJub3RcIj09PWVbMF18fChrPWFbMF0sbCYmKGw9cGFyc2VJbnQobFswXSwxMCkpKTtjJiYoaD1rLmxlbmd0aCxsJiZsPmgmJihsPTApLGw9bHx8MCxnPWwrYyxnPGg/az1rLnNsaWNlKGwsZyk6KGc9MCxsJiYoaz1rLnNsaWNlKGwpKSkpO3JldHVybiBUKGIsZyxrKX1mdW5jdGlvbiBKKGEpe3JldHVyblwic3RyaW5nXCI9PT10eXBlb2YgYX1mdW5jdGlvbiBGKGEpe3JldHVybiBhLmNvbnN0cnVjdG9yPT09QXJyYXl9ZnVuY3Rpb24gTyhhKXtyZXR1cm5cImZ1bmN0aW9uXCI9PT10eXBlb2YgYX1mdW5jdGlvbiBHKGEpe3JldHVyblwib2JqZWN0XCI9PT10eXBlb2YgYX1mdW5jdGlvbiBDKGEpe3JldHVyblwidW5kZWZpbmVkXCI9PT10eXBlb2YgYX1mdW5jdGlvbiBpYShhKXtjb25zdCBjPUFycmF5KGEpO2ZvcihsZXQgYj0wO2I8YTtiKyspY1tiXT1CKCk7cmV0dXJuIGN9ZnVuY3Rpb24gQigpe3JldHVybiBPYmplY3QuY3JlYXRlKG51bGwpfWZ1bmN0aW9uIHNhKCl7bGV0IGEsYztzZWxmLm9ubWVzc2FnZT1cbmZ1bmN0aW9uKGIpe2lmKGI9Yi5kYXRhKWlmKGIuc2VhcmNoKXtjb25zdCBkPWMuc2VhcmNoKGIuY29udGVudCxiLnRocmVzaG9sZD97bGltaXQ6Yi5saW1pdCx0aHJlc2hvbGQ6Yi50aHJlc2hvbGQsd2hlcmU6Yi53aGVyZX06Yi5saW1pdCk7c2VsZi5wb3N0TWVzc2FnZSh7aWQ6YSxjb250ZW50OmIuY29udGVudCxsaW1pdDpiLmxpbWl0LHJlc3VsdDpkfSl9ZWxzZSBiLmFkZD9jLmFkZChiLmlkLGIuY29udGVudCk6Yi51cGRhdGU/Yy51cGRhdGUoYi5pZCxiLmNvbnRlbnQpOmIucmVtb3ZlP2MucmVtb3ZlKGIuaWQpOmIuY2xlYXI/Yy5jbGVhcigpOmIuaW5mbz8oYj1jLmluZm8oKSxiLndvcmtlcj1hLGNvbnNvbGUubG9nKGIpKTpiLnJlZ2lzdGVyJiYoYT1iLmlkLGIub3B0aW9ucy5jYWNoZT0hMSxiLm9wdGlvbnMuYXN5bmM9ITEsYi5vcHRpb25zLndvcmtlcj0hMSxjPShuZXcgRnVuY3Rpb24oYi5yZWdpc3Rlci5zdWJzdHJpbmcoYi5yZWdpc3Rlci5pbmRleE9mKFwie1wiKSsxLGIucmVnaXN0ZXIubGFzdEluZGV4T2YoXCJ9XCIpKSkpKCksXG5jPW5ldyBjKGIub3B0aW9ucykpfX1mdW5jdGlvbiB0YShhLGMsYixkKXthPUsoXCJmbGV4c2VhcmNoXCIsXCJpZFwiK2Esc2EsZnVuY3Rpb24oZil7KGY9Zi5kYXRhKSYmZi5yZXN1bHQmJmQoZi5pZCxmLmNvbnRlbnQsZi5yZXN1bHQsZi5saW1pdCxmLndoZXJlLGYuY3Vyc29yLGYuc3VnZ2VzdCl9LGMpO2NvbnN0IGU9bWEudG9TdHJpbmcoKTtiLmlkPWM7YS5wb3N0TWVzc2FnZSh7cmVnaXN0ZXI6ZSxvcHRpb25zOmIsaWQ6Y30pO3JldHVybiBhfWNvbnN0IEg9e2VuY29kZTpcImljYXNlXCIsZjpcImZvcndhcmRcIixzcGxpdDovXFxXKy8sY2FjaGU6ITEsYXN5bmM6ITEsZzohMSxEOiExLGE6ITEsYjo5LHRocmVzaG9sZDowLGRlcHRoOjB9LGphPXttZW1vcnk6e2VuY29kZTpcImV4dHJhXCIsZjpcInN0cmljdFwiLHRocmVzaG9sZDowLGI6MX0sc3BlZWQ6e2VuY29kZTpcImljYXNlXCIsZjpcInN0cmljdFwiLHRocmVzaG9sZDoxLGI6MyxkZXB0aDoyfSxtYXRjaDp7ZW5jb2RlOlwiZXh0cmFcIixmOlwiZnVsbFwiLHRocmVzaG9sZDoxLFxuYjozfSxzY29yZTp7ZW5jb2RlOlwiZXh0cmFcIixmOlwic3RyaWN0XCIsdGhyZXNob2xkOjEsYjo5LGRlcHRoOjR9LGJhbGFuY2U6e2VuY29kZTpcImJhbGFuY2VcIixmOlwic3RyaWN0XCIsdGhyZXNob2xkOjAsYjozLGRlcHRoOjN9LGZhc3Q6e2VuY29kZTpcImljYXNlXCIsZjpcInN0cmljdFwiLHRocmVzaG9sZDo4LGI6OSxkZXB0aDoxfX0sYWE9W107bGV0IG5hPTA7Y29uc3Qga2E9e30sbGE9e307dy5jcmVhdGU9ZnVuY3Rpb24oYSxjKXtyZXR1cm4gbmV3IHcoYSxjKX07dy5yZWdpc3Rlck1hdGNoZXI9ZnVuY3Rpb24oYSl7Zm9yKGNvbnN0IGMgaW4gYSlhLmhhc093blByb3BlcnR5KGMpJiZhYS5wdXNoKHIoYyksYVtjXSk7cmV0dXJuIHRoaXN9O3cucmVnaXN0ZXJFbmNvZGVyPWZ1bmN0aW9uKGEsYyl7VVthXT1jLmJpbmQoVSk7cmV0dXJuIHRoaXN9O3cucmVnaXN0ZXJMYW5ndWFnZT1mdW5jdGlvbihhLGMpe2thW2FdPWMuZmlsdGVyO2xhW2FdPWMuc3RlbW1lcjtyZXR1cm4gdGhpc307dy5lbmNvZGU9XG5mdW5jdGlvbihhLGMpe3JldHVybiBVW2FdKGMpfTt3LnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKGEsYyl7dGhpcy52PVtdO2lmKGMpe3ZhciBiPWMucHJlc2V0O2E9Y31lbHNlIGF8fChhPUgpLGI9YS5wcmVzZXQ7Yz17fTtKKGEpPyhjPWphW2FdLGE9e30pOmImJihjPWphW2JdKTtpZihiPWEud29ya2VyKWlmKFwidW5kZWZpbmVkXCI9PT10eXBlb2YgV29ya2VyKWEud29ya2VyPSExLHRoaXMubT1udWxsO2Vsc2V7dmFyIGQ9cGFyc2VJbnQoYiwxMCl8fDQ7dGhpcy5DPS0xO3RoaXMudT0wO3RoaXMubz1bXTt0aGlzLkY9bnVsbDt0aGlzLm09QXJyYXkoZCk7Zm9yKHZhciBlPTA7ZTxkO2UrKyl0aGlzLm1bZV09dGEodGhpcy5pZCxlLGEsTC5iaW5kKHRoaXMpKX10aGlzLmY9YS50b2tlbml6ZXx8Yy5mfHx0aGlzLmZ8fEguZjt0aGlzLnNwbGl0PUMoYj1hLnNwbGl0KT90aGlzLnNwbGl0fHxILnNwbGl0OkooYik/cihiKTpiO3RoaXMuRD1hLnJ0bHx8dGhpcy5EfHxILkQ7dGhpcy5hc3luYz1cblwidW5kZWZpbmVkXCI9PT10eXBlb2YgUHJvbWlzZXx8QyhiPWEuYXN5bmMpP3RoaXMuYXN5bmN8fEguYXN5bmM6Yjt0aGlzLmc9QyhiPWEud29ya2VyKT90aGlzLmd8fEguZzpiO3RoaXMudGhyZXNob2xkPUMoYj1hLnRocmVzaG9sZCk/Yy50aHJlc2hvbGR8fHRoaXMudGhyZXNob2xkfHxILnRocmVzaG9sZDpiO3RoaXMuYj1DKGI9YS5yZXNvbHV0aW9uKT9iPWMuYnx8dGhpcy5ifHxILmI6YjtiPD10aGlzLnRocmVzaG9sZCYmKHRoaXMuYj10aGlzLnRocmVzaG9sZCsxKTt0aGlzLmRlcHRoPVwic3RyaWN0XCIhPT10aGlzLmZ8fEMoYj1hLmRlcHRoKT9jLmRlcHRofHx0aGlzLmRlcHRofHxILmRlcHRoOmI7dGhpcy53PShiPUMoYj1hLmVuY29kZSk/Yy5lbmNvZGV8fEguZW5jb2RlOmIpJiZVW2JdJiZVW2JdLmJpbmQoVSl8fChPKGIpP2I6dGhpcy53fHwhMSk7KGI9YS5tYXRjaGVyKSYmdGhpcy5hZGRNYXRjaGVyKGIpO2lmKGI9KGM9YS5sYW5nKXx8YS5maWx0ZXIpe0ooYikmJihiPWthW2JdKTtcbmlmKEYoYikpe2Q9dGhpcy53O2U9QigpO2Zvcih2YXIgZj0wO2Y8Yi5sZW5ndGg7ZisrKXt2YXIgaD1kP2QoYltmXSk6YltmXTtlW2hdPTF9Yj1lfXRoaXMuZmlsdGVyPWJ9aWYoYj1jfHxhLnN0ZW1tZXIpe3ZhciBnO2M9SihiKT9sYVtiXTpiO2Q9dGhpcy53O2U9W107Zm9yKGcgaW4gYyljLmhhc093blByb3BlcnR5KGcpJiYoZj1kP2QoZyk6ZyxlLnB1c2gocihmK1wiKCR8XFxcXFcpXCIpLGQ/ZChjW2ddKTpjW2ddKSk7dGhpcy5zdGVtbWVyPWc9ZX10aGlzLmE9ZT0oYj1hLmRvYyk/UyhiKTp0aGlzLmF8fEguYTt0aGlzLmk9aWEodGhpcy5iLSh0aGlzLnRocmVzaG9sZHx8MCkpO3RoaXMuaD1CKCk7dGhpcy5jPUIoKTtpZihlKXt0aGlzLmw9QigpO2EuZG9jPW51bGw7Zz1lLmluZGV4PXt9O2M9ZS5rZXlzPVtdO2Q9ZS5maWVsZDtmPWUudGFnO2g9ZS5zdG9yZTtGKGUuaWQpfHwoZS5pZD1lLmlkLnNwbGl0KFwiOlwiKSk7aWYoaCl7dmFyIGs9QigpO2lmKEooaCkpa1toXT0xO2Vsc2UgaWYoRihoKSlmb3IobGV0IGw9XG4wO2w8aC5sZW5ndGg7bCsrKWtbaFtsXV09MTtlbHNlIEcoaCkmJihrPWgpO2Uuc3RvcmU9a31pZihmKXt0aGlzLkc9QigpO2g9QigpO2lmKGQpaWYoSihkKSloW2RdPWE7ZWxzZSBpZihGKGQpKWZvcihrPTA7azxkLmxlbmd0aDtrKyspaFtkW2tdXT1hO2Vsc2UgRyhkKSYmKGg9ZCk7RihmKXx8KGUudGFnPWY9W2ZdKTtmb3IoZD0wO2Q8Zi5sZW5ndGg7ZCsrKXRoaXMuR1tmW2RdXT1CKCk7dGhpcy5JPWY7ZD1ofWlmKGQpe2xldCBsO0YoZCl8fChHKGQpPyhsPWQsZS5maWVsZD1kPU9iamVjdC5rZXlzKGQpKTplLmZpZWxkPWQ9W2RdKTtmb3IoZT0wO2U8ZC5sZW5ndGg7ZSsrKWY9ZFtlXSxGKGYpfHwobCYmKGE9bFtmXSksY1tlXT1mLGRbZV09Zi5zcGxpdChcIjpcIikpLGdbZl09bmV3IHcoYSl9YS5kb2M9Yn10aGlzLkI9ITA7dGhpcy5qPSh0aGlzLmNhY2hlPWI9QyhiPWEuY2FjaGUpP3RoaXMuY2FjaGV8fEguY2FjaGU6Yik/bmV3IHVhKGIpOiExO3JldHVybiB0aGlzfTt3LnByb3RvdHlwZS5lbmNvZGU9XG5mdW5jdGlvbihhKXthJiYoYWEubGVuZ3RoJiYoYT1RKGEsYWEpKSx0aGlzLnYubGVuZ3RoJiYoYT1RKGEsdGhpcy52KSksdGhpcy53JiYoYT10aGlzLncoYSkpLHRoaXMuc3RlbW1lciYmKGE9UShhLHRoaXMuc3RlbW1lcikpKTtyZXR1cm4gYX07dy5wcm90b3R5cGUuYWRkTWF0Y2hlcj1mdW5jdGlvbihhKXtjb25zdCBjPXRoaXMudjtmb3IoY29uc3QgYiBpbiBhKWEuaGFzT3duUHJvcGVydHkoYikmJmMucHVzaChyKGIpLGFbYl0pO3JldHVybiB0aGlzfTt3LnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24oYSxjLGIsZCxlKXtpZih0aGlzLmEmJkcoYSkpcmV0dXJuIHRoaXMuQShcImFkZFwiLGEsYyk7aWYoYyYmSihjKSYmKGF8fDA9PT1hKSl7dmFyIGY9XCJAXCIrYTtpZih0aGlzLmNbZl0mJiFkKXJldHVybiB0aGlzLnVwZGF0ZShhLGMpO2lmKHRoaXMuZylyZXR1cm4rK3RoaXMuQz49dGhpcy5tLmxlbmd0aCYmKHRoaXMuQz0wKSx0aGlzLm1bdGhpcy5DXS5wb3N0TWVzc2FnZSh7YWRkOiEwLGlkOmEsXG5jb250ZW50OmN9KSx0aGlzLmNbZl09XCJcIit0aGlzLkMsYiYmYigpLHRoaXM7aWYoIWUpe2lmKHRoaXMuYXN5bmMmJlwiZnVuY3Rpb25cIiE9PXR5cGVvZiBpbXBvcnRTY3JpcHRzKXtsZXQgdD10aGlzO2Y9bmV3IFByb21pc2UoZnVuY3Rpb24odil7c2V0VGltZW91dChmdW5jdGlvbigpe3QuYWRkKGEsYyxudWxsLGQsITApO3Q9bnVsbDt2KCl9KX0pO2lmKGIpZi50aGVuKGIpO2Vsc2UgcmV0dXJuIGY7cmV0dXJuIHRoaXN9aWYoYilyZXR1cm4gdGhpcy5hZGQoYSxjLG51bGwsZCwhMCksYigpLHRoaXN9Yz10aGlzLmVuY29kZShjKTtpZighYy5sZW5ndGgpcmV0dXJuIHRoaXM7Yj10aGlzLmY7ZT1PKGIpP2IoYyk6Yy5zcGxpdCh0aGlzLnNwbGl0KTt0aGlzLmZpbHRlciYmKGU9VyhlLHRoaXMuZmlsdGVyKSk7Y29uc3Qgbj1CKCk7bi5fY3R4PUIoKTtjb25zdCBtPWUubGVuZ3RoLHU9dGhpcy50aHJlc2hvbGQscT10aGlzLmRlcHRoLEE9dGhpcy5iLHo9dGhpcy5pLHk9dGhpcy5EO2ZvcihsZXQgdD1cbjA7dDxtO3QrKyl7dmFyIGg9ZVt0XTtpZihoKXt2YXIgZz1oLmxlbmd0aCxrPSh5P3QrMTptLXQpL20sbD1cIlwiO3N3aXRjaChiKXtjYXNlIFwicmV2ZXJzZVwiOmNhc2UgXCJib3RoXCI6Zm9yKHZhciBwPWc7LS1wOylsPWhbcF0rbCxWKHosbixsLGEseT8xOihnLXApL2csayx1LEEtMSk7bD1cIlwiO2Nhc2UgXCJmb3J3YXJkXCI6Zm9yKHA9MDtwPGc7cCsrKWwrPWhbcF0sVih6LG4sbCxhLHk/KHArMSkvZzoxLGssdSxBLTEpO2JyZWFrO2Nhc2UgXCJmdWxsXCI6Zm9yKHA9MDtwPGc7cCsrKXtjb25zdCB2PSh5P3ArMTpnLXApL2c7Zm9yKGxldCB4PWc7eD5wO3gtLSlsPWguc3Vic3RyaW5nKHAseCksVih6LG4sbCxhLHYsayx1LEEtMSl9YnJlYWs7ZGVmYXVsdDppZihnPVYoeixuLGgsYSwxLGssdSxBLTEpLHEmJjE8bSYmZz49dSlmb3IoZz1uLl9jdHhbaF18fChuLl9jdHhbaF09QigpKSxoPXRoaXMuaFtoXXx8KHRoaXMuaFtoXT1pYShBLSh1fHwwKSkpLGs9dC1xLGw9dCtxKzEsMD5rJiYoaz0wKSxsPlxubSYmKGw9bSk7azxsO2srKylrIT09dCYmVihoLGcsZVtrXSxhLDAsQS0oazx0P3QtazprLXQpLHUsQS0xKX19fXRoaXMuY1tmXT0xO3RoaXMuQj0hMX1yZXR1cm4gdGhpc307dy5wcm90b3R5cGUuQT1mdW5jdGlvbihhLGMsYil7aWYoRihjKSl7dmFyIGQ9Yy5sZW5ndGg7aWYoZC0tKXtmb3IodmFyIGU9MDtlPGQ7ZSsrKXRoaXMuQShhLGNbZV0pO3JldHVybiB0aGlzLkEoYSxjW2RdLGIpfX1lbHNle3ZhciBmPXRoaXMuYS5pbmRleCxoPXRoaXMuYS5rZXlzLGc9dGhpcy5hLnRhZztlPXRoaXMuYS5zdG9yZTt2YXIgazt2YXIgbD10aGlzLmEuaWQ7ZD1jO2Zvcih2YXIgcD0wO3A8bC5sZW5ndGg7cCsrKWQ9ZFtsW3BdXTtpZihcInJlbW92ZVwiPT09YSYmKGRlbGV0ZSB0aGlzLmxbZF0sbD1oLmxlbmd0aCxsLS0pKXtmb3IoYz0wO2M8bDtjKyspZltoW2NdXS5yZW1vdmUoZCk7cmV0dXJuIGZbaFtsXV0ucmVtb3ZlKGQsYil9aWYoZyl7Zm9yKGs9MDtrPGcubGVuZ3RoO2srKyl7dmFyIG49Z1trXTtcbnZhciBtPWM7bD1uLnNwbGl0KFwiOlwiKTtmb3IocD0wO3A8bC5sZW5ndGg7cCsrKW09bVtsW3BdXTttPVwiQFwiK219az10aGlzLkdbbl07az1rW21dfHwoa1ttXT1bXSl9bD10aGlzLmEuZmllbGQ7Zm9yKGxldCB1PTAscT1sLmxlbmd0aDt1PHE7dSsrKXtuPWxbdV07Zz1jO2ZvcihtPTA7bTxuLmxlbmd0aDttKyspZz1nW25bbV1dO249ZltoW3VdXTttPVwiYWRkXCI9PT1hP24uYWRkOm4udXBkYXRlO3U9PT1xLTE/bS5jYWxsKG4sZCxnLGIpOm0uY2FsbChuLGQsZyl9aWYoZSl7Yj1PYmplY3Qua2V5cyhlKTthPUIoKTtmb3IoZj0wO2Y8Yi5sZW5ndGg7ZisrKWlmKGg9YltmXSxlW2hdKXtoPWguc3BsaXQoXCI6XCIpO2xldCB1LHE7Zm9yKGw9MDtsPGgubGVuZ3RoO2wrKylnPWhbbF0sdT0odXx8YylbZ10scT0ocXx8YSlbZ109dX1jPWF9ayYmKGtbay5sZW5ndGhdPWMpO3RoaXMubFtkXT1jfXJldHVybiB0aGlzfTt3LnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24oYSxjLGIpe2lmKHRoaXMuYSYmXG5HKGEpKXJldHVybiB0aGlzLkEoXCJ1cGRhdGVcIixhLGMpO3RoaXMuY1tcIkBcIithXSYmSihjKSYmKHRoaXMucmVtb3ZlKGEpLHRoaXMuYWRkKGEsYyxiLCEwKSk7cmV0dXJuIHRoaXN9O3cucHJvdG90eXBlLnJlbW92ZT1mdW5jdGlvbihhLGMsYil7aWYodGhpcy5hJiZHKGEpKXJldHVybiB0aGlzLkEoXCJyZW1vdmVcIixhLGMpO3ZhciBkPVwiQFwiK2E7aWYodGhpcy5jW2RdKXtpZih0aGlzLmcpcmV0dXJuIHRoaXMubVt0aGlzLmNbZF1dLnBvc3RNZXNzYWdlKHtyZW1vdmU6ITAsaWQ6YX0pLGRlbGV0ZSB0aGlzLmNbZF0sYyYmYygpLHRoaXM7aWYoIWIpe2lmKHRoaXMuYXN5bmMmJlwiZnVuY3Rpb25cIiE9PXR5cGVvZiBpbXBvcnRTY3JpcHRzKXtsZXQgZT10aGlzO2Q9bmV3IFByb21pc2UoZnVuY3Rpb24oZil7c2V0VGltZW91dChmdW5jdGlvbigpe2UucmVtb3ZlKGEsbnVsbCwhMCk7ZT1udWxsO2YoKX0pfSk7aWYoYylkLnRoZW4oYyk7ZWxzZSByZXR1cm4gZDtyZXR1cm4gdGhpc31pZihjKXJldHVybiB0aGlzLnJlbW92ZShhLFxubnVsbCwhMCksYygpLHRoaXN9Zm9yKGM9MDtjPHRoaXMuYi0odGhpcy50aHJlc2hvbGR8fDApO2MrKyliYSh0aGlzLmlbY10sYSk7dGhpcy5kZXB0aCYmYmEodGhpcy5oLGEpO2RlbGV0ZSB0aGlzLmNbZF07dGhpcy5CPSExfXJldHVybiB0aGlzfTtsZXQgTTt3LnByb3RvdHlwZS5zZWFyY2g9ZnVuY3Rpb24oYSxjLGIsZCl7aWYoRyhjKSl7aWYoRihjKSlmb3IodmFyIGU9MDtlPGMubGVuZ3RoO2UrKyljW2VdLnF1ZXJ5PWE7ZWxzZSBjLnF1ZXJ5PWE7YT1jO2M9MUUzfWVsc2UgYyYmTyhjKT8oYj1jLGM9MUUzKTpjfHwwPT09Y3x8KGM9MUUzKTtpZih0aGlzLmcpe3RoaXMuRj1iO3RoaXMudT0wO3RoaXMubz1bXTtmb3IodmFyIGY9MDtmPHRoaXMuZztmKyspdGhpcy5tW2ZdLnBvc3RNZXNzYWdlKHtzZWFyY2g6ITAsbGltaXQ6Yyxjb250ZW50OmF9KX1lbHNle3ZhciBoPVtdLGc9YTtpZihHKGEpJiYhRihhKSl7Ynx8KGI9YS5jYWxsYmFjaykmJihnLmNhbGxiYWNrPW51bGwpO3ZhciBrPVxuYS5zb3J0O3ZhciBsPWEucGFnZTtjPWEubGltaXQ7Zj1hLnRocmVzaG9sZDt2YXIgcD1hLnN1Z2dlc3Q7YT1hLnF1ZXJ5fWlmKHRoaXMuYSl7Zj10aGlzLmEuaW5kZXg7Y29uc3QgeT1nLndoZXJlO3ZhciBuPWcuYm9vbHx8XCJvclwiLG09Zy5maWVsZDtsZXQgdD1uO2xldCB2LHg7aWYobSlGKG0pfHwobT1bbV0pO2Vsc2UgaWYoRihnKSl7dmFyIHU9ZzttPVtdO3Q9W107Zm9yKHZhciBxPTA7cTxnLmxlbmd0aDtxKyspZD1nW3FdLGU9ZC5ib29sfHxuLG1bcV09ZC5maWVsZCx0W3FdPWUsXCJub3RcIj09PWU/dj0hMDpcImFuZFwiPT09ZSYmKHg9ITApfWVsc2UgbT10aGlzLmEua2V5cztuPW0ubGVuZ3RoO2ZvcihxPTA7cTxuO3ErKyl1JiYoZz11W3FdKSxsJiYhSihnKSYmKGcucGFnZT1udWxsLGcubGltaXQ9MCksaFtxXT1mW21bcV1dLnNlYXJjaChnLDApO2lmKGIpcmV0dXJuIGIoUC5jYWxsKHRoaXMsYSx0LGgsayxjLHAseSxsLHgsdikpO2lmKHRoaXMuYXN5bmMpe2NvbnN0IEk9dGhpcztyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24oRCl7UHJvbWlzZS5hbGwoaCkudGhlbihmdW5jdGlvbihFKXtEKFAuY2FsbChJLFxuYSx0LEUsayxjLHAseSxsLHgsdikpfSl9KX1yZXR1cm4gUC5jYWxsKHRoaXMsYSx0LGgsayxjLHAseSxsLHgsdil9Znx8KGY9dGhpcy50aHJlc2hvbGR8fDApO2lmKCFkKXtpZih0aGlzLmFzeW5jJiZcImZ1bmN0aW9uXCIhPT10eXBlb2YgaW1wb3J0U2NyaXB0cyl7bGV0IHk9dGhpcztmPW5ldyBQcm9taXNlKGZ1bmN0aW9uKHQpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt0KHkuc2VhcmNoKGcsYyxudWxsLCEwKSk7eT1udWxsfSl9KTtpZihiKWYudGhlbihiKTtlbHNlIHJldHVybiBmO3JldHVybiB0aGlzfWlmKGIpcmV0dXJuIGIodGhpcy5zZWFyY2goZyxjLG51bGwsITApKSx0aGlzfWlmKCFhfHwhSihhKSlyZXR1cm4gaDtnPWE7aWYodGhpcy5jYWNoZSlpZih0aGlzLkIpe2lmKGI9dGhpcy5qLmdldChhKSlyZXR1cm4gYn1lbHNlIHRoaXMuai5jbGVhcigpLHRoaXMuQj0hMDtnPXRoaXMuZW5jb2RlKGcpO2lmKCFnLmxlbmd0aClyZXR1cm4gaDtiPXRoaXMuZjtiPU8oYik/YihnKTpnLnNwbGl0KHRoaXMuc3BsaXQpO1xudGhpcy5maWx0ZXImJihiPVcoYix0aGlzLmZpbHRlcikpO3U9Yi5sZW5ndGg7ZD0hMDtlPVtdO3ZhciBBPUIoKSx6PTA7MTx1JiYodGhpcy5kZXB0aCYmXCJzdHJpY3RcIj09PXRoaXMuZj9uPSEwOmIuc29ydChxYSkpO2lmKCFufHwocT10aGlzLmgpKXtjb25zdCB5PXRoaXMuYjtmb3IoO3o8dTt6Kyspe2xldCB0PWJbel07aWYodCl7aWYobil7aWYoIW0paWYocVt0XSltPXQsQVt0XT0xO2Vsc2UgaWYoIXApcmV0dXJuIGg7aWYocCYmej09PXUtMSYmIWUubGVuZ3RoKW49ITEsdD1tfHx0LEFbdF09MDtlbHNlIGlmKCFtKWNvbnRpbnVlfWlmKCFBW3RdKXtjb25zdCB2PVtdO2xldCB4PSExLEk9MDtjb25zdCBEPW4/cVttXTp0aGlzLmk7aWYoRCl7bGV0IEU7Zm9yKGxldCBOPTA7Tjx5LWY7TisrKWlmKEU9RFtOXSYmRFtOXVt0XSl2W0krK109RSx4PSEwfWlmKHgpbT10LGVbZS5sZW5ndGhdPTE8ST92LmNvbmNhdC5hcHBseShbXSx2KTp2WzBdO2Vsc2UgaWYoIXApe2Q9ITE7YnJlYWt9QVt0XT1cbjF9fX19ZWxzZSBkPSExO2QmJihoPWhhKGUsYyxsLHApKTt0aGlzLmNhY2hlJiZ0aGlzLmouc2V0KGEsaCk7cmV0dXJuIGh9fTt3LnByb3RvdHlwZS5maW5kPWZ1bmN0aW9uKGEsYyl7cmV0dXJuIHRoaXMud2hlcmUoYSxjLDEpWzBdfHxudWxsfTt3LnByb3RvdHlwZS53aGVyZT1mdW5jdGlvbihhLGMsYixkKXtjb25zdCBlPXRoaXMubCxmPVtdO2xldCBoPTA7bGV0IGc7dmFyIGs7bGV0IGw7aWYoRyhhKSl7Ynx8KGI9Yyk7dmFyIHA9T2JqZWN0LmtleXMoYSk7dmFyIG49cC5sZW5ndGg7Zz0hMTtpZigxPT09biYmXCJpZFwiPT09cFswXSlyZXR1cm5bZVthLmlkXV07aWYoKGs9dGhpcy5JKSYmIWQpZm9yKHZhciBtPTA7bTxrLmxlbmd0aDttKyspe3ZhciB1PWtbbV0scT1hW3VdO2lmKCFDKHEpKXtsPXRoaXMuR1t1XVtcIkBcIitxXTtpZigwPT09LS1uKXJldHVybiBsO3Auc3BsaWNlKHAuaW5kZXhPZih1KSwxKTtkZWxldGUgYVt1XTticmVha319az1BcnJheShuKTtmb3IobT0wO208bjttKyspa1ttXT1cbnBbbV0uc3BsaXQoXCI6XCIpfWVsc2V7aWYoTyhhKSl7Yz1kfHxPYmplY3Qua2V5cyhlKTtiPWMubGVuZ3RoO2ZvcihwPTA7cDxiO3ArKyluPWVbY1twXV0sYShuKSYmKGZbaCsrXT1uKTtyZXR1cm4gZn1pZihDKGMpKXJldHVybltlW2FdXTtpZihcImlkXCI9PT1hKXJldHVybltlW2NdXTtwPVthXTtuPTE7az1bYS5zcGxpdChcIjpcIildO2c9ITB9ZD1sfHxkfHxPYmplY3Qua2V5cyhlKTttPWQubGVuZ3RoO2Zvcih1PTA7dTxtO3UrKyl7cT1sP2RbdV06ZVtkW3VdXTtsZXQgQT0hMDtmb3IobGV0IHo9MDt6PG47eisrKXtnfHwoYz1hW3Bbel1dKTtjb25zdCB5PWtbel0sdD15Lmxlbmd0aDtsZXQgdj1xO2lmKDE8dClmb3IobGV0IHg9MDt4PHQ7eCsrKXY9dlt5W3hdXTtlbHNlIHY9dlt5WzBdXTtpZih2IT09Yyl7QT0hMTticmVha319aWYoQSYmKGZbaCsrXT1xLGImJmg9PT1iKSlicmVha31yZXR1cm4gZn07dy5wcm90b3R5cGUuaW5mbz1mdW5jdGlvbigpe2lmKHRoaXMuZylmb3IobGV0IGE9MDthPFxudGhpcy5nO2ErKyl0aGlzLm1bYV0ucG9zdE1lc3NhZ2Uoe2luZm86ITAsaWQ6dGhpcy5pZH0pO2Vsc2UgcmV0dXJue2lkOnRoaXMuaWQsaXRlbXM6dGhpcy5sZW5ndGgsY2FjaGU6dGhpcy5jYWNoZSYmdGhpcy5jYWNoZS5zP3RoaXMuY2FjaGUucy5sZW5ndGg6ITEsbWF0Y2hlcjphYS5sZW5ndGgrKHRoaXMudj90aGlzLnYubGVuZ3RoOjApLHdvcmtlcjp0aGlzLmcsdGhyZXNob2xkOnRoaXMudGhyZXNob2xkLGRlcHRoOnRoaXMuZGVwdGgscmVzb2x1dGlvbjp0aGlzLmIsY29udGV4dHVhbDp0aGlzLmRlcHRoJiZcInN0cmljdFwiPT09dGhpcy5mfX07dy5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kZXN0cm95KCkuaW5pdCgpfTt3LnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy5jYWNoZSYmKHRoaXMuai5jbGVhcigpLHRoaXMuaj1udWxsKTt0aGlzLmk9dGhpcy5oPXRoaXMuYz1udWxsO2lmKHRoaXMuYSl7Y29uc3QgYT10aGlzLmEua2V5cztmb3IobGV0IGM9XG4wO2M8YS5sZW5ndGg7YysrKXRoaXMuYS5pbmRleFthW2NdXS5kZXN0cm95KCk7dGhpcy5hPXRoaXMubD1udWxsfXJldHVybiB0aGlzfTt3LnByb3RvdHlwZS5leHBvcnQ9ZnVuY3Rpb24oYSl7Y29uc3QgYz0hYXx8QyhhLnNlcmlhbGl6ZSl8fGEuc2VyaWFsaXplO2lmKHRoaXMuYSl7Y29uc3QgZD0hYXx8QyhhLmRvYyl8fGEuZG9jO3ZhciBiPSFhfHxDKGEuaW5kZXgpfHxhLmluZGV4O2E9W107bGV0IGU9MDtpZihiKWZvcihiPXRoaXMuYS5rZXlzO2U8Yi5sZW5ndGg7ZSsrKXtjb25zdCBmPXRoaXMuYS5pbmRleFtiW2VdXTthW2VdPVtmLmksZi5oLE9iamVjdC5rZXlzKGYuYyldfWQmJihhW2VdPXRoaXMubCl9ZWxzZSBhPVt0aGlzLmksdGhpcy5oLE9iamVjdC5rZXlzKHRoaXMuYyldO2MmJihhPUpTT04uc3RyaW5naWZ5KGEpKTtyZXR1cm4gYX07dy5wcm90b3R5cGUuaW1wb3J0PWZ1bmN0aW9uKGEsYyl7aWYoIWN8fEMoYy5zZXJpYWxpemUpfHxjLnNlcmlhbGl6ZSlhPUpTT04ucGFyc2UoYSk7XG5jb25zdCBiPUIoKTtpZih0aGlzLmEpe3ZhciBkPSFjfHxDKGMuZG9jKXx8Yy5kb2MsZT0wO2lmKCFjfHxDKGMuaW5kZXgpfHxjLmluZGV4KXtjPXRoaXMuYS5rZXlzO2NvbnN0IGg9Yy5sZW5ndGg7Zm9yKHZhciBmPWFbMF1bMl07ZTxmLmxlbmd0aDtlKyspYltmW2VdXT0xO2ZvcihlPTA7ZTxoO2UrKyl7Zj10aGlzLmEuaW5kZXhbY1tlXV07Y29uc3QgZz1hW2VdO2cmJihmLmk9Z1swXSxmLmg9Z1sxXSxmLmM9Yil9fWQmJih0aGlzLmw9RyhkKT9kOmFbZV0pfWVsc2V7ZD1hWzJdO2ZvcihlPTA7ZTxkLmxlbmd0aDtlKyspYltkW2VdXT0xO3RoaXMuaT1hWzBdO3RoaXMuaD1hWzFdO3RoaXMuYz1ifX07Y29uc3QgdmE9ZnVuY3Rpb24oKXtjb25zdCBhPXIoXCJcXFxccytcIiksYz1yKFwiW15hLXowLTkgXVwiKSxiPVtyKFwiWy0vXVwiKSxcIiBcIixjLFwiXCIsYSxcIiBcIl07cmV0dXJuIGZ1bmN0aW9uKGQpe3JldHVybiBjYShRKGQudG9Mb3dlckNhc2UoKSxiKSl9fSgpLFU9e2ljYXNlOmZ1bmN0aW9uKGEpe3JldHVybiBhLnRvTG93ZXJDYXNlKCl9LFxuc2ltcGxlOmZ1bmN0aW9uKCl7Y29uc3QgYT1yKFwiXFxcXHMrXCIpLGM9cihcIlteYS16MC05IF1cIiksYj1yKFwiWy0vXVwiKSxkPXIoXCJbXFx1MDBlMFxcdTAwZTFcXHUwMGUyXFx1MDBlM1xcdTAwZTRcXHUwMGU1XVwiKSxlPXIoXCJbXFx1MDBlOFxcdTAwZTlcXHUwMGVhXFx1MDBlYl1cIiksZj1yKFwiW1xcdTAwZWNcXHUwMGVkXFx1MDBlZVxcdTAwZWZdXCIpLGg9cihcIltcXHUwMGYyXFx1MDBmM1xcdTAwZjRcXHUwMGY1XFx1MDBmNlxcdTAxNTFdXCIpLGc9cihcIltcXHUwMGY5XFx1MDBmYVxcdTAwZmJcXHUwMGZjXFx1MDE3MV1cIiksaz1yKFwiW1xcdTAwZmRcXHUwMTc3XFx1MDBmZl1cIiksbD1yKFwiXFx1MDBmMVwiKSxwPXIoXCJbXFx1MDBlN2NdXCIpLG49cihcIlxcdTAwZGZcIiksbT1yKFwiICYgXCIpLHU9W2QsXCJhXCIsZSxcImVcIixmLFwiaVwiLGgsXCJvXCIsZyxcInVcIixrLFwieVwiLGwsXCJuXCIscCxcImtcIixuLFwic1wiLG0sXCIgYW5kIFwiLGIsXCIgXCIsYyxcIlwiLGEsXCIgXCJdO3JldHVybiBmdW5jdGlvbihxKXtxPVEocS50b0xvd2VyQ2FzZSgpLHUpO3JldHVyblwiIFwiPT09cT9cIlwiOnF9fSgpLGFkdmFuY2VkOmZ1bmN0aW9uKCl7Y29uc3QgYT1cbnIoXCJhZVwiKSxjPXIoXCJhaVwiKSxiPXIoXCJheVwiKSxkPXIoXCJleVwiKSxlPXIoXCJvZVwiKSxmPXIoXCJ1ZVwiKSxoPXIoXCJpZVwiKSxnPXIoXCJzelwiKSxrPXIoXCJ6c1wiKSxsPXIoXCJja1wiKSxwPXIoXCJjY1wiKSxuPXIoXCJzaFwiKSxtPXIoXCJ0aFwiKSx1PXIoXCJkdFwiKSxxPXIoXCJwaFwiKSxBPXIoXCJwZlwiKSx6PXIoXCJvdVwiKSx5PXIoXCJ1b1wiKSx0PVthLFwiYVwiLGMsXCJlaVwiLGIsXCJlaVwiLGQsXCJlaVwiLGUsXCJvXCIsZixcInVcIixoLFwiaVwiLGcsXCJzXCIsayxcInNcIixuLFwic1wiLGwsXCJrXCIscCxcImtcIixtLFwidFwiLHUsXCJ0XCIscSxcImZcIixBLFwiZlwiLHosXCJvXCIseSxcInVcIl07cmV0dXJuIGZ1bmN0aW9uKHYseCl7aWYoIXYpcmV0dXJuIHY7dj10aGlzLnNpbXBsZSh2KTsyPHYubGVuZ3RoJiYodj1RKHYsdCkpO3h8fDE8di5sZW5ndGgmJih2PWNhKHYpKTtyZXR1cm4gdn19KCksZXh0cmE6ZnVuY3Rpb24oKXtjb25zdCBhPXIoXCJwXCIpLGM9cihcInpcIiksYj1yKFwiW2NncV1cIiksZD1yKFwiblwiKSxlPXIoXCJkXCIpLGY9cihcIlt2d11cIiksaD1yKFwiW2FlaW91eV1cIiksXG5nPVthLFwiYlwiLGMsXCJzXCIsYixcImtcIixkLFwibVwiLGUsXCJ0XCIsZixcImZcIixoLFwiXCJdO3JldHVybiBmdW5jdGlvbihrKXtpZighaylyZXR1cm4gaztrPXRoaXMuYWR2YW5jZWQoaywhMCk7aWYoMTxrLmxlbmd0aCl7az1rLnNwbGl0KFwiIFwiKTtmb3IobGV0IGw9MDtsPGsubGVuZ3RoO2wrKyl7Y29uc3QgcD1rW2xdOzE8cC5sZW5ndGgmJihrW2xdPXBbMF0rUShwLnN1YnN0cmluZygxKSxnKSl9az1rLmpvaW4oXCIgXCIpO2s9Y2Eoayl9cmV0dXJuIGt9fSgpLGJhbGFuY2U6dmF9LHVhPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShjKXt0aGlzLmNsZWFyKCk7dGhpcy5IPSEwIT09YyYmY31hLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuY2FjaGU9QigpO3RoaXMuY291bnQ9QigpO3RoaXMuaW5kZXg9QigpO3RoaXMucz1bXX07YS5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKGMsYil7aWYodGhpcy5IJiZDKHRoaXMuY2FjaGVbY10pKXtsZXQgZD10aGlzLnMubGVuZ3RoO2lmKGQ9PT10aGlzLkgpe2QtLTtcbmNvbnN0IGU9dGhpcy5zW2RdO2RlbGV0ZSB0aGlzLmNhY2hlW2VdO2RlbGV0ZSB0aGlzLmNvdW50W2VdO2RlbGV0ZSB0aGlzLmluZGV4W2VdfXRoaXMuaW5kZXhbY109ZDt0aGlzLnNbZF09Yzt0aGlzLmNvdW50W2NdPS0xO3RoaXMuY2FjaGVbY109Yjt0aGlzLmdldChjKX1lbHNlIHRoaXMuY2FjaGVbY109Yn07YS5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKGMpe2NvbnN0IGI9dGhpcy5jYWNoZVtjXTtpZih0aGlzLkgmJmIpe3ZhciBkPSsrdGhpcy5jb3VudFtjXTtjb25zdCBmPXRoaXMuaW5kZXg7bGV0IGg9ZltjXTtpZigwPGgpe2NvbnN0IGc9dGhpcy5zO2Zvcih2YXIgZT1oO3RoaXMuY291bnRbZ1stLWhdXTw9ZCYmLTEhPT1oOyk7aCsrO2lmKGghPT1lKXtmb3IoZD1lO2Q+aDtkLS0pZT1nW2QtMV0sZ1tkXT1lLGZbZV09ZDtnW2hdPWM7ZltjXT1ofX19cmV0dXJuIGJ9O3JldHVybiBhfSgpO3JldHVybiB3fShmdW5jdGlvbigpe2NvbnN0IEs9e30sUj1cInVuZGVmaW5lZFwiIT09dHlwZW9mIEJsb2ImJlxuXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBVUkwmJlVSTC5jcmVhdGVPYmplY3RVUkw7cmV0dXJuIGZ1bmN0aW9uKHcsTCxTLFcsUCl7Uz1SP1VSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1wiKFwiK1MudG9TdHJpbmcoKStcIikoKVwiXSx7dHlwZTpcInRleHQvamF2YXNjcmlwdFwifSkpOncrXCIubWluLmpzXCI7dys9XCItXCIrTDtLW3ddfHwoS1t3XT1bXSk7S1t3XVtQXT1uZXcgV29ya2VyKFMpO0tbd11bUF0ub25tZXNzYWdlPVc7cmV0dXJuIEtbd11bUF19fSgpKSx0aGlzKTtcbiIsIi8qIGdsb2JhbCBmZXRjaCAqL1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZ21mbWkvc2VhcmNoaW5HaG9zdFxuXG5pbXBvcnQgRmxleFNlYXJjaCBmcm9tICdmbGV4c2VhcmNoJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hpbkdob3N0IHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGFuZCBlbnRyeSBwb2ludCBvZiB0aGUgbGlicmFyeVxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoYXJncykge1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAga2V5OiAnJyxcbiAgICAgIHZlcnNpb246ICd2NCcsXG4gICAgICBsb2FkT246ICdmb2N1cycsXG4gICAgICBzZWFyY2hPbjogJ2tleXVwJyxcbiAgICAgIGxpbWl0OiAxMCxcbiAgICAgIGlucHV0SWQ6IFsnc2VhcmNoLWZpZWxkJ10sXG4gICAgICBvdXRwdXRJZDogWydzZWFyY2gtcmVzdWx0cyddLFxuICAgICAgb3V0cHV0Q2hpbGRzVHlwZTogJ2xpJyxcbiAgICAgIC8vXG4gICAgICBwb3N0c0ZpZWxkczogWyd0aXRsZScsICd1cmwnLCAncHVibGlzaGVkX2F0J10sXG4gICAgICBwb3N0c0V4dHJhRmllbGRzOiBbXSxcbiAgICAgIHBvc3RzRm9ybWF0czogW10sXG4gICAgICBpbmRleGVkRmllbGRzOiBbJ3RpdGxlJ10sXG4gICAgICB0ZW1wbGF0ZTogcG9zdCA9PiBgPGEgY2xhc3M9XCJmbGV4IGl0ZW1zLWNlbnRlciBub1dyYXBXaXRoRWxsaXBzaXNcIiBocmVmPVwiJHtwb3N0LnVybH1cIj4ke3Bvc3QubmFtZSA9PT0gdW5kZWZpbmVkID8gcG9zdC50aXRsZSA6IHBvc3QubmFtZX08L2E+YCxcbiAgICAgIC8vIHRlbXBsYXRlOiBmdW5jdGlvbiAocG9zdCkge30sXG4gICAgICAvL1xuICAgICAgLy8gcG9zdHNGaWVsZHM6IFsndGl0bGUnLCAndXJsJywgJ2V4Y2VycHQnLCAnY3VzdG9tX2V4Y2VycHQnLCAncHVibGlzaGVkX2F0JywgJ2ZlYXR1cmVfaW1hZ2UnXSxcbiAgICAgIC8vIHBvc3RzRXh0cmFGaWVsZHM6IFsndGFncyddLFxuICAgICAgLy8gcG9zdHNGb3JtYXRzOiBbJ3BsYWludGV4dCddLFxuICAgICAgLy8gaW5kZXhlZEZpZWxkczogWyd0aXRsZScsICdzdHJpbmdfdGFncycsICdleGNlcnB0JywgJ3BsYWludGV4dCddLFxuICAgICAgLy8gdGVtcGxhdGU6IGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgICAvLyAgIGxldCBvID0gYDxhIGhyZWY9JyR7cG9zdC51cmx9Jz5gXG4gICAgICAvLyAgIGlmIChwb3N0LmZlYXR1cmVfaW1hZ2UpIG8gKz0gYDxpbWcgc3JjPScke3Bvc3QuZmVhdHVyZV9pbWFnZX0nPmBcbiAgICAgIC8vICAgbyArPSAnPHNlY3Rpb24+J1xuICAgICAgLy8gICBvICs9IGA8aDI+JHtwb3N0LnRpdGxlfTwvaDI+YFxuICAgICAgLy8gICBvICs9IGA8L3NlY3Rpb24+PC9hPmBcbiAgICAgIC8vICAgcmV0dXJuIG9cbiAgICAgIC8vIH0sXG4gICAgICBlbXB0eVRlbXBsYXRlOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIGN1c3RvbVByb2Nlc3Npbmc6IGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgICAgIGlmIChwb3N0LnRhZ3MpIHBvc3Quc3RyaW5nX3RhZ3MgPSBwb3N0LnRhZ3MubWFwKG8gPT4gby5uYW1lKS5qb2luKCcgJykudG9Mb3dlckNhc2UoKVxuICAgICAgICByZXR1cm4gcG9zdFxuICAgICAgfSxcbiAgICAgIGRhdGU6IHtcbiAgICAgICAgbG9jYWxlOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyB8fCAnZW4tVVMnLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgICAgIGRheTogJ251bWVyaWMnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYWNoZU1heEFnZTogMTgwMCxcbiAgICAgIG9uRmV0Y2hTdGFydDogKCkgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdpcy1sb2FkaW5nJyksXG4gICAgICBvbkZldGNoRW5kOiAoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHsgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1sb2FkaW5nJykgfSwgNDAwMCksXG4gICAgICBvbkluZGV4QnVpbGRTdGFydDogZnVuY3Rpb24gKCkge30sXG4gICAgICBvbkluZGV4QnVpbGRFbmQ6IGZ1bmN0aW9uIChpbmRleCkge30sXG4gICAgICBvblNlYXJjaFN0YXJ0OiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uU2VhcmNoRW5kOiBmdW5jdGlvbiAocG9zdHMpIHt9LFxuICAgICAgaW5kZXhPcHRpb25zOiB7fSxcbiAgICAgIHNlYXJjaE9wdGlvbnM6IHt9LFxuICAgICAgZGVidWc6IGZhbHNlXG4gICAgfVxuXG4gICAgdGhpcy5kYXRhTG9hZGVkID0gZmFsc2UgLy8gZmxhZyB0byBlbnN1cmUgZGF0YSBhcmUgcHJvcGVybHkgbG9hZGVkXG4gICAgdGhpcy5wb3N0c0NvdW50ID0gMCAvLyBrZWVwIHRyYWNrIG9mIHBvc3RzIElELCBtdXN0IGJlIG51bWVyaWNcbiAgICB0aGlzLnN0b3JhZ2UgPSB0aGlzLmdldExvY2FsU3RvcmFnZU9wdGlvbigpXG5cbiAgICB0aGlzLmluaXRDb25maWcoYXJncylcbiAgICB0aGlzLnRyaWdnZXJEYXRhTG9hZCgpXG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhlIHVzZXIgY29uZmlndXJhdGlvbiBhbmQgaW5pdGlhbGl6ZSBpbXBvcnRhbnQgdmFyaWFibGVzXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IGFyZ3NcbiAgICovXG4gIGluaXRDb25maWcgKGFyZ3MpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhhcmdzKSkge1xuICAgICAgdGhpcy5jb25maWdba2V5XSA9IHZhbHVlXG4gICAgfVxuXG4gICAgLy8gZW5zdXJlIGNvbmZpZyBiYWNrd2FyZCBjb21wYXRpbGliaXR5IG9mIDwxLjUuMFxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmNvbmZpZy5pbnB1dElkKSkgdGhpcy5jb25maWcuaW5wdXRJZCA9IFt0aGlzLmNvbmZpZy5pbnB1dElkXVxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmNvbmZpZy5vdXRwdXRJZCkpIHRoaXMuY29uZmlnLm91dHB1dElkID0gW3RoaXMuY29uZmlnLm91dHB1dElkXVxuXG4gICAgLy8gSW5qZWN0IHRoZSAnbGltaXQnIGFyZyB3aXRoaW4gdGhlIGZpbmFsIHNlYXJjaE9wdGlvbnNcbiAgICB0aGlzLmNvbmZpZy5zZWFyY2hPcHRpb25zLmxpbWl0ID0gdGhpcy5jb25maWcubGltaXRcblxuICAgIC8vIEVuc3VyZSAndXBkYXRlZF9hdCcgd2lsbCBiZSBmZXRjaGVkLCBuZWVkZWQgZm9yIHRoZSBsb2NhbCBzdG9yYWdlIGxvZ2ljXG4gICAgdGhpcy5vcmlnaW5hbFBvc3RzRmllbGRzID0gdGhpcy5jb25maWcucG9zdHNGaWVsZHNcbiAgICBpZiAoIXRoaXMuY29uZmlnLnBvc3RzRmllbGRzLmluY2x1ZGVzKCd1cGRhdGVkX2F0JykpIHtcbiAgICAgIHRoaXMuY29uZmlnLnBvc3RzRmllbGRzLnB1c2goJ3VwZGF0ZWRfYXQnKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5pbnB1dElkICYmIHRoaXMuY29uZmlnLmlucHV0SWQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZWFyY2hCYXJFbHMgPSBbXVxuICAgICAgdGhpcy5jb25maWcuaW5wdXRJZC5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG4gICAgICAgIGlmIChzZWFyY2hCYXIpIHtcbiAgICAgICAgICB0aGlzLnNlYXJjaEJhckVscy5wdXNoKHNlYXJjaEJhcilcbiAgICAgICAgICB0aGlzLmFkZFNlYXJjaExpc3RlbmVycyhzZWFyY2hCYXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lcnJvcihgRW5hYmxlIHRvIGZpbmQgdGhlIGlucHV0IGVsZW1lbnQgIyR7aWR9LCBwbGVhc2UgY2hlY2sgeW91ciBjb25maWd1cmF0aW9uYClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcub3V0cHV0SWQgJiYgdGhpcy5jb25maWcub3V0cHV0SWQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZWFyY2hSZXN1bHRFbHMgPSBbXVxuICAgICAgdGhpcy5jb25maWcub3V0cHV0SWQuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuICAgICAgICBpZiAoc2VhcmNoUmVzdWx0KSB7XG4gICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRFbHMucHVzaChzZWFyY2hSZXN1bHQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lcnJvcihgRW5hYmxlIHRvIGZpbmQgdGhlIG91dHB1dCBlbGVtZW50ICMke2lkfSwgcGxlYXNlIGNoZWNrIHlvdXIgY29uZmlndXJhdGlvbmApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5pbmRleCA9IHRoaXMuZ2V0TmV3U2VhcmNoSW5kZXgoKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgc2VhcmNoIGlucHV0IGJhciBhbmQgZm9ybSBldmVudCBsaXN0ZW5lcnMgdG8gdHJpZ2dlclxuICAgKiBmdXJ0aGVyIHNlYXJjaGVzXG4gICAqL1xuICBhZGRTZWFyY2hMaXN0ZW5lcnMgKHNlYXJjaEJhckVsKSB7XG4gICAgLy8gSW4gYW55IGNhc2UsIHByZXZlbnQgdGhlIGlucHV0IGZvcm0gZnJvbSBiZWluZyBzdWJtaXR0ZWRcbiAgICBjb25zdCBzZWFyY2hGb3JtID0gc2VhcmNoQmFyRWwuY2xvc2VzdCgnZm9ybScpXG5cbiAgICBpZiAoc2VhcmNoRm9ybSkge1xuICAgICAgc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXYpID0+IHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMuY29uZmlnLnNlYXJjaE9uKSB7XG4gICAgICBjYXNlICdrZXl1cCc6XG4gICAgICAgIHNlYXJjaEJhckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlucHV0UXVlcnkgPSBzZWFyY2hCYXJFbC52YWx1ZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgdGhpcy5zZWFyY2goaW5wdXRRdWVyeSlcbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICAgIHNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlucHV0UXVlcnkgPSBzZWFyY2hCYXJFbC52YWx1ZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgdGhpcy5zZWFyY2goaW5wdXRRdWVyeSlcbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICBjYXNlICdub25lJzpcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5lcnJvcihgVW5rbm93biAnc2VhcmNoT24nIG9wdGlvbjogJyR7dGhpcy5jb25maWcuc2VhcmNoT259J2ApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0cmlnZ2VycyB0byBsb2FkIHRoZSBwb3N0cyBkYXRhIHdoZW4gcmVhZHlcbiAgICovXG4gIHRyaWdnZXJEYXRhTG9hZCAoKSB7XG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZy5sb2FkT24pIHtcbiAgICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgICAgdGhpcy5zZWFyY2hCYXJFbHMuZm9yRWFjaChzZWFyY2hCYXJFbCA9PiB7XG4gICAgICAgICAgc2VhcmNoQmFyRWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKClcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAncGFnZSc6XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZERhdGEoKVxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmVycm9yKGBVbmtub3duICdsb2FkT24nIG9wdGlvbjogJyR7dGhpcy5jb25maWcubG9hZE9ufSdgKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBY3R1YWxseSBsb2FkIHRoZSBkYXRhIGludG8gYSBzZWFyY2hhYmxlIGluZGV4LlxuICAgKiBXaGVuIHRoaXMgbWV0aG9kIGlzIGNvbXBsZXRlZCwgd2UgYXJlIHJlYWR5IHRvIGxhdW5jaCBzZWFyY2ggcXVlcmllcy5cbiAgICovXG4gIGxvYWREYXRhICgpIHtcbiAgICBpZiAodGhpcy5kYXRhTG9hZGVkKSByZXR1cm5cblxuICAgIGlmICghdGhpcy5zdG9yYWdlKSB7XG4gICAgICB0aGlzLmxvZygnTm8gbG9jYWwgc3RvcmFnZSBhdmFpbGFibGUsIHN3aXRjaCB0byBkZWdyYWRlZCBtb2RlJylcbiAgICAgIHRoaXMuZmV0Y2goKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgc3RvcmVkSW5kZXggPSB0aGlzLnN0b3JhZ2UuZ2V0SXRlbSgnU2VhcmNoaW5HaG9zdF9pbmRleCcpXG4gICAgaWYgKHN0b3JlZEluZGV4KSB7XG4gICAgICB0aGlzLmxvZygnRm91bmQgYW4gaW5kZXggc3RvcmVkIGxvY2FsbHksIGxvYWRzIGl0JylcbiAgICAgIHRoaXMuY29uZmlnLm9uSW5kZXhCdWlsZFN0YXJ0KClcbiAgICAgIHRoaXMuaW5kZXguaW1wb3J0KHN0b3JlZEluZGV4KVxuICAgICAgdGhpcy5kYXRhTG9hZGVkID0gdHJ1ZVxuICAgICAgdGhpcy5jb25maWcub25JbmRleEJ1aWxkRW5kKHRoaXMuaW5kZXgpXG4gICAgICB0aGlzLnZhbGlkYXRlQ2FjaGUoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZygnTm8gYWxyZWFkeSBzdG9yZWQgaW5kZXggZm91bmQnKVxuICAgICAgdGhpcy5mZXRjaCgpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZSBzdG9yZWQgZGF0YSBhcmUgdXAgdG8gZGF0ZS5cbiAgICovXG4gIHZhbGlkYXRlQ2FjaGUgKCkge1xuICAgIGNvbnN0IGNhY2hlSW5mb1N0cmluZyA9IHRoaXMuc3RvcmFnZS5nZXRJdGVtKCdTZWFyY2hpbkdob3N0X2NhY2hlX2luZm8nKVxuICAgIGlmICghY2FjaGVJbmZvU3RyaW5nKSB7XG4gICAgICB0aGlzLmxvZygnTm8gY2FjaGUgaW5mbyBsb2NhbCBvYmplY3QgZm91bmQnKVxuICAgICAgdGhpcy5mZXRjaCgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZUluZm8gPSBKU09OLnBhcnNlKGNhY2hlSW5mb1N0cmluZylcblxuICAgIGNvbnN0IGxhc3RVcGRhdGUgPSBuZXcgRGF0ZShjYWNoZUluZm8ubGFzdENhY2hlQ2hlY2spXG4gICAgY29uc3QgZWxhcHNlZFRpbWUgPSBNYXRoLnJvdW5kKChuZXcgRGF0ZSgpIC0gbGFzdFVwZGF0ZSkgLyAxMDAwKVxuICAgIGlmIChlbGFwc2VkVGltZSA8IHRoaXMuY29uZmlnLmNhY2hlTWF4QWdlKSB7XG4gICAgICB0aGlzLmxvZyhgU2tpcCBjYWNoZSByZWZyZXNoaW5nLCB1cGRhdGVkIGxlc3MgdGhhbiAke3RoaXMuY29uZmlnLmNhY2hlTWF4QWdlfXMgYWdvICgke2VsYXBzZWRUaW1lfXMpYClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGJyb3dzZU9wdGlvbnMgPSB7XG4gICAgICBsaW1pdDogMSxcbiAgICAgIGZpZWxkczogWyd1cGRhdGVkX2F0J10sXG4gICAgICBvcmRlcjogJ3VwZGF0ZWRfYXQgREVTQydcbiAgICB9XG4gICAgY29uc3QgbGFzdFVwZGF0ZWRQb3N0VXJsID0gdGhpcy5idWlsZFVybChicm93c2VPcHRpb25zKVxuXG4gICAgZmV0Y2gobGFzdFVwZGF0ZWRQb3N0VXJsKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcbiAgICAgIH0pXG4gICAgICAudGhlbigoanNvblJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhc3Rlc3RQb3N0VXBkYXRlZEF0ID0ganNvblJlc3BvbnNlLnBvc3RzWzBdLnVwZGF0ZWRfYXRcbiAgICAgICAgY29uc3QgdG90YWxQb3N0cyA9IGpzb25SZXNwb25zZS5tZXRhLnBhZ2luYXRpb24udG90YWxcblxuICAgICAgICBpZiAobGFzdGVzdFBvc3RVcGRhdGVkQXQgIT09IGNhY2hlSW5mby5sYXN0ZXN0UG9zdFVwZGF0ZWRBdCkge1xuICAgICAgICAgIHRoaXMubG9nKCdQb3N0cyB1cGRhdGUgZm91bmQsIHB1cmdlIG91dGRhdGVkIGxvY2FsIGNhY2hlJylcbiAgICAgICAgICB0aGlzLmZldGNoKClcbiAgICAgICAgfSBlbHNlIGlmICh0b3RhbFBvc3RzIDwgY2FjaGVJbmZvLnRvdGFsUG9zdHMpIHtcbiAgICAgICAgICB0aGlzLmxvZygnRGVsZXRlZCBvciB1bnB1Ymxpc2hlZCBwb3N0cyBmb3VuZCwgcHVyZ2Ugb3V0ZGF0ZWQgbG9jYWwgY2FjaGUnKVxuICAgICAgICAgIHRoaXMuZmV0Y2goKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nKCdMb2NhbCBjYWNoZWQgZGF0YSB1cCB0byBkYXRlJylcbiAgICAgICAgICBjYWNoZUluZm8ubGFzdENhY2hlQ2hlY2sgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSgnU2VhcmNoaW5HaG9zdF9jYWNoZV9pbmZvJywgSlNPTi5zdHJpbmdpZnkoY2FjaGVJbmZvKSlcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuYWJsZSB0byBmZXRjaCB0aGUgbGF0ZXN0IHBvc3QgaW5mb3JtYXRpb24gdG8gY2hlY2sgY2FjaGUgc3RhdGUnLCBlcnJvcilcbiAgICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRmV0Y2gsIGZvcm1hdCBhbmQgc3RvcmUgcG9zdHMgZGF0YSBmcm9tIEdob3N0LlxuICAgKi9cbiAgZmV0Y2ggKCkge1xuICAgIHRoaXMubG9nKCdGZXRjaGluZyBkYXRhIGZyb20gR2hvc3QgQVBJJylcbiAgICB0aGlzLmNvbmZpZy5vbkZldGNoU3RhcnQoKVxuXG4gICAgY29uc3QgYnJvd3NlT3B0aW9ucyA9IHtcbiAgICAgIGxpbWl0OiAnYWxsJyxcbiAgICAgIGZpZWxkczogdGhpcy5jb25maWcucG9zdHNGaWVsZHMsXG4gICAgICBvcmRlcjogJ3VwZGF0ZWRfYXQgREVTQydcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLnBvc3RzRXh0cmFGaWVsZHMubGVuZ3RoID4gMCkgYnJvd3NlT3B0aW9ucy5pbmNsdWRlID0gdGhpcy5jb25maWcucG9zdHNFeHRyYUZpZWxkc1xuICAgIGlmICh0aGlzLmNvbmZpZy5wb3N0c0Zvcm1hdHMubGVuZ3RoID4gMCkgYnJvd3NlT3B0aW9ucy5mb3JtYXRzID0gdGhpcy5jb25maWcucG9zdHNGb3JtYXRzXG5cbiAgICBjb25zdCBhbGxQb3N0c1VybCA9IHRoaXMuYnVpbGRVcmwoYnJvd3NlT3B0aW9ucylcblxuICAgIGZldGNoKGFsbFBvc3RzVXJsKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcbiAgICAgIH0pXG4gICAgICAudGhlbigoanNvblJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc3RzID0ganNvblJlc3BvbnNlLnBvc3RzXG4gICAgICAgIHRoaXMuY29uZmlnLm9uRmV0Y2hFbmQocG9zdHMpXG4gICAgICAgIHRoaXMuY29uZmlnLm9uSW5kZXhCdWlsZFN0YXJ0KClcblxuICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5nZXROZXdTZWFyY2hJbmRleCgpXG4gICAgICAgIHBvc3RzLmZvckVhY2goKHBvc3QpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRQb3N0ID0gdGhpcy5mb3JtYXQocG9zdClcbiAgICAgICAgICBpZiAoZm9ybWF0dGVkUG9zdCkgdGhpcy5pbmRleC5hZGQoZm9ybWF0dGVkUG9zdClcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmRhdGFMb2FkZWQgPSB0cnVlXG4gICAgICAgIHRoaXMuY29uZmlnLm9uSW5kZXhCdWlsZEVuZCh0aGlzLmluZGV4KVxuXG4gICAgICAgIGlmICh0aGlzLnN0b3JhZ2UpIHtcbiAgICAgICAgICBjb25zdCBjYWNoZUluZm8gPSB7XG4gICAgICAgICAgICBsYXN0Q2FjaGVDaGVjazogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgbGFzdGVzdFBvc3RVcGRhdGVkQXQ6IHBvc3RzWzBdLnVwZGF0ZWRfYXQsXG4gICAgICAgICAgICB0b3RhbFBvc3RzOiBqc29uUmVzcG9uc2UubWV0YS5wYWdpbmF0aW9uLnRvdGFsXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKCdTZWFyY2hpbkdob3N0X2luZGV4JywgdGhpcy5pbmRleC5leHBvcnQoKSlcbiAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSgnU2VhcmNoaW5HaG9zdF9jYWNoZV9pbmZvJywgSlNPTi5zdHJpbmdpZnkoY2FjaGVJbmZvKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nKCdTZWFyY2ggaW5kZXggYnVpbGQgY29tcGxldGUnKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5lcnJvcignVW5hYmxlIHRvIGZldGNoIEdob3N0IGRhdGEuXFxuJywgZXJyb3IpXG4gICAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBhIHBvc3QgZG9jdW1lbnQgYmVmb3JlIGJlaW5nIGluZGV4ZWQuXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IHBvc3RcbiAgICogQHJldHVybiB7RG9jdW1lbnR9IFRoZSBmb3JtYXR0ZWQgcG9zdFxuICAgKi9cbiAgZm9ybWF0IChwb3N0KSB7XG4gICAgLy8gTmVlZCB0byB1c2UgYSBudW1lcmljIElEIHRvIGltcHJvdmUgcGVyZm9ybWFuY2UgJiBkaXNrIHNwYWNlXG4gICAgcG9zdC5pZCA9IHRoaXMucG9zdHNDb3VudCsrXG5cbiAgICAvLyBkaXNwbGF5IGRhdGUgdXNpbmcgJ2xvY2FsZScgZm9ybWF0XG4gICAgcG9zdC5wdWJsaXNoZWRfYXQgPSB0aGlzLnByZXR0eURhdGUocG9zdC5wdWJsaXNoZWRfYXQpXG5cbiAgICAvLyBvbmx5IHVzZWQgdG8ga2VlcCB0cmFjayBvZiB0aGUgbGFzdCBmZXRjaCB0aW1lLFxuICAgIC8vIHJlbW92ZSBpdCBiZWZvcmUgaW5kZXhpbmcgQlVUIG9ubHkgaWYgbm90IHdhbnRlZCBieSB0aGUgdXNlclxuICAgIGlmICghdGhpcy5vcmlnaW5hbFBvc3RzRmllbGRzLmluY2x1ZGVzKCd1cGRhdGVkX2F0JykpIHtcbiAgICAgIGRlbGV0ZSBwb3N0LnVwZGF0ZWRfYXRcbiAgICB9XG5cbiAgICBpZiAocG9zdC5jdXN0b21fZXhjZXJwdCkge1xuICAgICAgcG9zdC5leGNlcnB0ID0gcG9zdC5jdXN0b21fZXhjZXJwdFxuICAgICAgZGVsZXRlIHBvc3QuY3VzdG9tX2V4Y2VycHRcbiAgICB9XG5cbiAgICBwb3N0ID0gdGhpcy5jb25maWcuY3VzdG9tUHJvY2Vzc2luZyhwb3N0KVxuXG4gICAgcmV0dXJuIHBvc3RcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlIGEgc2VhcmNoIHF1ZXJ5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRRdWVyeVxuICAgKi9cbiAgc2VhcmNoIChpbnB1dFF1ZXJ5KSB7XG4gICAgdGhpcy5sb2FkRGF0YSgpXG5cbiAgICB0aGlzLmNvbmZpZy5vblNlYXJjaFN0YXJ0KClcblxuICAgIGNvbnN0IHBvc3RzRm91bmQgPSB0aGlzLmluZGV4LnNlYXJjaChpbnB1dFF1ZXJ5LCB0aGlzLmNvbmZpZy5zZWFyY2hPcHRpb25zKVxuXG4gICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0RWxzICYmIHRoaXMuc2VhcmNoUmVzdWx0RWxzLmxlbmd0aCA+IDApIHRoaXMuZGlzcGxheShwb3N0c0ZvdW5kKVxuXG4gICAgdGhpcy5jb25maWcub25TZWFyY2hFbmQocG9zdHNGb3VuZClcbiAgICByZXR1cm4gcG9zdHNGb3VuZFxuICB9XG5cbiAgLyoqXG4gICAqIERpc3BsYXkgdGhlIHJlc3VsdHMgYXMgSFRNTCBpbnRvIHRoZSBjb25maWd1cmVkIERPTSBvdXRwdXQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtEb2N1bWVudFtdfSBwb3N0c1xuICAgKi9cbiAgZGlzcGxheSAocG9zdHMpIHtcbiAgICB0aGlzLnNlYXJjaFJlc3VsdEVscy5mb3JFYWNoKHJlc3VsdEVsID0+IHtcbiAgICAgIHJlc3VsdEVsLmlubmVySFRNTCA9ICcnXG4gICAgfSlcblxuICAgIGlmIChwb3N0cy5sZW5ndGggPCAxKSB7XG4gICAgICB0aGlzLmluc2VydFRlbXBsYXRlKHRoaXMuY29uZmlnLmVtcHR5VGVtcGxhdGUoKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgdGhpcy5pbnNlcnRUZW1wbGF0ZSh0aGlzLmNvbmZpZy50ZW1wbGF0ZShwb3N0KSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCB0aGUgSFRNTCBnZW5lcmF0ZWQgYnkgdGhlIHRlbXBsYXRlIGludG8gdGhlIERPTSByZXN1bHRzIG91dHB1dCBlbGVtZW50LlxuICAgKiBJZiBhIGZhbHN5IHZhbHVlIGlzIHJldHVybmVkIGJ5IHRoZSB0ZW1wbGF0ZSwgZG8gbm90IGFwcGx5IGFueSB1cGRhdGUuXG4gICAqIEBwYXJhbSB7Kn0gZ2VuZXJhdGVkSHRtbCBIVE1MIG5vZGUgZWxlbWVudCBvciBIVE1MIHN0cmluZ1xuICAgKi9cbiAgaW5zZXJ0VGVtcGxhdGUgKGdlbmVyYXRlZEh0bWwpIHtcbiAgICBpZiAoZ2VuZXJhdGVkSHRtbCkge1xuICAgICAgdGhpcy5zZWFyY2hSZXN1bHRFbHMuZm9yRWFjaChyZXN1bHRFbCA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5vdXRwdXRDaGlsZHNUeXBlKSB7XG4gICAgICAgICAgY29uc3QgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuY29uZmlnLm91dHB1dENoaWxkc1R5cGUpXG4gICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LmFkZChgJHtyZXN1bHRFbC5pZH0taXRlbWApXG4gICAgICAgICAgY2hpbGQuaW5uZXJIVE1MID0gZ2VuZXJhdGVkSHRtbFxuICAgICAgICAgIHJlc3VsdEVsLmFwcGVuZENoaWxkKGNoaWxkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdEVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZ2VuZXJhdGVkSHRtbClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgbmV3IGluc3RhbmNlIG9mIEZsZXhTZWFyY2guXG4gICAqIEByZXR1cm4ge0ZsZXhTZWFyY2h9IFRoZSBpbnN0YW5jZSBvZiBGbGV4U2VhcmNoLlxuICAgKi9cbiAgZ2V0TmV3U2VhcmNoSW5kZXggKCkge1xuICAgIGNvbnN0IGluZGV4Q29uZmlnID0ge1xuICAgICAgZG9jOiB7XG4gICAgICAgIGlkOiAnaWQnLFxuICAgICAgICBmaWVsZDogdGhpcy5jb25maWcuaW5kZXhlZEZpZWxkc1xuICAgICAgfSxcbiAgICAgIGVuY29kZTogJ3NpbXBsZScsXG4gICAgICB0b2tlbml6ZTogJ2ZvcndhcmQnLFxuICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgcmVzb2x1dGlvbjogNCxcbiAgICAgIGRlcHRoOiAwXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5jb25maWcuaW5kZXhPcHRpb25zKSkge1xuICAgICAgaW5kZXhDb25maWdba2V5XSA9IHZhbHVlXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBGbGV4U2VhcmNoKGluZGV4Q29uZmlnKVxuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIHRoZSBmaW5hbCBHaG9zdCBBUEkgVVJMIHJlc291cmNlcyBiYXNlZCBvbiBvcHRpb25zLlxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvcHRpb25zIHRoZSBHaG9zdCBBUEkgYnJvd3NlIG9wdGlvbnNcbiAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgdXJsXG4gICAqL1xuICBidWlsZFVybCAob3B0aW9ucykge1xuICAgIGxldCB1cmwgPSBgJHt0aGlzLmNvbmZpZy51cmx9L2dob3N0L2FwaS9jb250ZW50L3Bvc3RzLz9rZXk9JHt0aGlzLmNvbmZpZy5rZXl9YFxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9wdGlvbnMpKSB7XG4gICAgICB1cmwgKz0gYCYke2tleX09JHt2YWx1ZX1gXG4gICAgfVxuICAgIHJldHVybiBlbmNvZGVVUkkodXJsKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0ZSBpbiB0aGUgbG9jYWxlIGV4cGVjdGVkIGZvcm1hdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGRhdGVcbiAgICovXG4gIHByZXR0eURhdGUgKGRhdGUpIHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSlcbiAgICByZXR1cm4gZC50b0xvY2FsZURhdGVTdHJpbmcodGhpcy5jb25maWcuZGF0ZS5sb2NhbGUsIHRoaXMuY29uZmlnLmRhdGUub3B0aW9ucylcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlbHkgZ2V0IHRoZSBsb2NhbCBzdG9yYWdlIG9iamVjdCBpZiBhdmFpbGFibGUuXG4gICAqIElmIHRoZSB1c2VyIGJyb3dzZXIgZGlzYWJsZWQgaXQsIGdldCBgdW5kZWZpbmVkYCBpbnN0ZWFkLlxuICAgKiBAcmV0dXJuIHtTdG9yYWdlfSBUaGUgc3RvcmFnZSBvYmplY3Qgb3IgYHVuZGVmaW5lZGBcbiAgICovXG4gIGdldExvY2FsU3RvcmFnZU9wdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZS1hdmFpbGFiaWxpdHktdGVzdCcsICcnKVxuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdG9yYWdlLWF2YWlsYWJpbGl0eS10ZXN0JylcbiAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNpbXBsZSBsb2dnaW5nIGZ1bmN0aW9uLlxuICAgKiBPdXRwdXQgbG9ncyBvbmx5IGlmIGBkZWJ1Z2AgaXMgc2V0IHRvIGB0cnVlYC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciB0aGUgdGV4dCB0byBvdXRwdXRcbiAgICogQHBhcmFtIHsqfSBvYmogb3B0aW9uYWwgb2JqZWN0IHRvIG91dHB1dFxuICAgKi9cbiAgbG9nIChzdHIsIG9iaikge1xuICAgIGlmICh0aGlzLmNvbmZpZy5kZWJ1Zykgb2JqID8gY29uc29sZS5sb2coc3RyLCBvYmopIDogY29uc29sZS5sb2coc3RyKVxuICB9XG5cbiAgLyoqXG4gICAqIFNpbXBsZSAnZXJyb3InIGxldmVsIGxvZ2dpbmcgZnVuY3Rpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgdGhlIHRleHQgdG8gb3V0cHV0XG4gICAqIEBwYXJhbSB7Kn0gb2JqIG9wdGlvbmFsIG9iamVjdCB0byBvdXRwdXRcbiAgICovXG4gIGVycm9yIChzdHIsIG9iaikge1xuICAgIG9iaiA/IGNvbnNvbGUuZXJyb3Ioc3RyLCBvYmopIDogY29uc29sZS5lcnJvcihzdHIpXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBzZWFyY2hTZXR0aW5ncyAqL1xuXG5pbXBvcnQgU2VhcmNoaW5HaG9zdCBmcm9tICcuL2xpYi9zZWFyY2hpbmdob3N0J1xuXG4oZnVuY3Rpb24gKGRvY3VtZW50KSB7XG4gIGNvbnN0ICRib2R5ID0gZG9jdW1lbnQuYm9keVxuICBjb25zdCAkaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWZpZWxkJylcbiAgY29uc3QgJHJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdHMnKVxuICBjb25zdCAkc2VhcmNoTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zZWFyY2gtbWVzc2FnZScpXG5cbiAgY29uc3QgY2xhc3NJc0FjdGl2ZSA9ICdpcy1hY3RpdmUnXG5cbiAgbGV0IGFsbFNlYXJjaExpbmtzTGVuZ3RoID0gMFxuXG4gIGxldCBzZWFyY2hSZXN1bHRzSGVpZ2h0ID0ge1xuICAgIG91dGVyOiAwLFxuICAgIHNjcm9sbDogMFxuICB9XG5cbiAgLy8gU0hvdyBpY29uIHNlYXJjaCBpbiBoZWFkZXJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGlbZGF0YS10YXJnZXQ9bW9kYWwtc2VhcmNoXScpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG5cbiAgY29uc3QgYWZ0ZXJEaXNwbGF5U2VhcmNoID0gcmVzdWx0cyA9PiB7XG4gICAgLy8gQWN0aXZlIGNsYXNzIHRvIGxpbmsgc2VhcmNoXG4gICAgc2VhcmNoUmVzdWx0QWN0aXZlKClcblxuICAgIGFsbFNlYXJjaExpbmtzTGVuZ3RoID0gcmVzdWx0cy5sZW5ndGhcblxuICAgIHNlYXJjaFJlc3VsdHNIZWlnaHQgPSB7XG4gICAgICBvdXRlcjogJHJlc3VsdHMub2Zmc2V0SGVpZ2h0LFxuICAgICAgc2Nyb2xsOiAkcmVzdWx0cy5zY3JvbGxIZWlnaHRcbiAgICB9XG5cbiAgICBpZiAoYWxsU2VhcmNoTGlua3NMZW5ndGggPT09IDAgJiYgJGlucHV0LnZhbHVlICE9PSAnJykge1xuICAgICAgJHNlYXJjaE1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICRib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBteVNlYXJjaEtleSlcbiAgICB9IGVsc2Uge1xuICAgICAgJHNlYXJjaE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICRib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBteVNlYXJjaEtleSlcbiAgICB9XG4gIH1cblxuICAvKiBDdXN0b21pemVkIHNlYXJjaCBkYXRhXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICBjb25zdCBteVNlYXJjaFNldHRpbmdzID0ge1xuICAgIC8vIGtleTogc2VhcmNoU2V0dGluZ3Mua2V5LFxuICAgIG9uU2VhcmNoRW5kOiByZXN1bHRzID0+IGFmdGVyRGlzcGxheVNlYXJjaChyZXN1bHRzKVxuICB9XG5cbiAgLy8gam9pbiB1c2VyIHNldHRpbmdzXG4gIE9iamVjdC5hc3NpZ24obXlTZWFyY2hTZXR0aW5ncywgc2VhcmNoU2V0dGluZ3MpXG5cbiAgLyogd2hlbiB0aGUgRW50ZXIga2V5IGlzIHByZXNzZWRcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBmdW5jdGlvbiBlbnRlcktleSAoKSB7XG4gICAgY29uc3QgbGluayA9ICRyZXN1bHRzLnF1ZXJ5U2VsZWN0b3IoYGxpLiR7Y2xhc3NJc0FjdGl2ZX1gKVxuICAgIGxpbmsgJiYgbGluay5maXJzdENoaWxkLmNsaWNrKClcbiAgfVxuXG4gIC8qIEF0dGVuZGluZyB0aGUgYWN0aXZlIGNsYXNzIHRvIHRoZSBzZWFyY2ggbGlua1xuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGZ1bmN0aW9uIHNlYXJjaFJlc3VsdEFjdGl2ZSAoaW5kZXgsIHVwRG93bikge1xuICAgIGluZGV4ID0gaW5kZXggfHwgMFxuICAgIHVwRG93biA9IHVwRG93biB8fCAndXAnXG5cbiAgICBjb25zdCBhbGxTZWFyY2hMaW5rcyA9ICRyZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcblxuICAgIC8vIFJldHVybiBpZiB0aGVyZSBhcmUgbm8gcmVzdWx0c1xuICAgIGlmICghYWxsU2VhcmNoTGlua3MubGVuZ3RoKSByZXR1cm5cblxuICAgIC8vIFJlbW92ZSBBbGwgY2xhc3MgQWN0aXZlXG4gICAgYWxsU2VhcmNoTGlua3MuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc0lzQWN0aXZlKSlcblxuICAgIC8vIEFkZCBjbGFzcyBhY3RpdmVcbiAgICBhbGxTZWFyY2hMaW5rc1tpbmRleF0uY2xhc3NMaXN0LmFkZChjbGFzc0lzQWN0aXZlKVxuXG4gICAgLy8gU2Nyb2xsIGZvciByZXN1bHRzIGJveFxuICAgIGNvbnN0IGxpbmtPZmZTZXRUb3AgPSBhbGxTZWFyY2hMaW5rc1tpbmRleF0ub2Zmc2V0VG9wXG4gICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gMFxuXG4gICAgdXBEb3duID09PSAnZG93bicgJiYgbGlua09mZlNldFRvcCA+IHNlYXJjaFJlc3VsdHNIZWlnaHQub3V0ZXIgLyAyID8gc2Nyb2xsUG9zaXRpb24gPSBsaW5rT2ZmU2V0VG9wIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgOiB1cERvd24gPT09ICd1cCcgJiYgKHNjcm9sbFBvc2l0aW9uID0gbGlua09mZlNldFRvcCA8IHNlYXJjaFJlc3VsdHNIZWlnaHQuc2Nyb2xsIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgPyBsaW5rT2ZmU2V0VG9wIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgOiBzZWFyY2hSZXN1bHRzSGVpZ2h0LnNjcm9sbClcblxuICAgICRyZXN1bHRzLnNjcm9sbFRvKDAsIHNjcm9sbFBvc2l0aW9uKVxuICB9XG5cbiAgLyogUmVhY3RlZCB0byB0aGUgdXAgb3IgZG93biBrZXlzXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgZnVuY3Rpb24gYXJyb3dLZXlVcERvd24gKGtleU51bWJlcikge1xuICAgIGxldCB1cERvd25cbiAgICBsZXQgaW5kZXhUaGVMaW5rID0gMFxuXG4gICAgY29uc3QgcmVzdWx0QWN0aXZlID0gJHJlc3VsdHMucXVlcnlTZWxlY3RvcihgbGkuJHtjbGFzc0lzQWN0aXZlfWApXG5cbiAgICBpZiAocmVzdWx0QWN0aXZlKSB7XG4gICAgICBpbmRleFRoZUxpbmsgPSBbXS5zbGljZS5jYWxsKHJlc3VsdEFjdGl2ZS5wYXJlbnROb2RlLmNoaWxkcmVuKS5pbmRleE9mKHJlc3VsdEFjdGl2ZSlcbiAgICB9XG5cbiAgICAkaW5wdXQuYmx1cigpXG5cbiAgICAvLyAzOCA9PT0gVVBcbiAgICBpZiAoa2V5TnVtYmVyID09PSAzOCkge1xuICAgICAgdXBEb3duID0gJ3VwJ1xuXG4gICAgICBpZiAoaW5kZXhUaGVMaW5rIDw9IDApIHtcbiAgICAgICAgJGlucHV0LmZvY3VzKClcbiAgICAgICAgaW5kZXhUaGVMaW5rID0gMFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXhUaGVMaW5rIC09IDFcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXBEb3duID0gJ2Rvd24nXG5cbiAgICAgIGlmIChpbmRleFRoZUxpbmsgPj0gYWxsU2VhcmNoTGlua3NMZW5ndGggLSAxKSB7XG4gICAgICAgIGluZGV4VGhlTGluayA9IDBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4VGhlTGluayArPSAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgc2VhcmNoUmVzdWx0QWN0aXZlKGluZGV4VGhlTGluaywgdXBEb3duKVxuICB9XG5cbiAgLyogQWRkaW5nIGZ1bmN0aW9ucyB0byB0aGUga2V5c1xuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGZ1bmN0aW9uIG15U2VhcmNoS2V5IChlKSB7XG4gICAgY29uc3Qga2V5TnVtYmVyID0gZS5rZXlDb2RlXG5cbiAgICAvKipcbiAgICAgICogMzggPT4gVXBcbiAgICAgICogNDAgPT4gZG93blxuICAgICAgKiAxMyA9PiBlbnRlclxuICAgICAgKiovXG5cbiAgICBpZiAoa2V5TnVtYmVyID09PSAxMykge1xuICAgICAgJGlucHV0LmJsdXIoKVxuICAgICAgZW50ZXJLZXkoKVxuICAgIH0gZWxzZSBpZiAoa2V5TnVtYmVyID09PSAzOCB8fCBrZXlOdW1iZXIgPT09IDQwKSB7XG4gICAgICBhcnJvd0tleVVwRG93bihrZXlOdW1iZXIpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICAvKiBTZWFyY2hcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXcgKi9cbiAgbmV3IFNlYXJjaGluR2hvc3QobXlTZWFyY2hTZXR0aW5ncylcbn0pKGRvY3VtZW50KVxuIl19

//# sourceMappingURL=map/search.js.map
