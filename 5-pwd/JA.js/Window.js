"use strict";
var JA = JA || {};

/* skapar ett nytt fönster, ger den dess position samt z-index utifrån de variabler som finns på desktopApp */

JA.Window = function (headText, type, elemHeight, elemWidth) {

    var desk,
        winDiv,
        headDiv,
        iconSpan,
        aClose,
        contentDiv,
        aContext,
        popMenu,
        restartPopMenu,
        cancelPopMenu,
        updatePopMenu,
        intervallPopMenu,
        sourcePopMenu,
        tagsPopMenu,
        statusDiv,
        statusSpan,
        xMposStart,
        yMposStart,
        that;
    
    JA.DesktopApp.winZIndex += 1; // öka på z-index eftersom ett nytt fönster skall skapas
    desk = document.getElementById("desk");
    winDiv = document.createElement("div");
    winDiv.className = "winDiv";
    winDiv.draggable = true;
    winDiv.style.zIndex = JA.DesktopApp.winZIndex;    // z-index gör så att fönstret hamnar överst
    
    var tryXPos = JA.DesktopApp.xWinPosition;
    var tryYPos = JA.DesktopApp.yWinPosition;
  
    var tryX = JA.Window.prototype.checkPos.call(winDiv, tryXPos, true, elemWidth); // checkPos kontrollerar att fönstret hamnar innanför applikationen
    var tryY = JA.Window.prototype.checkPos.call(winDiv, tryYPos, false, elemHeight);
    
    winDiv.style.marginLeft = tryX;  // xWinPosition är nästa fönsters vertikala position
    winDiv.style.marginTop = tryY;   // yWinPosition är nästa fönsters lodräta position
    
    winDiv.onmousedown = function () {    // då användaren klickar på ett fönster ändras dess z-index så att det klickade fönstret kommer överst
        JA.DesktopApp.winZIndex += 1;
        this.style.zIndex = JA.DesktopApp.winZIndex;
    };
    
    headDiv = document.createElement("div");
    headDiv.className = "headDiv";
    headDiv.innerHTML = headText;    // fönster-typs-rubrik
    iconSpan = document.createElement("span");
    iconSpan.className = type;    // typ av fönster som öppnas
    
    /* START DRAG N DROP */
    function handleDragStart(e) {
        that = e.target;
        xMposStart = e.clientX;
        yMposStart = e.clientY;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("text", "moving"); // needed for FF
        return false;
    }
    function handleDragEnter(e) {
    }
    
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = "move";
        return false;
    }
    function handleDragLeave(e) {
    }
    
    function handleDrop(e) {
        var xDifference,
            yDifference,
            styleTemp,
            yOrigPos,
            xOrigPos,
            newY,
            newX;
        xDifference = e.clientX - xMposStart;
        yDifference = e.clientY - yMposStart;

        styleTemp = that.currentStyel || window.getComputedStyle(that);
        yOrigPos = styleTemp.marginTop.match(/\d/g);
        yOrigPos = parseInt(yOrigPos.join(""), 10);
        xOrigPos = styleTemp.marginLeft.match(/\d/g);
        xOrigPos = parseInt(xOrigPos.join(""), 10);
        
        newY = yOrigPos + yDifference; // Divens original position + skillnaden i rörelse blir den nya positionen
        newX = xOrigPos + xDifference;
        
        
        newX = JA.Window.prototype.checkPos.call(that, newX, true); // kontrollera om den nya poitionen är godkänd i retur får vi den nya positionen rättad om så behövdes
        newY = JA.Window.prototype.checkPos.call(that, newY, false);
        
        that.style.marginTop = newY;
        that.style.marginLeft = newX;
        
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }
        e.preventDefault(); // så att firefox inte söker sig till datatransfer
        return false;
    }
    
    function removeEvents() {
        desk.removeEventListener("dragstart", handleDragStart, false);
        desk.removeEventListener("dragenter", handleDragEnter, false);
        desk.removeEventListener("dragover", handleDragOver, false);
        desk.removeEventListener("dragleave", handleDragLeave, false);
        desk.removeEventListener("drop", handleDrop, false);
    }

    function handleDragEnd(e) {
        removeEvents();
        desk.removeEventListener("dragend", handleDragEnd, false);
    }
    
    headDiv.onmousedown = function () {
        desk.addEventListener("dragstart", handleDragStart, false);
        desk.addEventListener("dragenter", handleDragEnter, false);
        desk.addEventListener("dragover", handleDragOver, false);
        desk.addEventListener("dragleave", handleDragLeave, false);
        desk.addEventListener("drop", handleDrop, false);
        desk.addEventListener("dragend", handleDragEnd, false);
    };
    headDiv.onclick = function () {
        removeEvents();
        desk.removeEventListener("dragend", handleDragEnd, false);
    };
    
    
    /* END DRAG N DROP */
    
    headDiv.appendChild(iconSpan);
    
    aClose = document.createElement("a");
    aClose.className = "aClose";
    aClose.href = "#";
    aClose.draggable = false;
    
    aClose.onclick = function () {  // då användaren stänger ett fönster
        desk.removeChild(this.parentElement.parentElement);   // ta bort det specifika fönstret ur strukturen
        if (JA.DesktopApp.xWinPosition === JA.DesktopApp.minWinPosition) {    // om nästa fönsters Xpositionen är lägsta möjliga då ett fönster stängs
            JA.DesktopApp.xWinPosition = JA.DesktopApp.maxXPosition;  // ändra nästa fönsters Xposition till max-värde
            if (JA.DesktopApp.yWinPosition !== JA.DesktopApp.minWinPosition) {    // då nästa fönsters Yposition inte är lägsta möjliga minska dess värde med ett steg
                JA.DesktopApp.yWinPosition = JA.DesktopApp.yWinPosition - JA.DesktopApp.stepYPosition;
            }
        } else {
            JA.DesktopApp.xWinPosition = JA.DesktopApp.xWinPosition - JA.DesktopApp.stepXPosition;   // då nästa Xposition inte är lägsta möjliga minska det med ett steg
        }
        if (JA.DesktopApp.yWinPosition === JA.DesktopApp.minWinPosition) {    // om nästa fönsters Yposition är lägsta möjliga
            JA.DesktopApp.yWinPosition = JA.DesktopApp.maxYPosition;  // ändra nästa fönsters Yposition till max-värde
        } else {
            JA.DesktopApp.yWinPosition = JA.DesktopApp.yWinPosition - JA.DesktopApp.stepYPosition;   // annars minska med ett steg
        }
        return false;
    };
    headDiv.appendChild(aClose);
    
    contentDiv = document.createElement("div");
    contentDiv.className = type + "ContentDiv";
    
        /* START CONTEXT-MENY */
    
    if (type === "memory") {
        aContext = document.createElement("a");
        aContext.innerHTML = "Redigera";
        aContext.className = "aContext";
        aContext.href = "#";
        aContext.draggable = false;
        aContext.onclick = function () {
            
            popMenu = document.createElement("div");    // skapa div tag
            popMenu.className = "popMenu";
            
            cancelPopMenu = document.createElement("a");
            cancelPopMenu.href = "#";
            cancelPopMenu.innerHTML = "Avbryt";
            cancelPopMenu.onclick = function () {
                winDiv.removeChild(popMenu);
                return false;
            };

            var selection = document.createElement("select");
            selection.className = "selection";
            var option1 = document.createElement("option");
            option1.nodeValue = 2;
            option1.innerHTML = "2";
            var option2 = document.createElement("option");
            option2.nodeValue = 3;
            option2.innerHTML = "3";
            var option3 = document.createElement("option");
            option3.nodeValue = 4;
            option3.innerHTML = "4";
            selection.appendChild(option1);
            selection.appendChild(option2);
            selection.appendChild(option3);
            
            var selectionx = document.createElement("select");
            selectionx.className = "selectionx";
            var option1x = document.createElement("option");
            option1x.nodeValue = 2;
            option1x.innerHTML = "2";
            var option2x = document.createElement("option");
            option2x.nodeValue = 4;
            option2x.innerHTML = "4";
            selectionx.appendChild(option1x);
            selectionx.appendChild(option2x);
            
            restartPopMenu = document.createElement("a");  // lägg till a-tag
            restartPopMenu.href = "#";
            restartPopMenu.innerHTML = "Nytt spel";
            restartPopMenu.onclick = function () {    // a-tagens onclick skall göra så att spelet startar om
                contentDiv.innerHTML = "";
                winDiv.removeChild(popMenu);
                
                var selectedY = selection.options[selection.selectedIndex].value;
                var selectedX = selectionx.options[selectionx.selectedIndex].value;
                
                new JA.Memory(selectedX, selectedY, contentDiv);
                return false;
            };
            
            tagsPopMenu = document.createElement("div");
            tagsPopMenu.innerHTML = "<p>Välj storlek</p>";
            tagsPopMenu.appendChild(selection);
            tagsPopMenu.appendChild(selectionx);
            tagsPopMenu.appendChild(restartPopMenu);
            tagsPopMenu.appendChild(cancelPopMenu);
            
            popMenu.appendChild(tagsPopMenu);
            
            headDiv.parentElement.insertBefore(popMenu, headDiv); // lägg till inuti parent elementet(winDiv)
            return false;
            
        };
        headDiv.appendChild(aContext);
    }
    
    if (type === "rss") {
        aContext = document.createElement("a");
        aContext.innerHTML = "Redigera";
        aContext.className = "aContext";
        aContext.href = "#";
        aContext.draggable = false;
        aContext.onclick = function () {
            
            
            popMenu = document.createElement("div");    // skapa div tag
            popMenu.className = "popMenu";
            intervallPopMenu = document.createElement("a");  // lägg till a-tag
            intervallPopMenu.href = "#";
            intervallPopMenu.innerHTML = "Uppdateringsintervall";
            intervallPopMenu.onclick = function () {    // a-tagens onclick skall göra så att spelet startar om

                return false;
            };
            sourcePopMenu = document.createElement("a");
            sourcePopMenu.href = "#";
            sourcePopMenu.innerHTML = "Välj Källa";
            sourcePopMenu.onclick = function () {

                return false;
            };
            
            updatePopMenu = document.createElement("a");
            updatePopMenu.href = "#";
            updatePopMenu.innerHTML = "Uppdatera nu";
            updatePopMenu.onclick = function () {
                winDiv.removeChild(popMenu);
                return false;
            };
            
            tagsPopMenu = document.createElement("div");
            tagsPopMenu.appendChild(intervallPopMenu);
            tagsPopMenu.appendChild(sourcePopMenu);
            tagsPopMenu.appendChild(updatePopMenu);
            popMenu.appendChild(tagsPopMenu);
            
            headDiv.parentElement.insertBefore(popMenu, headDiv); // lägg till inuti parent elementet(winDiv)
            return false;
        };
        headDiv.appendChild(aContext);
    }
    
    /* END CONTEXT-MENY */
    
    statusDiv = document.createElement("div");
    statusDiv.className = "statusDiv";
    if (type === "rss" || type === "iV") {  // om det är ett rss eller image viewer fönster skall statusen innehålla texten "loading"
        statusDiv.innerHTML = "loading";
    } else if (type === "image"){
        statusDiv.innerHTML = "Högerklicka för att ändra till bakgrundsbild";
    }
    statusSpan = document.createElement("span");
    statusDiv.appendChild(statusSpan);
    winDiv.appendChild(headDiv);
    winDiv.appendChild(contentDiv);
    winDiv.appendChild(statusDiv);
    desk.appendChild(winDiv);
    return contentDiv;
};


JA.Window.prototype.checkPos = function (supposedPos, xNotY, elemGivenSize) {

    var maxValue; // #desk storlek är höjd: 640 (vi tar-50px för menyhöjden) och bredd: 1024 (max värden)
    var elementSizeValue; // storleken på det faktiska elementet
    if (xNotY) { // om xNotY === true så vill vi räkna ut ett x värde och spara elementets bredd
        maxValue = 1024;
        elementSizeValue = this.offsetWidth;
        
        if (elemGivenSize) { // då checkPos anropas med en given bredd
            elementSizeValue = elemGivenSize + 10;
        }
    } else {
        maxValue = 590; // om xNotY === false så vill vi räkna ut ett y värde och spara elementets höjd
        elementSizeValue = this.offsetHeight;
        
        if (elemGivenSize) { // då checkPos anropas med en given höjd
            elementSizeValue = elemGivenSize + 56;
        }
    }
    
    var allowedMaxValue = maxValue - supposedPos; // tillåtna storleken från tänkta positionen
    
    if (supposedPos < 0) {
        supposedPos = 0;
    }
    
    if (elementSizeValue > allowedMaxValue) { // Om elementet är större än tillåtet från förslagen position
        supposedPos = maxValue - elementSizeValue; // Ändra position till max - elementets storlek
    }
    
    if (elementSizeValue > maxValue) { // Om elementet är större än appen
        supposedPos = 0; // Ändra position till längst upp/vänster
        
    }
    return supposedPos; // returnera sedan nya den eventuellt ändrade positionen
    
};
