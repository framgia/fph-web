/*!
wookmark plugin
@name wookmark.js
@author Christoph Ono (chri@sto.ph or @gbks)
@author Sebastian Helzle (sebastian@helzle.net or @sebobo)
@version 2.1.1
@date 04/15/2016
@category jQuery plugin
@copyright (c) 2009-2016 Christoph Ono (www.wookmark.com)
@license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
!function(a){"function"==typeof define&&define.amd?define(["window","document"],a):a(window,document)}(function(a,b){function c(a,b){return function(){return a.apply(b,arguments)}}function d(a,b){var c;for(c in b)b.hasOwnProperty(c)&&(a.style[c]=b[c])}function e(a,b){v(function(){var c,e;for(c=0;c<a.length;c++)e=a[c],d(e.el,e.css);"function"==typeof b&&v(b)})}function f(a){return a.replace(/^\s+|\s+$/g,"").toLowerCase()}function g(a,b,c){a.removeEventListener?a.removeEventListener(b,c):a.detachEvent("on"+b,c)}function h(a,b,c){g(a,b,c),a.addEventListener?a.addEventListener(b,c):a.attachEvent("on"+b,function(){c.call(a)})}function i(a){return null===a.offsetParent}function j(a){return a.offsetHeight}function k(a){return a.offsetWidth}function l(a,b){return a.classList?a.classList.contains(b):new RegExp("(^| )"+b+"( |$)","gi").test(a.className)}function m(a,b){a.classList?a.classList.add(b):a.className+=" "+b}function n(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(^|\\b)"+b.split(" ").join("|")+"(\\b|$)","gi")," ")}function o(a,b,c,d){void 0===d&&(d="wookmark-");var e=a.getAttribute("data-"+d+b);return c===!0?parseInt(e,10):e}function p(a,b,c,d){void 0===d&&(d="wookmark-"),a.setAttribute("data-"+d+b,c)}function q(a){for(var b,c={},d=[],e=a.length;e--;)b=o(a[e],"id",!0),c.hasOwnProperty(b)||(c[b]=1,d.push(a[e]));return d}function r(b,c){return void 0!==a.getComputedStyle?a.getComputedStyle(b,null).getPropertyValue(c):b.currentStyle[c]}function s(a,b){var c,d=a.length;for(c=0;d>c;c++)if(a[c]===b)return c;return-1}function t(d,e){e=e||{},"string"==typeof d&&(d=b.querySelector(d)),this.container=d,this.columns=this.resizeTimer=null,this.activeItemCount=0,this.placeholders=[],this.itemHeightsInitialized=!1,this.itemHeightsDirty=!1,this.elementTag="div",this.initItems=c(this.initItems,this),this.updateOptions=c(this.updateOptions,this),this.onResize=c(this.onResize,this),this.onRefresh=c(this.onRefresh,this),this.getItemWidth=c(this.getItemWidth,this),this.layout=c(this.layout,this),this.layoutFull=c(this.layoutFull,this),this.layoutColumns=c(this.layoutColumns,this),this.filter=c(this.filter,this),this.clear=c(this.clear,this),this.getActiveItems=c(this.getActiveItems,this),this.refreshPlaceholders=c(this.refreshPlaceholders,this),this.sortElements=c(this.sortElements,this),this.updateFilterClasses=c(this.updateFilterClasses,this),this.initItems(),this.container.style.display="block",this.updateOptions(e),this.updateFilterClasses(),this.autoResize&&h(a,"resize",this.onResize),h(this.container,"refreshWookmark",this.onRefresh)}var u={align:"center",autoResize:!0,comparator:null,direction:void 0,ignoreInactiveItems:!0,inactiveClass:"wookmark-inactive",itemSelector:void 0,itemWidth:0,fillEmptySpace:!1,flexibleWidth:0,offset:5,outerOffset:0,onLayoutChanged:void 0,placeholderClass:"wookmark-placeholder",possibleFilters:[],resizeDelay:50,verticalOffset:void 0},v=a.requestAnimationFrame||function(a){a()};return t.prototype.initItems=function(){if(void 0===this.itemSelector){for(var a,b=[],c=this.container.children,d=c.length;d--;)a=c[d],8!==a.nodeType&&(a.style.display="",p(a,"id",d),b.unshift(a));this.items=b}else this.items=this.container.querySelectorAll(this.itemSelector);this.items.length&&(this.elementTag=this.items[0].tagName),this.itemHeightsDirty=!0},t.prototype.updateFilterClasses=function(){for(var a,b,c,d,e,g=this.items.length,h={},i=this.possibleFilters,j=i.length;g--;)if(c=this.items[g],b=JSON.parse(o(c,"filter-class",!1,"")),b&&"object"==typeof b)for(a=b.length;a--;)d=f(b[a]),h.hasOwnProperty(d)||(h[d]=[]),h[d].push(c);for(;j--;)e=f(i[j]),h.hasOwnProperty(e)||(h[e]=[]);this.filterClasses=h},t.prototype.updateOptions=function(a){var b;this.itemHeightsDirty=!0,a=a||{};for(b in u)u.hasOwnProperty(b)&&(a.hasOwnProperty(b)?this[b]=a[b]:this.hasOwnProperty(b)||(this[b]=u[b]));this.verticalOffset=this.verticalOffset||this.offset,this.layout(!0)},t.prototype.onResize=function(){clearTimeout(this.resizeTimer),this.itemHeightsDirty=0!==this.flexibleWidth,this.resizeTimer=setTimeout(this.layout,this.resizeDelay)},t.prototype.onRefresh=function(){this.itemHeightsDirty=!0,this.layout()},t.prototype.filter=function(a,b,c){var d,e,g,h,i,j=[],k=[];if(a=a||[],b=b||"or",c=c||!1,a.length){for(e=0;e<a.length;e++)i=f(a[e]),this.filterClasses.hasOwnProperty(i)&&j.push(this.filterClasses[i]);if(e=d=j.length,"or"===b||1===d)for(;e--;)k=k.concat(j[e]);else if("and"===b){for(var l,o,p,r=j[0],t=!0;e--;)j[e].length<r.length&&(r=j[e]);for(r=r||[],e=r.length;e--;){for(o=r[e],g=d,t=!0;g--&&t;)if(p=j[g],r!==p){for(l=!1,h=p.length;h--&&!l;)l=p[h]===o;t&=l}t&&(k=k.concat(r[e]))}}if(d>1&&(k=q(k)),!c)for(e=this.items.length;e--;)-1===s(k,this.items[e])&&m(this.items[e],this.inactiveClass)}else k=this.items;if(!c){for(e=k.length;e--;)n(k[e],this.inactiveClass);this.columns=null,this.layout()}return k},t.prototype.refreshPlaceholders=function(a,b){var c,e,f,g,h,i,k,l=j(this.container),m=this.columns.length,n="";if(this.placeholders.length<m){for(c=0;c<m-this.placeholders.length;c++)n+="<"+this.elementTag+' class="'+this.placeholderClass+'"/>';this.container.insertAdjacentHTML("beforeend",n),this.placeholders=this.container.querySelectorAll("."+this.placeholderClass)}for(g=this.offset+2*parseInt(r(this.placeholders[0],"border-left-width"),10)||0,g+=2*parseInt(r(this.placeholders[0],"padding-left"),10)||0,c=0;c<this.placeholders.length;c++)i=this.placeholders[c],e=this.columns[c],c>=m||0===e.length?i.style.display="none":(h=e[e.length-1],k=o(h,"top",!0)+o(h,"height",!0)+this.verticalOffset,f=Math.max(0,l-k-g),d(i,{position:"absolute",display:f>0?"block":"none",left:c*a+b+"px",top:k+"px",width:a-g+"px",height:f+"px"}))},t.prototype.getActiveItems=function(){var a,b,c=this.inactiveClass,d=[],e=this.items;if(!this.ignoreInactiveItems)return e;for(a=0;a<e.length;a++)b=e[a],l(b,c)||d.push(b);return d},t.prototype.getItemWidth=function(){var a=this.itemWidth,b=k(this.container)-2*this.outerOffset,c=this.flexibleWidth;if("function"==typeof a&&(a=this.itemWidth()),this.items.length>0&&(void 0===a||0===a&&!this.flexibleWidth)?a=k(this.items[0]):"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a)/100*b),c){"function"==typeof c&&(c=c()),"string"==typeof c&&c.indexOf("%")>=0&&(c=parseFloat(c)/100*b);var d=b+this.offset,e=Math.floor(.5+d/(c+this.offset)),f=Math.floor(d/(a+this.offset)),g=Math.max(e,f),h=Math.min(c,Math.floor((b-(g-1)*this.offset)/g));a=Math.max(a,h)}return a},t.prototype.layout=function(a,b){if(a||!i(this.container)){var c,d,e=this.getItemWidth(),f=e+this.offset,g=k(this.container),h=g-2*this.outerOffset,j=Math.floor((h+this.offset)/f),l=0,m=this.getActiveItems(),n=m.length;if(a||this.itemHeightsDirty||!this.itemHeightsInitialized){for(var o=0;n>o;o++)d=m[o],this.flexibleWidth&&(d.style.width=e+"px"),p(d,"height",d.offsetHeight);this.itemHeightsDirty=!1,this.itemHeightsInitialized=!0}j=Math.max(1,Math.min(j,n)),c=this.outerOffset,"center"===this.align&&(c+=Math.floor(.5+(h-(j*f-this.offset))>>1)),this.direction=this.direction||("right"===this.align?"right":"left"),l=a||null===this.columns||this.columns.length!==j||this.activeItemCount!==n?this.layoutFull(f,j,c):this.layoutColumns(f,c),this.activeItemCount=n,this.container.style.height=l+"px",this.fillEmptySpace&&this.refreshPlaceholders(f,c),void 0!==this.onLayoutChanged&&"function"==typeof this.onLayoutChanged&&this.onLayoutChanged(),"function"==typeof b&&b()}},t.prototype.sortElements=function(a){return"function"==typeof this.comparator?a.sort(this.comparator):a},t.prototype.layoutFull=function(a,b,c){var d,f,g,h,i=0,j=0,k=null,n=null,q=[],r=[],s="left"===this.align,t=this;for(this.columns=[],f=this.sortElements(this.getActiveItems()),g=f.length;q.length<b;)q.push(this.outerOffset),this.columns.push([]);for(;g>j;){for(d=f[j],k=q[0],n=0,i=0;b>i;i++)q[i]<k&&(k=q[i],n=i);p(d,"top",k),h=c,(n>0||!s)&&(h+=n*a),r[j]={el:d,css:{position:"absolute",top:k+"px"}},r[j].css[this.direction]=h+"px",q[n]+=o(d,"height",!0)+this.verticalOffset,this.columns[n].push(d),j++}return e(r,function(){l(t.container,"wookmark-initialised")||m(t.container,"wookmark-initialised")}),Math.max.apply(Math,q)},t.prototype.layoutColumns=function(a,b){for(var c,d,f,g,h=[],i=[],j=0,k=0,l=this.columns.length;l--;){for(c=this.outerOffset,h.push(c),d=this.columns[l],g=l*a+b,j=0;j<d.length;j++,k++)f=d[j],p(f,"top",c),i[k]={el:f,css:{top:c+"px"}},i[k].css[this.direction]=g+"px",c+=o(f,"height",!0)+this.verticalOffset;h[l]=c}return e(i),Math.max.apply(Math,h)},t.prototype.clear=function(){clearTimeout(this.resizeTimer);for(var b=this.placeholders.length;b--;)this.container.removeChild(this.placeholders[b]);g(a,"resize",this.onResize),g(this.container,"refreshWookmark",this.onRefresh)},void 0!==a.jQuery&&(jQuery.fn.wookmark=function(a){var b=this.length;if(void 0!==a&&a.container instanceof jQuery&&(a.container=a.container[0]),b>1)for(;b--;)$(this).eq(b).wookmark(a);else 1===b&&(this.wookmarkInstance?this.wookmarkInstance.updateOptions(a||{}):this.wookmarkInstance=new t(this[0],a||{}));return this}),a.Wookmark=t,t});
