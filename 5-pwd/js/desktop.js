/*global console, window, document, confirm */
"use strict";
var DesktopApp = {
    init: function () {
        DesktopApp.createIcon("Image Viewer", "iV");
        DesktopApp.createIcon("RSS Reader", "rss");  // kunde lägga till en array med rss adresser
        DesktopApp.createIcon("Memory", "memory");
    },
    
    createIcon: function (header, type) {
        var reqAddress,
            menu,
            icon;
        menu = document.getElementById("menu");
        icon = document.createElement("a");    // ...lägg till en a tag/icon
        icon.href = "#";
        icon.className = type + "icon";    // ...av önskad typ
        menu.appendChild(icon);    // ...i menyn
        
        icon.onclick = function () {    // ...då iconen klickas
            var content,
                status;
            DesktopApp.nextWinPosition();   // ...ta reda på det nya fönstrets position
            content = new Window(header, type);    // ...skapa det nya fönstret
            status = content.parentElement.lastChild;
            if (type === "iV") {    // om det är en ImageViewer icon
                status.className = "loading";
                reqAddress = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";
                DesktopApp.xhrRequest(content, status, type, reqAddress);
            } else if (type === "rss") {    // om det är en Rss icon
                status.className = "loading";
                reqAddress = "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + escape("http://www.dn.se/m/rss/senaste-nytt");
                DesktopApp.xhrRequest(content, status, type, reqAddress); // gör ajax anrop med önskad adress
            } else if (type === "memory") {    // om det är en Memory icon
                new Memory(4, 4, content);
            }
            return false;
        };
    },
    
    xhrRequest: function (divContent, divStatus, type, reqAddress) {
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            var i,
                picArray,
                aTags;
            if (xhr.readyState === 4) {
                divStatus.className = "statusDiv";
                divStatus.innerHTML = "";
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {    // då status är ok
                    
                    if (type === "iV") {  // om Image Viewer
                        picArray = JSON.parse(xhr.responseText);    // hämta ut arrayen med object representation av bilderna
                        
                        for (i = 0; i < picArray.length; i += 1) {    // sedan för varje object
                            DesktopApp.createImage(picArray[i], i, picArray, divContent);   // anropa createImage
                        }
                    } else if (type === "rss") {    // om Rss Reader
                        divContent.innerHTML = xhr.responseText;    // Lägg in xhr.responseText i rssContent
                        aTags = divContent.getElementsByTagName("a");   // varje a tag i rss-läsaren...
                        for (i = 0; i < aTags.length; i += 1) {
                            aTags[i].setAttribute('target', '_blank');  // ...öppnas i nytt fönster
                        }
                    }
                } else {    // om status inte är ok...
                    console.log("Läsfel, status:" + xhr.status);    // ...logga fel-meddelande
                }
            }
        };
        
        xhr.open("get", reqAddress, true);
        xhr.send(null);

    },
    
    createImage: function (element, index, array, content) {
        var maxWidth = 0,
            maxHeight = 0,
            box,
            pic,
            aTag,
            i;
        
        box = document.createElement("div");
        box.className = "picDiv";
        pic = document.createElement("img");
        pic.setAttribute("src", element.thumbURL);
        aTag = document.createElement("a");
        aTag.href = "#";
        
        /* Då bilden klickas öppnas den i ett nytt anpassat fönster */
        aTag.onclick = function () {
            var picContent;
            DesktopApp.nextWinPosition();   // ...ta reda på det nya fönstrets position
            picContent = new Window("Image", "image");
            picContent.parentElement.style.width = element.width;
            console.log(element.height);
            picContent.parentElement.style.height = element.height + 56;
            picContent.style.backgroundImage = "url(" + element.URL + ")";
            picContent.style.height = element.height;
            
                    
            picContent.oncontextmenu = function () {
                content.parentElement.parentElement.style.backgroundImage = "url(" + element.URL + ")";
                return false;
            };
            return false;
        };

        
        aTag.appendChild(pic);  // lägg till de skapade noderna i content
        box.appendChild(aTag);
        content.appendChild(box);
        
        if (element.thumbWidth > maxWidth) {    // se om denna bild är bredast
            maxWidth = element.thumbWidth;  // isåfall ändra max bredden
        }
        
        if (element.thumbHeight > maxHeight) {  // se om denna bild är högst
            maxHeight = element.thumbHeight;    // isåfall ändra max höjden
        }
        
        if (index + 1 === array.length) { // om detta är den sista bilden
            for (i = 0; i < array.length; i += 1) {  // ändra box bredden för varje div i content
                content.childNodes[i].style.height = maxHeight;
                content.childNodes[i].style.width = maxWidth;
            }
        }
    },
    
    nextWinPosition: function () {
        if (DesktopApp.yWinPosition > DesktopApp.maxYPosition) {    // Om ywinPos > maxYPosition
            DesktopApp.yWinPosition = DesktopApp.stepYPosition;   // ...ändra till ett steg
        } else {
            DesktopApp.yWinPosition = DesktopApp.yWinPosition + DesktopApp.stepYPosition;     // ...annars lägg till ett steg
        }
        if (DesktopApp.xWinPosition > DesktopApp.maxXPosition) {    // Om xwinPos > maxPosition
            DesktopApp.xWinPosition = DesktopApp.stepXPosition;   // ...ändra till ett steg
        } else {
            DesktopApp.xWinPosition = DesktopApp.xWinPosition + 14;     // ...annars lägg till ett steg
        }
    },
    winZIndex: 0,
    xWinPosition: 0,
    yWinPosition: 0,
    maxXPosition: 700,
    maxYPosition: 208,
    stepXPosition: 14,
    stepYPosition: 13,
    minWinPosition: 0
    
};

window.onload = DesktopApp.init;