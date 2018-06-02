!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.geofire={})}(this,function(e){"use strict";var t=function(){function e(e){if(this._cancelCallback=e,"[object Function]"!==Object.prototype.toString.call(this._cancelCallback))throw new Error("callback must be a function")}return e.prototype.cancel=function(){void 0!==this._cancelCallback&&(this._cancelCallback(),this._cancelCallback=void 0)},e}(),r=10,n="0123456789bcdefghjkmnpqrstuvwxyz",i=40007860,a=110574,o=5,s=22*o,c=6378137,h=.00669447819799,u=1e-12;function l(e){var t;if("string"!=typeof e?t="key must be a string":0===e.length?t="key cannot be the empty string":1+r+e.length>755?t="key is too long to be stored in Firebase":/[\[\].#$\/\u0000-\u001F\u007F]/.test(e)&&(t="key cannot contain any of the following characters: . # $ ] [ /"),void 0!==t)throw new Error("Invalid GeoFire key '"+e+"': "+t)}function d(e){var t;if(Array.isArray(e))if(2!==e.length)t="expected array of length 2, got length "+e.length;else{var r=e[0],n=e[1];"number"!=typeof r||isNaN(r)?t="latitude must be a number":r<-90||r>90?t="latitude must be within the range [-90, 90]":"number"!=typeof n||isNaN(n)?t="longitude must be a number":(n<-180||n>180)&&(t="longitude must be within the range [-180, 180]")}else t="location must be an array";if(void 0!==t)throw new Error("Invalid GeoFire location '"+e+"': "+t)}function f(e){var t;if("string"!=typeof e)t="geohash must be a string";else if(0===e.length)t="geohash cannot be the empty string";else for(var r=0,i=e;r<i.length;r++){var a=i[r];-1===n.indexOf(a)&&(t="geohash cannot contain '"+a+"'")}if(void 0!==t)throw new Error("Invalid GeoFire geohash '"+e+"': "+t)}function _(e,t){if(void 0===t&&(t=!1),"object"!=typeof e)throw new Error("query criteria must be an object");if(void 0===e.center&&void 0===e.radius)throw new Error("radius and/or center must be specified");if(t&&(void 0===e.center||void 0===e.radius))throw new Error("query criteria for a new query must contain both a center and a radius");for(var r=0,n=Object.keys(e);r<n.length;r++){var i=n[r];if("center"!==i&&"radius"!==i)throw new Error("Unexpected attribute '"+i+"' found in query criteria")}if(void 0!==e.center&&d(e.center),void 0!==e.radius){if("number"!=typeof e.radius||isNaN(e.radius))throw new Error("radius must be a number");if(e.radius<0)throw new Error("radius must be greater than or equal to 0")}}function y(e){if("number"!=typeof e||isNaN(e))throw new Error("Error: degrees must be a number");return e*Math.PI/180}function v(e,t){if(void 0===t&&(t=r),d(e),void 0!==t){if("number"!=typeof t||isNaN(t))throw new Error("precision must be a number");if(t<=0)throw new Error("precision must be greater than 0");if(t>22)throw new Error("precision cannot be greater than 22");if(Math.round(t)!==t)throw new Error("precision must be an integer")}for(var i={min:-90,max:90},a={min:-180,max:180},o="",s=0,c=0,h=1;o.length<t;){var u=h?e[1]:e[0],l=h?a:i,f=(l.min+l.max)/2;u>f?(s=1+(s<<1),l.min=f):(s=0+(s<<1),l.max=f),h=!h,c<4?c++:(c=0,o+=n[s],s=0)}return o}function b(e,t){var r=y(t),n=Math.cos(r)*c*Math.PI/180*(1/Math.sqrt(1-h*Math.sin(r)*Math.sin(r)));return n<u?e>0?360:0:Math.min(360,e/n)}function p(e,t){var r=b(e,t);return Math.abs(r)>1e-6?Math.max(1,Math.log2(360/r)):1}function g(e){if(e<=180&&e>=-180)return e;var t=e+180;return t>0?t%360-180:180- -t%360}function k(e,t){var r,n=t/a,o=Math.min(90,e[0]+n),c=Math.max(-90,e[0]-n),h=2*Math.floor((r=t,Math.min(Math.log2(i/2/r),s))),u=2*Math.floor(p(t,o))-1,l=2*Math.floor(p(t,c))-1;return Math.min(h,u,l,s)}function m(e,t){d(e);var r=Math.max(1,k(e,t)),i=Math.ceil(r/o),s=function(e,t){var r=t/a,n=Math.min(90,e[0]+r),i=Math.max(-90,e[0]-r),o=b(t,n),s=b(t,i),c=Math.max(o,s);return[[e[0],e[1]],[e[0],g(e[1]-c)],[e[0],g(e[1]+c)],[n,e[1]],[n,g(e[1]-c)],[n,g(e[1]+c)],[i,e[1]],[i,g(e[1]-c)],[i,g(e[1]+c)]]}(e,t).map(function(e){return function(e,t){f(e);var r=Math.ceil(t/o);if(e.length<r)return[e,e+"~"];var i=(e=e.substring(0,r)).substring(0,e.length-1),a=n.indexOf(e.charAt(e.length-1)),s=t-i.length*o,c=o-s,h=a>>c<<c,u=h+(1<<c);return u>31?[i+n[h],i+"~"]:[i+n[h],i+n[u]]}(v(e,i),r)});return s.filter(function(e,t){return!s.some(function(r,n){return t>n&&e[0]===r[0]&&e[1]===r[1]})})}function C(e){if(e&&"l"in e&&Array.isArray(e.l)&&2===e.l.length)return e.l;throw new Error("Unexpected location object encountered: "+JSON.stringify(e))}function w(e){var t;return"string"!=typeof e.key&&null!==e.key||(t=e.key),t}function Q(e,t){d(e),d(t);var r=y(t[0]-e[0]),n=y(t[1]-e[1]),i=Math.sin(r/2)*Math.sin(r/2)+Math.cos(y(e[0]))*Math.cos(y(t[0]))*Math.sin(n/2)*Math.sin(n/2);return 6371*(2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i)))}Math.log2=Math.log2||function(e){return Math.log(e)/Math.log(2)};var E=function(){function e(e,t){var r=this;if(this._firebaseRef=e,this._queryCriteria=t,this._callbacks={ready:[],key_entered:[],key_exited:[],key_moved:[]},this._cancelled=!1,this._currentGeohashesQueried={},this._locationsTracked={},this._valueEventFired=!1,this._geohashCleanupScheduled=!1,this._cleanUpCurrentGeohashesQueriedTimeout=null,"[object Object]"!==Object.prototype.toString.call(this._firebaseRef))throw new Error("firebaseRef must be an instance of Firebase");this._cleanUpCurrentGeohashesQueriedInterval=setInterval(function(){!1===r._geohashCleanupScheduled&&r._cleanUpCurrentGeohashesQueried()},1e4),_(t,!0),this._center=t.center,this._radius=t.radius,this._listenForNewGeohashes()}return e.prototype.cancel=function(){var e=this;this._cancelled=!0,this._callbacks={ready:[],key_entered:[],key_exited:[],key_moved:[]},Object.keys(this._currentGeohashesQueried).forEach(function(t){var r=e._stringToQuery(t);e._cancelGeohashQuery(r,e._currentGeohashesQueried[t]),delete e._currentGeohashesQueried[t]}),this._locationsTracked={},clearInterval(this._cleanUpCurrentGeohashesQueriedInterval)},e.prototype.center=function(){return this._center},e.prototype.on=function(e,r){var n=this;if(-1===["ready","key_entered","key_exited","key_moved"].indexOf(e))throw new Error("event type must be 'ready', 'key_entered', 'key_exited', or 'key_moved'");if("function"!=typeof r)throw new Error("callback must be a function");(this._callbacks[e].push(r),"key_entered"===e)&&Object.keys(this._locationsTracked).forEach(function(e){var t=n._locationsTracked[e];void 0!==t&&t.isInQuery&&r(e,t.location,t.distanceFromCenter)});return"ready"===e&&this._valueEventFired&&r(),new t(function(){n._callbacks[e].splice(n._callbacks[e].indexOf(r),1)})},e.prototype.radius=function(){return this._radius},e.prototype.updateCriteria=function(e){_(e),this._center=e.center||this._center,this._radius=e.radius||this._radius;for(var t=0,r=Object.keys(this._locationsTracked);t<r.length;t++){var n=r[t];if(!0===this._cancelled)break;var i=this._locationsTracked[n],a=i.isInQuery;i.distanceFromCenter=Q(i.location,this._center),i.isInQuery=i.distanceFromCenter<=this._radius,a&&!i.isInQuery?this._fireCallbacksForKey("key_exited",n,i.location,i.distanceFromCenter):!a&&i.isInQuery&&this._fireCallbacksForKey("key_entered",n,i.location,i.distanceFromCenter)}this._valueEventFired=!1,this._listenForNewGeohashes()},e.prototype._cancelGeohashQuery=function(e,t){var r=this._firebaseRef.orderByChild("g").startAt(e[0]).endAt(e[1]);r.off("child_added",t.childAddedCallback),r.off("child_removed",t.childRemovedCallback),r.off("child_changed",t.childChangedCallback),r.off("value",t.valueCallback)},e.prototype._childAddedCallback=function(e){this._updateLocation(w(e),C(e.val()))},e.prototype._childChangedCallback=function(e){this._updateLocation(w(e),C(e.val()))},e.prototype._childRemovedCallback=function(e){var t=this,r=w(e);r in this._locationsTracked&&this._firebaseRef.child(r).once("value",function(e){var n=null===e.val()?null:C(e.val()),i=null!==n?v(n):null;t._geohashInSomeQuery(i)||t._removeLocation(r,n)})},e.prototype._cleanUpCurrentGeohashesQueried=function(){var e=this,t=Object.keys(this._currentGeohashesQueried);t.forEach(function(t){var r=e._currentGeohashesQueried[t];if(!1===r.active){var n=e._stringToQuery(t);e._cancelGeohashQuery(n,r),delete e._currentGeohashesQueried[t]}}),(t=Object.keys(this._locationsTracked)).forEach(function(t){if(!e._geohashInSomeQuery(e._locationsTracked[t].geohash)){if(e._locationsTracked[t].isInQuery)throw new Error("Internal State error, trying to remove location that is still in query");delete e._locationsTracked[t]}}),this._geohashCleanupScheduled=!1,null!==this._cleanUpCurrentGeohashesQueriedTimeout&&(clearTimeout(this._cleanUpCurrentGeohashesQueriedTimeout),this._cleanUpCurrentGeohashesQueriedTimeout=null)},e.prototype._fireCallbacksForKey=function(e,t,r,n){this._callbacks[e].forEach(function(e){void 0===r||null===r?e(t,null,null):e(t,r,n)})},e.prototype._fireReadyEventCallbacks=function(){this._callbacks.ready.forEach(function(e){e()})},e.prototype._geohashInSomeQuery=function(e){for(var t=0,r=Object.keys(this._currentGeohashesQueried);t<r.length;t++){var n=r[t];if(n in this._currentGeohashesQueried){var i=this._stringToQuery(n);if(e>=i[0]&&e<=i[1])return!0}}return!1},e.prototype._geohashQueryReadyCallback=function(e){var t=this._outstandingGeohashReadyEvents.indexOf(e);t>-1&&this._outstandingGeohashReadyEvents.splice(t,1),this._valueEventFired=0===this._outstandingGeohashReadyEvents.length,this._valueEventFired&&this._fireReadyEventCallbacks()},e.prototype._listenForNewGeohashes=function(){var e=this,t=m(this._center,1e3*this._radius).map(this._queryToString);t=t.filter(function(e,r){return t.indexOf(e)===r}),Object.keys(this._currentGeohashesQueried).forEach(function(r){var n=t.indexOf(r);-1===n?e._currentGeohashesQueried[r].active=!1:(e._currentGeohashesQueried[r].active=!0,t.splice(n,1))}),!1===this._geohashCleanupScheduled&&Object.keys(this._currentGeohashesQueried).length>25&&(this._geohashCleanupScheduled=!0,this._cleanUpCurrentGeohashesQueriedTimeout=setTimeout(this._cleanUpCurrentGeohashesQueried,10)),this._outstandingGeohashReadyEvents=t.slice(),t.forEach(function(t){var r=e._stringToQuery(t),n=e._firebaseRef.orderByChild("g").startAt(r[0]).endAt(r[1]),i=n.on("child_added",function(t){return e._childAddedCallback(t)}),a=n.on("child_removed",function(t){return e._childRemovedCallback(t)}),o=n.on("child_changed",function(t){return e._childChangedCallback(t)}),s=n.on("value",function(){n.off("value",s),e._geohashQueryReadyCallback(t)});e._currentGeohashesQueried[t]={active:!0,childAddedCallback:i,childRemovedCallback:a,childChangedCallback:o,valueCallback:s}}),0===t.length&&this._geohashQueryReadyCallback()},e.prototype._queryToString=function(e){if(2!==e.length)throw new Error("Not a valid geohash query: "+e);return e[0]+":"+e[1]},e.prototype._removeLocation=function(e,t){var r=this._locationsTracked[e];if(delete this._locationsTracked[e],void 0!==r&&r.isInQuery){var n=t?Q(t,this._center):null;this._fireCallbacksForKey("key_exited",e,t,n)}},e.prototype._stringToQuery=function(e){var t=e.split(":");if(2!==t.length)throw new Error("Invalid internal state! Not a valid geohash query: "+e);return t},e.prototype._updateLocation=function(e,t){var r,n;d(t);var i=e in this._locationsTracked&&this._locationsTracked[e].isInQuery,a=e in this._locationsTracked?this._locationsTracked[e].location:null;n=(r=Q(t,this._center))<=this._radius,this._locationsTracked[e]={location:t,distanceFromCenter:r,isInQuery:n,geohash:v(t)},n&&!i?this._fireCallbacksForKey("key_entered",e,t,r):!n||null===a||t[0]===a[0]&&t[1]===a[1]?!n&&i&&this._fireCallbacksForKey("key_exited",e,t,r):this._fireCallbacksForKey("key_moved",e,t,r)},e}(),G=function(){function e(e){if(this._firebaseRef=e,"[object Object]"!==Object.prototype.toString.call(this._firebaseRef))throw new Error("firebaseRef must be an instance of Firebase")}return e.prototype.get=function(e){return l(e),this._firebaseRef.child(e).once("value").then(function(e){var t=e.val();return null===t?null:C(t)})},e.prototype.ref=function(){return this._firebaseRef},e.prototype.remove=function(e){return this.set(e,null)},e.prototype.set=function(e,t){var r;if("string"==typeof e&&0!==e.length)(r={})[e]=t;else{if("object"!=typeof e)throw new Error("keyOrLocations must be a string or a mapping of key - location pairs.");if(void 0!==t)throw new Error("The location argument should not be used if you pass an object to set().");r=e}var n={};return Object.keys(r).forEach(function(e){l(e);var t=r[e];if(null===t)n[e]=null;else{d(t);var i=v(t);n[e]=function(e,t){return d(e),f(t),{".priority":t,g:t,l:e}}(t,i)}}),this._firebaseRef.update(n)},e.prototype.query=function(e){return new E(this._firebaseRef,e)},e.distance=function(e,t){return Q(e,t)},e}();e.GeoCallbackRegistration=t,e.GeoFire=G,e.GeoQuery=E,Object.defineProperty(e,"__esModule",{value:!0})});
