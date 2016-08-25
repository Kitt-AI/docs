$(document).ready(function(){
    var page = window.parent;
    var menu = document.getElementsByClassName('wy-menu-vertical')[0];

    var iframeTop = page.document.body.getElementsByClassName("wy-nav-content-wrap")[0].offsetTop;
    var elements = document.body.getElementsByTagName("a");
    var sectionElements = $('.section');

    hrefToAnchor();

    if (page.addEventListener){
        page.addEventListener("scroll", ScrollHandler, false);
        // IE9, Chrome, Safari, Opera
        page.addEventListener("mousewheel", MouseWheelHandler, false);
        // Firefox
        page.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    }else{  // IE 6/7/8s
        page.attachEvent("onmousewheel", MouseWheelHandler);
        page.attachEvent("onscroll", ScrollHandler);
    }

    function MouseWheelHandler(){
        if(page.pageYOffset < iframeTop){
            menu.style.marginTop = "0px";
            return;
        }
        page.scrollTo(0, page.pageYOffset); // smooth mousewheel scroll
    }

    function ScrollHandler(){
        if(page.pageYOffset < iframeTop){
            menu.style.marginTop = "0px";
            return;
        }
        var cur = sectionElements.map(function(){
            if ($(this).offset().top < page.pageYOffset)
               return this;
        });
        $(elements).removeClass('active');
        $("[data-anchor='"+ cur[cur.length-1].id+"']").addClass('active');
    }

    function hrefToAnchor(){
        var onlyHash = new RegExp('^#+');
        for(var i = 0, len = elements.length; i < len; i++) {
            if(!elements[i] || !elements[i].href){
                continue;
            }
            var href = elements[i].getAttribute('href');
            if(href.search(onlyHash) == -1){
                elements[i].setAttribute('target', '_self');
            }else{
                var anchor = href.substr(1);
                elements[i].setAttribute('data-anchor', anchor);
                elements[i].removeAttribute('href');

                elements[i].onclick = function(event) {
                    try{
                        var target = document.getElementById(this.getAttribute('data-anchor'));
                        window.parent.parent.scrollTo(0, target.offsetTop + iframeTop + 1);
                        $("[data-toggle='wy-nav-shift']").toggleClass("shift");
                        $("[data-toggle='rst-versions']").toggleClass("shift");
                    }catch(err){}
                    finally{
                       event.preventDefault();
                    }
                }
            }
        }
    }

    window.addEventListener('unload', function(event) {
        if (page.addEventListener){
          page.removeEventListener("scroll", ScrollHandler, false);
          page.removeEventListener("mousewheel", MouseWheelHandler, false);
          page.removeEventListener("DOMMouseScroll", MouseWheelHandler, false);
        }else{
           page.detachEvent("onmousewheel", MouseWheelHandler);
           page.detachEvent("onscroll", ScrollHandler);
        }
    });

});
