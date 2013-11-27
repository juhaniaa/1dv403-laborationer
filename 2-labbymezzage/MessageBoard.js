/*global window, console, document*/
"use strict";
var MessageBoard = {
    messages: [],
    init: function () {
        
        var send = document.getElementById("send");
        send.onclick = MessageBoard.writeMessage;
        
        // meddelandet ska kunna skickas med enter tangenten
        var textField = document.getElementById("textArea");
        console.log(textField);

        textField.onkeypress = function (e) {
            // IE fix
            if (!e) { var e = window.event };

            var fieldValue = document.getElementById("textfield").getElementsByTagName("textarea")[0].value;

            // om shift knappen inte är ned tryckt...
            if (!e.shiftKey) {

                // ...och användaren trycker på enter...
                if (e.keyCode === 13) {

                    //...så skall meddelandet "skickas"
                    MessageBoard.writeMessage();
                    return false;
                }
            }
        }
    },
    
    writeMessage: function () {

        // om fältet är tomt ska meddelanden inte "skickas"
        if (document.getElementById("textfield").getElementsByTagName("textarea")[0].value == 0) {
            return false;
        }

        var message = document.getElementById("textfield").getElementsByTagName("textarea")[0].value;

        // skapar ett nytt message object med texten och tiden och
        // lägger till den i arrayen för meddelanden
        MessageBoard.messages.push(new Message(message, new Date()));
        document.getElementById("textfield").getElementsByTagName("textarea")[0].value = "";

        // anropar renderMessages för att skriva ut alla meddelanden
        MessageBoard.renderMessages();

        return false;
    },
    
    renderMessage: function (theMessage, messageID) {
        var text = document.createElement("p"),
            div = document.getElementById("messageArea");
        text.innerHTML = MessageBoard.messages[messageID].getHTMLText();
        div.appendChild(text);
        
        // skapa span tag fyll den med meddelandets skapelse tid och lägg till i slutet av meddelandet
        var messageTime = document.createElement("span");
        messageTime.innerHTML = MessageBoard.messages[messageID].getDateText();
        text.appendChild(messageTime);
        
        // uppdatera meddelande räknaren
        MessageBoard.messageCount();
        
        // skapa en länk för att radera ett meddelande
        var aClose = document.createElement("a");
        aClose.href = "#";
        aClose.alt = "Close Message";
        aClose.className = "aClose";
        text.insertBefore(aClose, text.firstChild);
        
        aClose.onclick = function () {

            if (window.confirm("Vill du verkligen radera meddelandet?")) {
                MessageBoard.removeMessage(messageID);
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
            alert("Inlägget skapades den " + MessageBoard.messages[messageID].getAlertText() + " klockan " + MessageBoard.messages[messageID].getDateText());
            return false;
        };
    
    },
    
    renderMessages: function () {
        // radera all meddelanden
        document.getElementById("messageArea").innerHTML = "";
        
        // anropa renderMessage för varje meddelande i messages arrayen
        MessageBoard.messages.forEach(MessageBoard.renderMessage);
        
        // då det inte finns några meddelanden att skrivas ut uppdateras endast antalet meddelanden
        if (MessageBoard.messages.length === 0) {
            MessageBoard.messageCount();
        }
    },
    
    messageCount: function () {
        document.getElementById("textfield").getElementsByTagName("span")[0].innerHTML = MessageBoard.messages.length;
    },
    
    removeMessage: function (messID) {
        MessageBoard.messages.splice(messID, 1);
        MessageBoard.renderMessages();
    }
};


window.onload = MessageBoard.init;