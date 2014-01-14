/*global window, console, document, alert, Message*/
"use strict";
function MessageBoard(boardId, boardContent) {
    
    var that = this;
    // Skapar strukturen för chatt applikationen i en div med boardId som id och lägger till den sist i body-taggen

    // Vi börjar med att skapa strukturen för ett chattfönster
    var boardDiv = document.createElement("div");
    boardDiv.id = boardId;
    boardContent.appendChild(boardDiv); // lägger till boardDiv i bodyContent
    
    // Skapar en div med class messageArea lägger till den sist i boardDiv
    var messageAreaDiv = document.createElement("div");
    messageAreaDiv.className = "messageArea";
    boardDiv.appendChild(messageAreaDiv);
    
    // Skapar en div med class textield lägger in en span-tag        
    var textfieldDiv = document.createElement("div");
    textfieldDiv.className = "textfield";
    var span = document.createElement("span");
    span.appendChild(document.createTextNode("Antal Meddelanden: 0"));
    textfieldDiv.appendChild(span);
    
    // fyller på med en textarea med class "textArea"
    var textbox = document.createElement("textarea");
    textbox.className = "textArea";
    textbox.name = "textArea";
    textbox.placeholder = "Meddelande här...";
    textbox.rows = "7";
    textbox.cols = "4";
    
    // ser till att meddelanden går att skicka med Enter knappen
    textbox.onkeypress = function (e) {
            // IE fix
        if (!e) { e = window.event; }

        var fieldValue = textbox.value;

        // om shift knappen inte är ned tryckt...
        if (!e.shiftKey) {

            // ...och användaren trycker på enter...
            if (e.keyCode === 13) {

                //...så skall meddelandet "skickas"
                that.writeMessage();
                return false;
            }
        }
    };
    
    // lägger sedan till textbox i textfieldDiv
    textfieldDiv.appendChild(textbox);
    
    // fyller på med en button med class "button"
    var theButton = document.createElement("input");
    theButton.type = "button";
    theButton.value = "Skicka";
    theButton.className = "button";
    theButton.onclick = function (e) {
        that.writeMessage();
        return false;
    };
    textfieldDiv.appendChild(theButton);
    
    // lägger tillslut till textfield sist i boardDiv
    boardDiv.appendChild(textfieldDiv);
    
    // skapar en div med class "bot" och lägger till den sist i boardDiv
    var botDiv = document.createElement("div");
    botDiv.className = "bot";
    boardDiv.appendChild(botDiv);

    
    this.messages = [];
    
    this.writeMessage = function () {
        // om fältet är tomt ska meddelanden inte "skickas"
        if (document.querySelector("#" + boardId + " textarea").value == 0) {
            return false;
        }
    
        var message = document.querySelector("#" + boardId + " textarea").value;
    
        // skapar ett nytt message object med texten och tiden och
        // lägger till den i arrayen för meddelanden
        this.messages.push(new Message(message, new Date()));
        
        // rensar textboxen
        document.querySelector("#" + boardId + " textarea").value = "";
    
        // anropar renderMessages för att skriva ut alla meddelanden
        this.renderMessages();
    
        return false;
    };
    
    this.renderMessage = function (theMessage, messageID) {
        var text = document.createElement("p"),
            div = document.querySelector("#" + boardId + " .messageArea");
        text.innerHTML = that.messages[messageID].getHTMLText();
        div.appendChild(text);
        
        // skapa span tag fyll den med meddelandets skapelse tid och lägg till i slutet av meddelandet
        var messageTime = document.createElement("span");
        messageTime.innerHTML = that.messages[messageID].getDateText();
        text.appendChild(messageTime);
        
        // uppdatera meddelande räknaren
        that.messageCount();
        
        // skapa en länk för att radera ett meddelande
        var aClose = document.createElement("a");
        aClose.href = "#";
        aClose.alt = "Close Message";
        aClose.className = "aClose";
        text.insertBefore(aClose, text.firstChild);
        
        aClose.onclick = function () {
    
            if (window.confirm("Vill du verkligen radera meddelandet?")) {
                that.removeMessage(messageID);
            }
            return false;
        };
    
        // skapa en länk för att se tidsstämpel för meddelandet
        var aTime = document.createElement("a");
        aTime.href = "#";
        aTime.alt = "Message creation time";
        aTime.className = "aTime";
        text.insertBefore(aTime, aClose);
        
        aTime.onclick = function () {
            alert("Inlägget skapades den " + that.messages[messageID].getAlertText() + " klockan " + that.messages[messageID].getDateText());
            return false;
        };

    };

    this.renderMessages = function () {
        // radera all meddelanden
        document.querySelector("#" + boardId + " .messageArea").innerHTML = "";
        
        // anropa renderMessage för varje meddelande i messages arrayen
        this.messages.forEach(this.renderMessage);
        
        // då det inte finns några meddelanden att skrivas ut uppdateras endast antalet meddelanden
        if (this.messages.length === 0) {
            this.messageCount();
        }
    };
    
    // uppdaterar antalet meddelanden
    this.messageCount = function () {
        document.querySelector("#" + boardId + " .textfield" + " span").innerHTML = "Antal meddelanden: " + this.messages.length;
    };
    
    // raderar ett meddelandet
    this.removeMessage = function (messID) {
        this.messages.splice(messID, 1);
        this.renderMessages();
    };
            
}

