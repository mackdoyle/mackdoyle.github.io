!function(t,e){function n(e,n){var s,r,o,u=e.nodeName.toLowerCase();return"area"===u?(s=e.parentNode,r=s.name,e.href&&r&&"map"===s.nodeName.toLowerCase()?(o=t("img[usemap=#"+r+"]")[0],!!o&&i(o)):!1):(/input|select|textarea|button|object/.test(u)?!e.disabled:"a"===u?e.href||n:n)&&i(e)}function i(e){return t.expr.filters.visible(e)&&!t(e).parents().andSelf().filter(function(){return"hidden"===t.css(this,"visibility")}).length}var s=0,r=/^ui-id-\d+$/;t.ui=t.ui||{},t.ui.version||(t.extend(t.ui,{version:"1.9.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),t.fn.extend({_focus:t.fn.focus,focus:function(e,n){return"number"==typeof e?this.each(function(){var i=this;setTimeout(function(){t(i).focus(),n&&n.call(i)},e)}):this._focus.apply(this,arguments)},scrollParent:function(){var e;return e=t.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(t.css(this,"position"))&&/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!e.length?t(document):e},zIndex:function(n){if(n!==e)return this.css("zIndex",n);if(this.length)for(var i=t(this[0]),s,r;i.length&&i[0]!==document;){if(s=i.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(r=parseInt(i.css("zIndex"),10),!isNaN(r)&&0!==r))return r;i=i.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++s)})},removeUniqueId:function(){return this.each(function(){r.test(this.id)&&t(this).removeAttr("id")})}}),t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(n){return!!t.data(n,e)}}):function(e,n,i){return!!t.data(e,i[3])},focusable:function(e){return n(e,!isNaN(t.attr(e,"tabindex")))},tabbable:function(e){var i=t.attr(e,"tabindex"),s=isNaN(i);return(s||i>=0)&&n(e,!s)}}),t(function(){var e=document.body,n=e.appendChild(n=document.createElement("div"));n.offsetHeight,t.extend(n.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),t.support.minHeight=100===n.offsetHeight,t.support.selectstart="onselectstart"in n,e.removeChild(n).style.display="none"}),t("<a>").outerWidth(1).jquery||t.each(["Width","Height"],function(n,i){function s(e,n,i,s){return t.each(r,function(){n-=parseFloat(t.css(e,"padding"+this))||0,i&&(n-=parseFloat(t.css(e,"border"+this+"Width"))||0),s&&(n-=parseFloat(t.css(e,"margin"+this))||0)}),n}var r="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),u={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(n){return n===e?u["inner"+i].call(this):this.each(function(){t(this).css(o,s(this,n)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?u["outer"+i].call(this,e):this.each(function(){t(this).css(o,s(this,e,!0,n)+"px")})}}),t("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(t.fn.removeData=function(e){return function(n){return arguments.length?e.call(this,t.camelCase(n)):e.call(this)}}(t.fn.removeData)),function(){var e=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[];t.ui.ie=e.length?!0:!1,t.ui.ie6=6===parseFloat(e[1],10)}(),t.fn.extend({disableSelection:function(){return this.bind((t.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(t){t.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),t.extend(t.ui,{plugin:{add:function(e,n,i){var s,r=t.ui[e].prototype;for(s in i)r.plugins[s]=r.plugins[s]||[],r.plugins[s].push([n,i[s]])},call:function(t,e,n){var i,s=t.plugins[e];if(s&&t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType)for(i=0;i<s.length;i++)t.options[s[i][0]]&&s[i][1].apply(t.element,n)}},contains:t.contains,hasScroll:function(e,n){if("hidden"===t(e).css("overflow"))return!1;var i=n&&"left"===n?"scrollLeft":"scrollTop",s=!1;return e[i]>0?!0:(e[i]=1,s=e[i]>0,e[i]=0,s)},isOverAxis:function(t,e,n){return t>e&&e+n>t},isOver:function(e,n,i,s,r,o){return t.ui.isOverAxis(e,i,r)&&t.ui.isOverAxis(n,s,o)}}))}(jQuery);