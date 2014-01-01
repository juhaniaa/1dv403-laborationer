/*global console, window, document, confirm */
"use strict";

/* Skapar div element för ett fönster och lägger till på desk samt returnerar referens till content delen av fönstret */
function Window() {
    var desk = document.getElementById("desk");
    var winDiv = document.createElement("div");
    winDiv.className = "winDiv";
    var headDiv = document.createElement("div");
    headDiv.className = "headDiv";
    headDiv.innerHTML = "Image Viewer";
    var iconSpan = document.createElement("span");
    headDiv.appendChild(iconSpan);
    var aClose = document.createElement("a");
    aClose.className = "aClose";
    aClose.href = "#";
    aClose.onclick = function () {
        desk.removeChild(winDiv);
    };
    headDiv.appendChild(aClose);
    var contentDiv = document.createElement("div");
    contentDiv.className = "contentDiv";
    var statusDiv = document.createElement("div");
    statusDiv.className = "statusDiv";
    winDiv.appendChild(headDiv);
    winDiv.appendChild(contentDiv);
    winDiv.appendChild(statusDiv);
    desk.appendChild(winDiv);
    return contentDiv;
}

/* Anropas då iVicon klickas */
/* Gör ett ajax anrop och får en sträng med alla bilder */
function imageViewer(myContent) {
    var maxWidth = 0;
    var maxHeight = 0;
    
    /* Skapar div taggar med img taggar inuti och lägger till i contentDiv */
    function createImage(element, index, array) {
        
        
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
        var box = document.createElement("div");
        box.className = "picDiv";
        var pic = document.createElement("img");
        pic.setAttribute("src", element.thumbURL);
        box.appendChild(pic);
        myContent.appendChild(box);
        
        if (element.thumbWidth > maxWidth) {
            maxWidth = element.thumbWidth;
        }
        
        if (element.thumbHeight > maxHeight) {
            maxHeight = element.thumbHeight;
        }
        
        if (index + 1 === array.length) {
            
            changeCss(".picDiv");
            
            /*console.log(maxWidth);
            console.log(maxHeight);
            
            console.log(myContent.getElementsByClassName("picDiv"));
            console.log(document.styleSheets[0].cssRules);*/
            
            
            
            
            
            /*myContent.getElementsByClassName("picDiv").style.width = maxWidth;
            myContent.getElementsByClassName("picDiv").style.height = maxHeight;*/
            

            
        }
    }
    
    /* Ajax anrop som returnerar array med bild-objekt */
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
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

var DesktopApp = {
    init: function () {
        var menu = document.getElementById("menu");
        var iVicon = document.createElement("a");
        iVicon.href = "#";
        iVicon.className = "iVicon";
        menu.appendChild(iVicon);
        iVicon.onclick = function () {
            var myContent = new Window();
            imageViewer(myContent);
            return false;
        };

    }
};



window.onload = DesktopApp.init;