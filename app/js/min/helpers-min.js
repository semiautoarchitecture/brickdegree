helpers={},helpers.debugPrint=function(e,r){DEBUG&&$(e).html(r)},helpers.angleDiff=function(e,r){var n=e-r;return n=Math.abs((n+180)%360-180)},helpers.getUrlValue=function(e){for(var r=window.location.search.substring(1),n=r.split("&"),t=0;t<n.length;t++){var l=n[t].split("=");if(l[0]===e)return l[1]}},helpers.roundFloat=function(e,r){return e.toFixed(r)};