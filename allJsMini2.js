$(document).ready(function(){function o(){u.slideToggle("slow")}function t(o,t,e){return o>=t&&e>=o}function e(){htmlBody.bind("scroll mousedown DOMMouseScroll mousewheel keyup",function(o){(o.which>0||"mousedown"===o.type||"mousewheel"===o.type)&&htmlBody.stop().unbind("scroll mousedown DOMMouseScroll mousewheel keyup")})}actionTaken=!1,function(o){o.scrollFollow=function(t,e){function r(){t.queue([]);var r,n=parseInt(o(window).height()),s=parseInt(o(document).scrollTop()),i=parseInt(t.cont.offset().top),a=parseInt(t.cont.prop("offsetHeight")),p=parseInt(t.prop("offsetHeight")+(parseInt(t.css("marginTop"))||0)+(parseInt(t.css("marginBottom"))||0));l&&("top"==e.relativeTo?r=t.initialOffsetTop>=s+e.offset?t.initialTop:Math.min(Math.max(-i,s-t.initialOffsetTop+t.initialTop)+e.offset,a-p-t.paddingAdjustment):"bottom"==e.relativeTo&&(r=t.initialOffsetTop+p>=s+e.offset+n?t.initialTop:Math.min(s+n-p-e.offset,a-p)),(new Date).getTime()-t.lastScroll>=e.delay-20&&t.animate({top:r},e.speed,e.easing))}t=o(t);var l=(t.css("position"),!0);if(void 0!=o.cookie)if("false"==o.cookie("scrollFollowSetting"+t.prop("id"))){var l=!1;o("#"+e.killSwitch).text(e.offText).toggle(function(){l=!0,o(this).text(e.onText),o.cookie("scrollFollowSetting"+t.prop("id"),!0,{expires:365,path:"/"}),r()},function(){l=!1,o(this).text(e.offText),t.animate({top:t.initialTop},e.speed,e.easing),o.cookie("scrollFollowSetting"+t.prop("id"),!1,{expires:365,path:"/"})})}else o("#"+e.killSwitch).text(e.onText).toggle(function(){l=!1,o(this).text(e.offText),t.animate({top:t.initialTop},0),o.cookie("scrollFollowSetting"+t.prop("id"),!1,{expires:365,path:"/"})},function(){l=!0,o(this).text(e.onText),o.cookie("scrollFollowSetting"+t.prop("id"),!0,{expires:365,path:"/"}),r()});t.cont=""==e.container?t.parent():o("#"+e.container),t.initialOffsetTop=parseInt(t.offset().top),t.initialTop=parseInt(t.css("top"))||0,t.paddingAdjustment="relative"==t.css("position")?parseInt(t.cont.css("paddingTop"))+parseInt(t.cont.css("paddingBottom")):0,o(window).scroll(function(){o.fn.scrollFollow.interval=setTimeout(function(){r()},e.delay),t.lastScroll=(new Date).getTime()}),o(window).resize(function(){o.fn.scrollFollow.interval=setTimeout(function(){r()},e.delay),t.lastScroll=(new Date).getTime()}),t.lastScroll=0,r()},o.fn.scrollFollow=function(t){return t=t||{},t.relativeTo=t.relativeTo||"top",t.speed=t.speed||500,t.offset=t.offset||0,t.easing=t.easing||"swing",t.container=t.container||this.parent().prop("id"),t.killSwitch=t.killSwitch||"killSwitch",t.onText=t.onText||"Turn Slide Off",t.offText=t.offText||"Turn Slide On",t.delay=t.delay||0,this.each(function(){new o.scrollFollow(this,t)}),this}}(jQuery),htmlBody=$("html, body");var r=0,l=500;groupArray=$(".yearGroup");var n=$(".buttonGroup"),s=$(".hideGroup"),i=$(".closeBar"),a=$("#allCloseBar"),p=[],f=[],c=!1,u=$("#hideInfo"),d=$(".overallInsertsTotal");d.on("click",function(){o()}),$.each(n,function(h){$(this).click(function(){if(sortElements=function(o,t){return o.text()<t.text()?-1:o.text()>t.text()?1:0},sortElements2=function(o,t){return t>o?-1:o>t?1:0},"All Years"==$(this).text()){c=!c;for(var g=1;g<n.length;g++)c&&0==$(groupArray[g-1]).height()?($.when($(n[g]).triggerHandler("click")).done(function(){htmlBody.animate({scrollTop:revealAllButton.offset().top-25},{duration:1e3,easing:"easeOutBack"}),console.log("Close")}),e()):!c&&$(groupArray[g-1]).height()>0&&$.when($(n[g]).triggerHandler("click")).done(function(){htmlBody.animate({scrollTop:revealAllButton.offset().top-30},{duration:0,easing:"easeOutBack"}),console.log("Open"),e()})}$(s[h-1]).slideToggle(l,function(){if(r=800,htmlBody.animate({scrollTop:$(groupArray[h-1]).offset().top-25},{duration:r,easing:"easeOutBack"}),setTimeout(function(){$(n[h]).toggleClass("float")},1200),$(groupArray[h-1]).height()>0){e(),u.hide("slow"),$(d).off("click"),$(d).addClass("overallInsertsTotal2").attr("data-content",""),a.addClass("floatCloseBar"),$(i[h]).hide(),p.splice(0,0,$(n[h])),f.splice(0,0,$(n[h]).text()),p.sort(sortElements),f.sort(sortElements2);var l,s=1500;$(n[h]).hover(function(){e();var o=$(groupArray[h-1]),r=o.offset(),i=r.top,a=(r.left,i+$(groupArray[h-1]).outerHeight()),f=$(window).width()-o.width();f=Math.abs(r.left-f);var c=0;t($(n[h]).offset().top,$(groupArray[h-1]).position().top,a)?c=500:$(n[h]).offset().top<=$(groupArray[h-1]).offset().top&&1==p.length?c=500:$(n[h]).offset().top>495&&$(n[h]).offset().top<1700&&!t($(n[h]).offset().top,$(groupArray[h-1]).position().top,a)?c=1e3:$(n[h]).offset().top>1701&&$(n[h]).offset().top<3e3&&!t($(n[h]).offset().top,$(groupArray[h-1]).position().top,a)?c=1500:$(n[h]).offset().top>3001&&$(n[h]).offset().top<6e3&&!t($(n[h]).offset().top,$(groupArray[h-1]).position().top,a)?c=2e3:$(n[h]).offset().top>6001&&!t($(n[h]).offset().top,$(groupArray[h-1]).position().top,a)?(c=2500,console.log("the slowest")):c=500,$(n[h]).hasClass("float")||(c=0,console.log("doesnt have class")),l=setTimeout(function(){htmlBody.animate({scrollTop:$(groupArray[h-1]).offset().top},c,"easeInOutCubic")},s)},function(){clearTimeout(l)}),$.each(p,function(o,t){$(p[o]).appendTo(a),console.log(p.length),arrowDown.show(),arrowUp.show(),arrowDown.prependTo(a),arrowUp.appendTo(a),p.length>7?($("float").css("width","7%"),$(t).css("width","7%"),$(p[0]).css("width","7%"),p.sort(sortElements),f.sort(sortElements2)):p.length<=7&&($(t).css("width","10%"),$("float").css("width","10%"),p.sort(sortElements),f.sort(sortElements2))})}0==$(groupArray[h-1]).height()&&($(n[h]).css("width","50%"),p.splice($.inArray($(n[h]).text(),f),1),f.splice($.inArray($(n[h]).text(),f),1),$(i[h]).show(),$(n[h]).appendTo($(i[h])),console.log(p.length),arrowDown.show(),arrowUp.show(),arrowDown.prependTo(a),arrowUp.appendTo(a)),0==p.length&&(e(),$(i[h]).removeClass("floatCloseBar"),htmlBody.animate({scrollTop:revealAllButton.offset().top-75},500),arrowDown.hide(),arrowUp.hide(),d.on("click",function(){o()}),$(d).removeClass("overallInsertsTotal2"))}),$(n[h]).toggleClass("openClose"),$(n[h]).toggleClass("openClose2")})}),revealAllButton=$("#revealAllButton");var h=$(".totalGroup"),g=$(".overallTotalGroup");li=$("li");var w=[],m=[];redAsterisks=$(".red"),overallGroup=$(groupArray).find(li).length-$(groupArray).find(redAsterisks).length,$.each(groupArray,function(o){var t=$(groupArray[o]).find(li).length,e=$(groupArray[o]).attr("data-value");w.push(e);var r=$(groupArray[o]).find(redAsterisks).length,l=t-r;m.push(l);var s=100*l/e,i="Completion Stats: "+l+"/"+e+" or "+parseFloat(s.toFixed(1))+"%";$(h[o]).text(i);$(n[o+1]).attr("title",i)});var T=0;$.each(w,function(){T+=parseFloat(this)||0});var y=100*overallGroup/T;$(g).text("Completion Stats: "+overallGroup+"/"+T+" or "+parseFloat(y.toFixed(1))+"%"),arrowDown=$(".arrow-down"),arrowUp=$(".arrow-up"),arrowDown.hide(),arrowUp.hide(),a.scrollFollow(),arrowDown.click(function(){htmlBody.animate({scrollTop:$(document).height()},600)}),arrowUp.click(function(){htmlBody.animate({scrollTop:revealAllButton.offset().top-75},500)})});