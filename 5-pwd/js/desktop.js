/*global console, window, document, confirm */
"use strict";
function Window() {
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
    headDiv.appendChild(aClose);
    var contentDiv = document.createElement("div");
    contentDiv.className = "contentDiv";
    var statusDiv = document.createElement("div");
    statusDiv.className = "statusDiv";
    winDiv.appendChild(headDiv);
    winDiv.appendChild(contentDiv);
    winDiv.appendChild(statusDiv);
    
    var desk = document.getElementById("desk");
    desk.appendChild(winDiv);
}

var DesktopApp = {
    init: function () {
        var menu = document.getElementById("menu");
        var iVicon = document.createElement("a");
        iVicon.href = "#";
        iVicon.className = "iVicon";
        menu.appendChild(iVicon);
        iVicon.onclick = function () {
            new Window();
            return false;
        };

    }
};



window.onload = DesktopApp.init;