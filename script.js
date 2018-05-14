(function() {
    var menuData = {
        "menu": [{
            "title": "Item 1",
            "submenu": [{
                "title": "Subitem 1",
                "uri": "#",
                "disabled": "ture"
            }, {
                "title": "Subitem 2",
                "uri": "#",
                "disabled": "false"
            }],
            "uri": "#"
        }, {
            "title": "Item 2",
            "uri": "#",
            "disabled": "false"
        }, {
            "title": "Item 3",
            "submenu": [{
                "title": "Subitem 1",
                "uri": "#",
                "disabled": "false"
            }, {
                "title": "Subitem 2",
                "uri": "#",
                "disabled": "false"
            }],
            "uri": "#",
            "disabled": "ture"
        }, {
            "title": "Item 4",
            "uri": "#",
            "disabled": "true"
        }, {
            "title": "Item 5",
            "uri": "#",
            "disabled": "false"
        }, {
            "title": "Item 6",
            "uri": "#",
            "disabled": "false"
        }, {
            "title": "Item 7",
            "uri": "#",
            "disabled": "true"
        }, {
            "title": "Item 8",
            "uri": "#",
            "disabled": "false"
        }, {
            "title": "Item 9",
            "uri": "#",
            "disabled": "false"
        }]
    };
    var button = document.getElementById("context_menu");
    var content = document.getElementById("container");
    var menuWrapper = document.getElementById("menuWrapper");
    var menuContent = document.getElementById("menuContent");
    var scrollUp = document.getElementById("scrollUp");
    var scrollDown = document.getElementById("scrollDown");
    scrollUp.style.display = "none";
    // open menu 
    button.addEventListener('contextmenu', function(e) {
        positionMenu(e);
        menuWrapper.style.display = "block";
        e.preventDefault();
    });
    // scroll up button handler
    scrollUp.addEventListener('click', function(e) {
        menuContent.scrollBy(0, -20);
        if (menuContent.scrollTop < 10) {
            scrollUp.style.display = "none";
        } else scrollUp.style.display = "block";
        if (menuContent.clientHeight + menuContent.scrollTop !== menuContent.scrollHeight) {
            scrollDown.style.display = "block";
        }
        closeSubMenus();
        e.preventDefault();
        e.stopPropagation();
    });
    // scroll down button handler
    scrollDown.addEventListener('click', function(e) {
        menuContent.scrollBy(0, 20);
        if (menuContent.clientHeight + menuContent.scrollTop == menuContent.scrollHeight) {
            scrollDown.style.display = "none";
        } else scrollDown.style.display = "block";
        if (menuContent.scrollTop < 10) {
            scrollUp.style.display = "none";
        } else scrollUp.style.display = "block";
        closeSubMenus();
        e.preventDefault();
        e.stopPropagation();
    });
    // close menu by clicking outside    
    document.addEventListener('click', function(e) {
        menuWrapper.style.display = "none";
        closeSubMenus();
        e.preventDefault();
    });
    // menu items from JSON
    function menuElem(obj, el) {
        for (var i = 0; i < obj.length; i++) {
            var menuElement = document.createElement("li");
            el.appendChild(menuElement);
            var menuLink = document.createElement("button");
            menuLink.setAttribute("value", obj[i].title);
            if (obj[i].disabled === "true") {
                menuLink.disabled = true;
            }
            var arrow = document.createElement("div");
            arrow.className = 'arrow';
            arrow.innerHTML = '>';
            var title = document.createElement("div");
            title.className = 'title';
            title.innerHTML = obj[i].title;
            menuLink.appendChild(title);
            if (typeof obj[i].submenu != 'undefined') {
                menuLink.className = 'subMenuLink';
                menuLink.appendChild(arrow);
            }
            menuElement.appendChild(menuLink);
            if (typeof obj[i].submenu != 'undefined') {
                var subMenu = document.createElement("ul");
                subMenu.className = 'subMenu';
                var properties = {
                    submenu: obj[i].submenu,
                    subMenuEl: subMenu,
                    menuEl: menuElement
                };
                menuLink.properties = properties;
                openSubMenu(menuLink);
            }
        }
    }
    // open SubMenu
    function openSubMenu(el) {
        el.addEventListener("click", function(ev) {
            ev.stopPropagation();
            var subMenus = ev.target.parentNode.parentNode.parentNode.getElementsByTagName("ul");
            var links = ev.target.parentNode.parentNode.parentNode.getElementsByClassName('subMenuLink');
            for (var i = 1; i < subMenus.length; i++) {
                subMenus[i].parentNode.removeChild(subMenus[i]);
            }
            this.properties.subMenuEl.innerHTML = "";
            this.properties.menuEl.appendChild(this.properties.subMenuEl);
            menuElem(this.properties.submenu, this.properties.subMenuEl);
        });
    };
    //close submenu
    function closeSubMenus() {
        var subMenu = menuContent.getElementsByClassName("subMenu");
        for (var i = 0; i < subMenu.length; i++) {
            subMenu[i].parentNode.removeChild(subMenu[i]);
        }
    }
    // get the menu position
    function getPosition(e) {
        var posx = 0;
        var posy = 0;
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return {
            x: posx,
            y: posy
        }
    }
    //Positions the menu properly
    function positionMenu(e) {
        clickCoords = getPosition(e);
        clickCoordsX = clickCoords.x;
        clickCoordsY = clickCoords.y;
        menuWidth = menuWrapper.offsetWidth + 4;
        menuHeight = menuWrapper.offsetHeight + 4;
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        if ((windowWidth - clickCoordsX) < menuWidth) {
            menuWrapper.style.left = windowWidth - menuWidth + "px";
        } else {
            menuWrapper.style.left = clickCoordsX + "px";
        }
        if ((windowHeight - clickCoordsY) < menuHeight) {
            menuWrapper.style.top = windowHeight - menuHeight + "px";
        } else {
            menuWrapper.style.top = clickCoordsY + "px";
        }
    }
    return menuElem(menuData.menu, document.getElementById("menuContent"))
})();