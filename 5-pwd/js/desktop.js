/*global console, window, document, confirm */
"use strict";

/* Skapar div element för ett fönster och lägger till på desk samt returnerar referens till content delen av fönstret */
function Window(headText, type) {
    var desk = document.getElementById("desk");
    var winDiv = document.createElement("div");
    winDiv.className = "winDiv";
    var headDiv = document.createElement("div");
    headDiv.className = "headDiv";
    headDiv.innerHTML = headText;
    var iconSpan = document.createElement("span");
    iconSpan.className = type;
    headDiv.appendChild(iconSpan);
    var aClose = document.createElement("a");
    aClose.className = "aClose";
    aClose.href = "#";
    aClose.onclick = function () {
        desk.removeChild(winDiv);
        return false;
    };
    headDiv.appendChild(aClose);
    var contentDiv = document.createElement("div");
    contentDiv.className = type+"ContentDiv";
    var statusDiv = document.createElement("div");
    statusDiv.className = "statusDiv";
    statusDiv.innerHTML = "loading";
    var statusSpan = document.createElement("span");
    statusDiv.appendChild(statusSpan);
    winDiv.appendChild(headDiv);
    winDiv.appendChild(contentDiv);
    winDiv.appendChild(statusDiv);
    desk.appendChild(winDiv);
    return contentDiv;
}

/* Anropas då iVicon klickas */
/* Gör ett ajax anrop och får en sträng med alla bilder */
function imageViewer(myContent, myStatus) {
    var maxWidth = 0;
    var maxHeight = 0;
    
    /* Lägger till ny css rule med max höjd och bredd för bild divarna */
    function changeCss(ruleName) {
        var i;
        for (i = 0; i < document.styleSheets[0].cssRules.length; i += 1) {
            if(document.styleSheets[0].cssRules[i].selectorText == ruleName){
                document.styleSheets[0].insertRule(".picDiv { height:"+maxHeight+"}",0);
                document.styleSheets[0].insertRule(".picDiv { width:"+maxWidth+"}",0);
                i += 2;
            }
        }
    }
    
    /* Skapar div taggar med img taggar inuti och lägger till i contentDiv */
    function createImage(element, index, array) {
        
        
        
        var box = document.createElement("div");
        box.className = "picDiv";
        var pic = document.createElement("img");
        pic.setAttribute("src", element.thumbURL);
        var aTag = document.createElement("a");
        aTag.href = "#";
        
        /* Då bilden klickas ändras bakgrunden */
        aTag.onclick = function () {
            var bgUrl = element.URL;
            document.styleSheets[0].insertRule("#desk { background-image:url("+bgUrl+");}",document.styleSheets[0].cssRules.length);
            return false;
        }
        aTag.appendChild(pic)
        box.appendChild(aTag);
        myContent.appendChild(box);
        
        if (element.thumbWidth > maxWidth) {
            maxWidth = element.thumbWidth;
        }
        
        if (element.thumbHeight > maxHeight) {
            maxHeight = element.thumbHeight;
        }
        
        if (index + 1 === array.length) {
            
            changeCss(".picDiv");        
        }
    }
    
    /* Ajax anrop som returnerar array med bild-objekt */
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            myStatus.className = "statusDiv";
            myStatus.innerHTML = "";
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                var picArray = JSON.parse(xhr.responseText);
                
                /* för varje object i picArray anropa createImage */
                picArray.forEach(createImage);
            } else {
                console.log("Läsfel, status:" + xhr.status);
            }
        }
    };
    xhr.open("get", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
    xhr.send(null);
}

function rssReader(myRssContent, myRssStatus){
    /* Ajax anrop */
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            myRssStatus.className = "statusDiv";
            myRssStatus.innerHTML = "";
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                /* Lägg in xhr.responseText i myRssContent */
                myRssContent.innerHTML = xhr.responseText;
            } else {
                console.log("Läsfel, status:" + xhr.status);
            }
        }
    };
    xhr.open("get", "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape("http://www.dn.se/m/rss/senaste-nytt"), true);
    xhr.send(null);
}

var DesktopApp = {
    init: function () {
        var menu = document.getElementById("menu");
        var iVicon = document.createElement("a");
        iVicon.href = "#";
        iVicon.className = "iVicon";
        menu.appendChild(iVicon);
        iVicon.onclick = function () {
            var myContent = new Window("Image Viewer", "iV");
            var myStatus = myContent.parentElement.lastChild;
            myStatus.className = "loading";
            imageViewer(myContent, myStatus);
            return false;
        };
        var rssIcon = document.createElement("a");
        rssIcon.href = "#";
        rssIcon.className = "rssIcon";
        menu.appendChild(rssIcon);
        rssIcon.onclick = function () {
            var myRssContent = new Window("RSS Reader", "rss");
            var myRssStatus = myRssContent.parentElement.lastChild;
            myRssStatus.className = "loading";
            rssReader(myRssContent, myRssStatus);
            return false;
        };
    }
};

window.onload = DesktopApp.init;