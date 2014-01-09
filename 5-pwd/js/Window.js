"use strict";
/* skapar ett nytt fönster, ger den dess position samt z-index utifrån de variabler som finns på desktopApp */
function Window(headText, type) {
    DesktopApp.winZIndex = DesktopApp.winZIndex + 1; // öka på z-index eftersom ett nytt fönster skall skapas
    var desk = document.getElementById("desk");
    var winDiv = document.createElement("div");
    winDiv.className = "winDiv";
    winDiv.draggable = true;
    winDiv.style.zIndex = DesktopApp.winZIndex;    // z-index gör så att fönstret hamnar överst
    winDiv.id = DesktopApp.winZIndex;
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
    
    

    
    
    
    
    /* START DRAG N DROP */
    


    headDiv.onmousedown = function () {

    
        function handleDragStart (e){

            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData("text", e.target.id); // needed for FF
            return false;
            
        };
        function handleDragEnter (e){

        };
        
        function handleDragOver (e){;
            if(e.preventDefault){
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = "move";
            return false;
        };
        function handleDragLeave (e){
        
        };
        
        function handleDrop(e) {
            console.log(e.dataTransfer.getData("text"));
            var tempDiv = e.dataTransfer.getData("text");
            console.log(e);
            console.log(e.target);
            console.log(this);
            //winDiv.style.marginLeft = e.clientX;
            //winDiv.style.marginTop = e.clientY;
            
          // this / e.target is current target element.
        
            var divId = e.dataTransfer.getData("text");
            console.log(document.getElementById(divId));
            var movedDiv = document.getElementById(divId);
            movedDiv.style.marginTop = e.clientY;
            movedDiv.style.marginLeft = e.clientX;

            
          if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
          }
        
          // See the section on the DataTransfer object.
            e.preventDefault(); // så att firefox inte söker sig till datatransfer
          return false;
        }
    
        function handleDragEnd(e) {
          // this/e.target is the source node.
            console.log("drag end");
        desk.removeEventListener("dragstart", handleDragStart, false);
        desk.removeEventListener("dragenter",handleDragEnter, false);
        desk.removeEventListener("dragover",handleDragOver, false);
        desk.removeEventListener("dragleave",handleDragLeave, false);
        desk.removeEventListener("drop", handleDrop, false);
        desk.removeEventListener("dragend", handleDragEnd, false);
        }
        
        desk.addEventListener("dragstart", handleDragStart, false);
        desk.addEventListener("dragenter",handleDragEnter, false);
        desk.addEventListener("dragover",handleDragOver, false);
        desk.addEventListener("dragleave",handleDragLeave, false);
        desk.addEventListener("drop", handleDrop, false);
        desk.addEventListener("dragend", handleDragEnd, false);
};
    
    
    /* END DRAG N DROP */
    
    
    headDiv.appendChild(iconSpan);
    
    var aClose = document.createElement("a");
    aClose.className = "aClose";
    aClose.href = "#";
    aClose.draggable = false;
    
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
    
        /* START CONTEXT-MENY */
    
    if (type === "memory") {
        var aContext = document.createElement("a");
        aContext.innerHTML = "Redigera";
        aContext.className = "aContext";
        aContext.href = "#";
        aContext.draggable = false;
        aContext.onclick = function () {
            
            var popMenu = document.createElement("div");    // skapa div tag
            popMenu.className = "popMenu";
            var restartPopMenu = document.createElement("a");  // lägg till a-tag
            restartPopMenu.href = "#";
            restartPopMenu.innerHTML = "Nytt spel";
            restartPopMenu.onclick = function () {    // a-tagens onclick skall göra så att spelet startar om
                contentDiv.innerHTML = "";
                winDiv.removeChild(popMenu);
                new Memory(4, 4, contentDiv);
                return false;
            };
            var cancelPopMenu = document.createElement("a");
            cancelPopMenu.href = "#";
            cancelPopMenu.innerHTML = "Avbryt";
            cancelPopMenu.onclick = function () {
                winDiv.removeChild(popMenu);
                return false;
            };
            var tagsPopMenu = document.createElement("div");
            tagsPopMenu.appendChild(restartPopMenu);
            tagsPopMenu.appendChild(cancelPopMenu);
            popMenu.appendChild(tagsPopMenu);
            // lägg till inuti parent elementet(winDiv)
            headDiv.parentElement.insertBefore(popMenu, headDiv);
            return false;
            
        };
        headDiv.appendChild(aContext);
    }
    
    /* END CONTEXT-MENY */
    
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

