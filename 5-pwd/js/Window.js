"use strict";
/* skapar ett nytt fönster, ger den dess position samt z-index utifrån de variabler som finns på desktopApp */
function Window(headText, type) {
    DesktopApp.winZIndex = DesktopApp.winZIndex + 1; // öka på z-index eftersom ett nytt fönster skall skapas
    var desk = document.getElementById("desk");
    var winDiv = document.createElement("div");
    winDiv.className = "winDiv";
    winDiv.style.zIndex = DesktopApp.winZIndex;    // z-index gör så att fönstret hamnar överst
    winDiv.style.marginTop = DesktopApp.yWinPosition;   // yWinPosition är nästa fönsters lodräta position
    winDiv.style.marginLeft = DesktopApp.xWinPosition;  // xWinPosition är nästa fönsters vertikala position
    
    winDiv.onmousedown = function () {    // då användaren klickar på ett fönster ändras dess z-index så att det klickade fönstret kommer överst
        DesktopApp.winZIndex = DesktopApp.winZIndex + 1;
        winDiv.style.zIndex = DesktopApp.winZIndex;
    };
    
    var headDiv = document.createElement("div");
    headDiv.className = "headDiv";
    headDiv.innerHTML = headText;    // fönster-typs-rubrik
    var iconSpan = document.createElement("span");
    iconSpan.className = type;    // typ av fönster som öppnas
    headDiv.appendChild(iconSpan);
    var aClose = document.createElement("a");
    aClose.className = "aClose";
    aClose.href = "#";
    
    aClose.onclick = function () {  // då användaren stänger ett fönster
        desk.removeChild(winDiv);   // ta bort det specifika fönstret ur strukturen
        if (DesktopApp.xWinPosition === DesktopApp.minWinPosition) {    // om nästa fönsters Xpositionen är lägsta möjliga då ett fönster stängs
            DesktopApp.xWinPosition = DesktopApp.maxXPosition;  // ändra nästa fönsters Xposition till max-värde
            if (DesktopApp.yWinPosition !== DesktopApp.minWinPosition) {    // då nästa fönsters Yposition inte är lägsta möjliga minska dess värde med ett steg
                DesktopApp.yWinPosition = DesktopApp.yWinPosition - DesktopApp.stepYPosition;
            }
        } else {
            DesktopApp.xWinPosition = DesktopApp.xWinPosition - DesktopApp.stepXPosition;   // då nästa Xposition inte är lägsta möjliga minska det med ett steg
        }
        if (DesktopApp.yWinPosition === DesktopApp.minWinPosition) {    // om nästa fönsters Yposition är lägsta möjliga
            DesktopApp.yWinPosition = DesktopApp.maxYPosition;  // ändra nästa fönsters Yposition till max-värde
        } else {
            DesktopApp.yWinPosition = DesktopApp.yWinPosition - DesktopApp.stepYPosition;   // annars minska med ett steg
        }
        return false;
    };
    headDiv.appendChild(aClose);
    
    var contentDiv = document.createElement("div");
    contentDiv.className = type + "ContentDiv";
    var statusDiv = document.createElement("div");
    statusDiv.className = "statusDiv";
    if (type === "rss" || type === "iV") {  // om det är ett rss eller image viewer fönster skall det innehålla texten "loading"
        statusDiv.innerHTML = "loading";
    }
    var statusSpan = document.createElement("span");
    statusDiv.appendChild(statusSpan);
    winDiv.appendChild(headDiv);
    winDiv.appendChild(contentDiv);
    winDiv.appendChild(statusDiv);
    desk.appendChild(winDiv);
    return contentDiv;
}

